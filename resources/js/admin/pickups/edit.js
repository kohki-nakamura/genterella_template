(function ($) {
    $('.select2-date, .select2-position, .select2-dummy-type').select2({
        minimumResultsForSearch: -1
    });

    var getSelfRouteType = function(){
        var type
        $('input[name=self_route]').each(function(index) {
            if ($(this).parent().hasClass("active")) {
                type = $(this).val();
                return false;
            }
        });
        return type;
    };

    var checkSelectTime = function(timeName, data, prefix) {
        var prefix = prefix !== undefined ? prefix : 'from';
        var formName = prefix + "_" + timeName;
        $('select[name="'+formName+'"] option').each(function(cnt, row) {
            if ($(row).val() == data[timeName]) {
                $(row).prop('selected', true);
                $('.select2-date').select2({
                    minimumResultsForSearch: -1
                });
                return false;
            }
        });
    };

    var defaultReleaseOnData = [];
    var changeSuggest = function(id, defaultTitle, releaseOnName) {
        releaseOnName = (releaseOnName !== undefined) ? releaseOnName : '';
        var elemName;
        if (id === 'article_id') {
            elemName = 'article_default_title';
        } else if (id === 'feature_id') {
            elemName = 'feature_default_title';
        }
        if (!document.querySelector('input[name='+elemName+']')) {
            var input = document.createElement('input');
            input.type = 'hidden';
            input.name = elemName;
            $(input).insertAfter('#'+id);
        }
        $('input[name='+elemName+']').val(defaultTitle);
        if (Object.keys(defaultReleaseOnData).length > 0) {
            $('input[name="from_date"]').val(defaultReleaseOnData['date']);
            checkSelectTime('hour', defaultReleaseOnData);
            checkSelectTime('minute', defaultReleaseOnData);
        }
    };

    $('.select2-article').select2({
        ajax: {
            url: "/api/suggest",
            dataType: 'json',
            delay: 250,
            type: "POST",
            data: function (params) {
                var type;
                type = getSelfRouteType();

                return {
                    q: params.term, // search term
                    limit: 10,
                    'type' : type
                };
            },
            processResults: function (data, params) {
                return {
                    results: data.results
                };
            }
        },
        placeholder: "記事ID or 記事タイトル or 記事導入を入力",
        minimumInputLength: 1
    }).on('change', function(){
        changeSuggest(this.id, $(this).text());
    });

    $('.select2-feature').select2({
        ajax: {
            url: "/api/suggest",
            dataType: 'json',
            delay: 250,
            type: "POST",
            data: function (params) {
                return {
                    q: params.term, // search term
                    limit: 10,
                    'type' : 'feature'
                };
            },
            processResults: function (data, params) {
                if (data.results.length > 0) {
                    defaultReleaseOnData['value'] = data.results[0]['release_on'];
                    defaultReleaseOnData['date'] = data.results[0]['release_on_date'];
                    defaultReleaseOnData['hour'] = data.results[0]['release_on_hour'];
                    defaultReleaseOnData['minute'] = data.results[0]['release_on_minute'];
                }
                return {
                    results: data.results
                };
            }
        },
        placeholder: "特集ID or 特集タイトル or 特集説明文を入力",
        minimumInputLength: 1
    }).on('change', function(){
        changeSuggest(this.id, $(this).text());
    });


    $.datepicker.setDefaults( {
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        firstDay: 1
    } );
    $( "#from_date" ).datepicker();
    $( "#to_date" ).datepicker();

    var changeAutoTitle = function(checkboxElement, textElementId) {
        if ($(checkboxElement).is(':checked')) {
            $('#'+textElementId).attr('disabled', 'disabled');
        } else {
            $('#'+textElementId).removeAttr('disabled');
        }
    }

    $('#article_is_auto_title').change(function() {changeAutoTitle(this, 'article_title')});
    changeAutoTitle(document.getElementById('article_is_auto_title'), 'article_title');
    $('#article_is_auto_subtitle').change(function() {changeAutoTitle(this, 'article_subtitle')});
    changeAutoTitle(document.getElementById('article_is_auto_subtitle'), 'article_subtitle');

    var changeSelfRoute = function () {
        $("div[id^='self-site-']").hide();

        var value;
        $('input[name=self_route]').each(function(index) {
            if ($(this).parent().hasClass("active")) {
                value = $(this).val();
                return false;
            }
        });

        if (value === 'article') {
            $('#self-site-article').show();
        } else if (value === 'other') {
            $('#self-site-other').show();
        }
    };

    var changeIsSelf = function() {
        var is_self = $('input[name=is_self]:checked').val();
        if (!!parseInt(is_self)) {
            changeSelfRoute();
            $('#another-site').hide();
            $('#self-site').show();
        } else {
            $('#another-site').show();
            $('#self-site').hide();
        }
    };

    $('input[name=is_self]').change(function() {
        changeIsSelf();
    });

    $('input[name=self_route]').change(function() {
        changeSelfRoute();
    });
    changeIsSelf();
})(jQuery);