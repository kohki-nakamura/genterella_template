(function ($) {
    // 通信数カウント用の配列を用意
    var jqxhr = null;
	function get_article_list(form_value) {
        var defer = $.Deferred();
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });

        if (jqxhr) {
            // 通信中は走らなくする
            jqxhr.abort();
        }

        jqxhr = $.ajax({
            type: 'post',
            url: '/api/article/get_by_ids',
            data: form_value,
            success: function(data) {
                defer.resolve(data);
            },
            error: function(response, textStatus, errorThrown) {
                defer.reject(response, textStatus, errorThrown);
            },
        });
        return defer.promise();
    }

    function getArticlesIfValidated() {
        var articleIds = $('#articles').val();
        var params = {}
        params['article_ids'] = articleIds;
        if (!validateArticleIds(params)) {
        	// 入力形式が正しくない場合は通信させない
        	return false;
        }
        get_article_list(params)
    	.done(function(data) {
    		changeArticlesArea(data);
    	})
		.fail(function(response, textStatus, errorThrown) {
            // 失敗した時はカーソルを外す
            $('#articles').blur();
            $('#articles').focusout();
			ajax_failed_notification(response, textStatus, errorThrown);
		});
    }

    function changeArticlesArea(data) {
    	var html = "";
    	if (data['success']) {
    		$.each(data['res']['articles'], function(cnt, row) {
	    		var id = row['id'];
	    		var title = row['title'];
	    		var release_statement = "(" + row['release_statement'] + ")";
	    		if (id && title) {
	    			html += id + ": " + title + " " + release_statement + "\n";
	    		}
	    	});
	    	// 末尾のカンマを取り除いて入れる
	    	$("#articlesArea").empty();
	    	$("#articlesArea").html(html.slice(0, -1));

	    	var warning_html = "";
	    	$.each(data['res']['nonExistIds'], function(cnt, val) {
	    		warning_html += '<li class="parsley-required">記事ID' + val + 'に該当する記事は存在しません</li>';
	    	});
	    	$('#nonExists').empty();
	    	$('#nonExists').html(warning_html);
    	}
    }


    function validateArticleIds(params) {
		var idList = params['article_ids'].split(',');
		var validateFlag = true;
		$.each(idList, function(cnt, val) {
			if (!Number.isInteger(parseInt(val)) && val != '') {
				validateFlag = false;
				return false;
			}
		});
		return validateFlag;
	}

	var stack = [];//入力数を保存する変数
	$('#articles').on('keyup', function() {
	  stack.push(1);//入力ごとに値を追加する

      // 2桁以上の数字を入力した時に毎回通信させない手段
	  //入力後0.3秒後
	  setTimeout(function() {
	       stack.pop();
	       // 一番最後の入力から1秒後に以下の処理が走る
	       if (stack.length == 0) {
	           //最後キー入力後に処理したいイベント
	           stack = [];//一応stackを初期化
	           getArticlesIfValidated();
	       }
	   }, 300);
	});

    $('#status').on('change', function() {
        if ($('#id').val() && $(this).val() != "publish") {
            alert('特集を非表示にする場合は、\nこの特集がピックアップから削除済みである事をご確認下さい');
        }
        return false;
    });

	function ajax_failed_notification(response, textStatus, errorThrown) {
        $('#requestFailed').html('<li>データの取得に失敗しました。</li>');
        $('#requestFailed li').fadeOut(2500);
        setTimeout(function() {
            $('#requestFailed').html('');
        }, 2500);
    }

    function init() {
    	var oldFlag = $('#isOld').val();
    	// バリデーションに失敗した際に、直前の値に対応したタイトルを取得する
    	if (oldFlag == true) {
    		getArticlesIfValidated();
    	}
    }

    init();

    $('.select2').select2({
        minimumResultsForSearch: -1
    });
    $( "#release_on_date" ).datepicker();
})(jQuery);