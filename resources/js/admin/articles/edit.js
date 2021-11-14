(function ($) {
    $('.select2').select2({
        minimumResultsForSearch: -1
    });
    function fowardMatch(params, data) {
        if ($.trim(params.term) === '') {
            return data;
        }
        if (typeof data.text === 'undefined') {
          return null;
        }
        var reg = new RegExp("^" + params.term + ".+", "i");
        if (reg.test(data.text)) {
            return data;
        }
        return null;
    }
    $('.select2-articleIds').select2();
    $('.select2-writers').select2({
        matcher: fowardMatch
    });
    $('.select2-tags').select2({
        tags: true,
        maximumInputLength: 61, // @考慮で1文字余計に増やす
        createTag: function (params) {
            // Don't offset to create a tag if there is no @ symbol
            if (params.term.indexOf('@') === -1) {
                // Return null to disable tag creation
                return null;
            }

            return {
                id: params.term,
                text: params.term.substr(1)
            }
        },
        dropdownParent: $('#select2-tags-parent')
    });

    $.datepicker.setDefaults( {
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        firstDay: 1
    } );
    $( "#publish_on_date" ).datepicker();
    $( "#release_on_date" ).datepicker();
    $( "#pickup_on_date" ).datepicker();


    window.CKEDITOR_BASEPATH = '/ckeditor/';
    var ckeditorParams = {
        height : '50em',
        filebrowserUploadUrl : '/api/image/store',
        filebrowserImageUploadUrl : '/api/image/store',
        filebrowserFlashUploadUrl : '/api/image/store',
        uploadUrl : '/api/image/store',
        imageUploadUrl : '/api/image/store'
    };
    var articleId;
    if (articleId = $('input[name="update_article_id"]').val()) {
        ckeditorParams['filebrowserUploadUrl'] = ckeditorParams['filebrowserUploadUrl'] + '?articleId=' + articleId;
        ckeditorParams['filebrowserImageUploadUrl'] = ckeditorParams['filebrowserImageUploadUrl'] + '?articleId=' + articleId;
        ckeditorParams['filebrowserFlashUploadUrl'] = ckeditorParams['filebrowserFlashUploadUrl'] + '?articleId=' + articleId;
        ckeditorParams['uploadUrl'] = ckeditorParams['uploadUrl'] + '?articleId=' + articleId;
        ckeditorParams['imageUploadUrl'] = ckeditorParams['imageUploadUrl'] + '?articleId=' + articleId;
    }

    window.CKEDITOR.editorConfig = function( config ) {
        config.height = '50em';
        config.filebrowserUploadUrl = ckeditorParams['filebrowserUploadUrl'];
        config.filebrowserImageUploadUrl = ckeditorParams['filebrowserImageUploadUrl'];
        config.filebrowserFlashUploadUrl = ckeditorParams['filebrowserFlashUploadUrl'];
        config.uploadUrl = ckeditorParams['uploadUrl'];
        config.imageUploadUrl = ckeditorParams['imageUploadUrl'];

        config.toolbar = [
            { name: 'styles', items: [ 'Templates', 'Format' ] },
            { name: 'link', items: [ 'Bold', 'Blockquote', 'CiteTag', 'Link', 'AdLink', 'Unlink' ] },
            { name: 'insert', items: [ 'Image', 'Youtube', 'InsertHtml', 'BulletedList', 'NumberedList', 'Table'] },
            { name: 'others', items: [ 'InsertPre' ] },
            { name: 'tools', items: [ 'Maximize' ] },
            { name: 'document', items: [ 'Source' ] }
        ];
        config.removeButtons = 'Underline,Subscript,Superscript';

        // タグを勝手に変換されないようACF（AutoContentFilter）をOFFに
        config.allowedContent = true;

        // テンプレートの設定ファイルを指定
        config.templates_files= ['/assets/admin/js/articles/templates.js'];
        config.templates = 'default';

        // Set the most common block elements.
        config.format_tags = 'p;h2;h3';
        config.extraPlugins = 'citetag,inserthtml,adlink';
        config.removePlugins = 'pastefromword';
        config.disallowedContent = 'img[width,height]';
        config.extraAllowedContent = '*(*){*}[*]; script(*)[*]{*}; iframe(*)[*]{*}; noscript(*)[*]{*}';
        config.coreStyles_bold = {
            element: 'b',
            attributes: {/* 'style': 'font-weight: bold;' */},
            overrides: 'strong'
        };

        config.removeDialogTabs = 'image:advanced;link:upload;link:advanced;';

        config.forcePasteAsPlainText = true;

        config.youtube_responsive = true;
        config.youtube_related = false;
        config.youtube_autoplay = false;
        config.youtube_controls = true;
        config.youtube_disabled_fields = ['txtEmbed', 'chkNoEmbed'];
        config.autoParagraph = false;

        config.image2_prefillDimensions = false;
    };

    for (var tag in window.CKEDITOR.dtd['$removeEmpty']) {
        window.CKEDITOR.dtd['$removeEmpty'][tag] = 0;
    }
    window.CKEDITOR.filter.disabled = true;
    window.CKEDITOR.config.insertpre_class = 'pagebreak';
    var direct_html = 'div[data-class="direct-html"] {' +
                        'background-color: #F8F8D8;' +
                        'border: 1px solid #F8F90F;' +
                        'padding: 10px;' +
                        'background-image: url(/images/inserthtml_back.png);' +
                        'background-repeat: no-repeat;' +
                        'background-position: 98% 2%;' +
                      '}';
    direct_html += '.cke_editable div[class="button-detail"] a {' +
                        'font-size: 15px;' +
                        'line-height: 1.4em;' +
                        'color: #000080;' +
                        'text-align: center;' +
                        'border-radius: 4px;' +
                        'background-color: #FFF;' +
                        'width: 340px;' +
                        'padding: 18px 50px;' +
                        'display: block;' +
                        'margin: 40px auto;' +
                        'position: relative;' +
                        'box-sizing: border-box;' +
                        'border: solid 1px #67aad4;' +
                      '}';
    window.CKEDITOR.addCss(
        direct_html +
        '.cke_editable h2 { border-bottom: 3px solid #eee } ' +
        '.cke_editable h3 { border-bottom: 1px solid #eee }' +
        '.cke_editable img { width: 33%; }'
    );

    window.CKEDITOR.on('dialogDefinition', function (ev) {
        var dialogName = ev.data.name;
        var dialogDefinition = ev.data.definition;
        var dialog = dialogDefinition.dialog;
        var editor = ev.editor;

        if ( dialogName == 'link' ) {
            var targetTab = dialogDefinition.getContents('target');

            var selectField = targetTab.get('linkTargetType');
            selectField['default'] = '_blank';
        } else if ( dialogName == 'image2' ) {
            var infoTab = dialogDefinition.getContents( 'info' );
            infoTab.remove('lock');
            infoTab.remove('alignment');
            var alt = infoTab.get('alt');
            alt['label'] = alt['label'] + "(Alt)";
            alt['className'] = 'ck-alt-required';
            alt['validate'] = window.CKEDITOR.dialog.validate.notEmpty( alt['label'] + "は必ず入力してください" );

            var uploadTab = dialogDefinition.getContents( 'Upload' );
            uploadTab.add( {
                type : 'html',
                id : 'captionHtml',
                html : "<p>&nbsp;</p>" +
                       "<p>・サイズ規定なし</p>" +
                       "<p>・推奨は４：３</p>" +
                       "<p>・理想画像は800px x 600px</p>"
            });
        }
    });

    var unloadCallback = function(e) {
        var message = 'このまま別ページへ移動すると、編集中の内容が失われます。';
        e.returnValue = message;
        return message;
    };
    var editor = window.CKEDITOR.replace('body').on('key',
        function() {
            if (typeof window.onbeforeunload != "function") {
                window.addEventListener('beforeunload', unloadCallback, false);
            }
        }
    );
    $('#article_form input[type="text"],#article_form textarea').keyup(
        function () {
            if (typeof window.onbeforeunload != "function") {
                window.addEventListener('beforeunload', unloadCallback, false);
            }
        }
    );
    $('#article_form select').change(
        function () {
            if (typeof window.onbeforeunload != "function") {
                window.addEventListener('beforeunload', unloadCallback, false);
            }
        }
    );
    $('#article_form').on('submit', function(){
        window.removeEventListener('beforeunload', unloadCallback, false);
    });

    function body_image_notification() {
        $("#body_image_url_notification").toggle(true);
        setTimeout(function(){
            $("#body_image_url_notification").toggle(false);
        }, 1000);
    }
    $("#body_image_list").selectable({
        selected: function () {
            $("#body_image_list img").each(function(index) {
                if ($(this).hasClass("ui-selected")) {
                    var img_url = $(this).attr('src');
                    $('#body_image_url').val(img_url);
                    $('#body_image_url_copy').trigger('click');
                    var providerUrl = $(this).data('provider-url');
                    $('#body_image_provider_url').val(providerUrl);
                    body_image_notification();
                }
            });
        }
    });
    $("#body_image_url_copy").on('click', body_image_notification);
    new Clipboard('#body_image_url_copy');

    function image_provider_url_notification(data) {
        if (data.success) {
            $('#body_image_provider_url_notification').toggle(true);
            setTimeout(function() {
                $('#body_image_provider_url_notification').toggle(false);
            }, 1000);
        } else {
            if (data.error) {
                alert(data.error);
            } else {
                alert('データの更新に失敗しました。画面をリロードし、再度ボタンを押して下さい。');
            }
        }
    }

    function provider_url_refresh(data) {
        if (data.success) {
            $("#body_image_list img").each(function(cnt, row) {
                if ($('#body_image_url').val() == $(row).attr('src')) {
                    $(row).data('provider-url', data.res.provider_url);
                    return false;
                }
            });
        }
    }

    function save_provider_url(form_value) {
        var defer = $.Deferred();
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
        $.ajax({
            type: 'post',
            url: '/api/image/provider_url',
            data: form_value,
            success: function(data) {
                defer.resolve(data);
            },
            error: function(response, textStatus, errorThrown) {
                defer.reject(response, textStatus, errorThrown);
            },
        })
        return defer.promise();
    }

    $('#body_image_provider_url_save').on('click', function() {
        var imgUrl = $('#body_image_url').val();
        var imgProviderUrl = $("#body_image_provider_url").val();
        if (!imgUrl) {
            alert('画像URLが選択されていません。');
            return;
        }
        var form_value = {
            'img_url': imgUrl,
            'img_provider_url': imgProviderUrl,
        }
        $(this).prop('disabled', true);
        save_provider_url(form_value)
        .done(function(data) {
            image_provider_url_notification(data);
            provider_url_refresh(data);
        })
        .fail(function(response, textStatus, errorThrown) {
            ajax_failed_notification(response, textStatus, errorThrown)
        });
        $(this).prop('disabled', false);
    });

    $('#kind').on('change', function(){
        var val = $(this).val();
        if (val == 'promotion') {
            $('#configFeed input').prop("disabled", true);
        } else {
            $('#configFeed input').prop("disabled", false);
        }
    })

    $('#article_form_submit').click(function(){
        $('#article_form').submit();
    })
    $('#article_form').submit(function() {
        var status = $("#status").val();

        if (status !== "publish" && status !== "disable") {
            return true;
        }

        var action = $(document.activeElement).data('action');
        if (action==='confirmed' || !$('input[name="update_article_id"]').val()) {
            return true;
        }

        // 前の操作で要素が残っている場合があるので削除
        $("#confirmModal .modal-header h4").remove();
        $("#confirmModal .modal-footer button[type='submit']").remove();
        $("#confirmModal .modal-body *").remove();

        var modal_title_h4 = document.createElement("h4");
        modal_title_h4.className = 'modal-title';
        modal_title_h4.id = 'confirmModalLabel';

        var modal_submit_button = document.createElement("button");
        modal_submit_button.type = 'submit';
        modal_submit_button.className = 'btn btn-primary';
        modal_submit_button.setAttribute("data-action", "confirmed");

        if (status === 'publish') {
            var body = window.CKEDITOR.instances["body"].getData();

            window.getImageList($, function(images) {
                $("#confirmModal .modal-body input").remove();
                var is_all_used_image = true;
                var not_used_images = [];
                for (var i=0; i<images.length; i+=1) {
                    var image = images[i];
                    if (!image['is_insert_body']) {
                        is_all_used_image = result = false;
                        not_used_images.push(image['filepath']);
                    }
                }
                if (!is_all_used_image) {

                    modal_title_h4.innerText = '記事公開を行うと、使用されていない下記の画像が消去されます。よろしいですか？';
                    $("#confirmModal .modal-header").append(modal_title_h4);
                    modal_submit_button.innerText = '上記画像を削除し公開する';
                    $("#confirmModal .modal-footer").append(modal_submit_button);

                    $("#confirmModal .modal-body *").remove();

                    var form_group_div = document.createElement("div");
                    form_group_div.className = 'form-group';
                    var modal_body_label = document.createElement("label");
                    modal_body_label.className = 'control-label';
                    modal_body_label.innerText = '消去予定画像一覧';
                    form_group_div.appendChild(modal_body_label);
                    $("#confirmModal .modal-body").append(form_group_div);

                    for (var i=0; i<not_used_images.length; i+=1) {
                        var image_path = not_used_images[i];
                        var image_url = window.getCdnImagePath() + image_path;

                        var form_group_div = document.createElement("div");
                        form_group_div.className = 'form-group';

                        var outer_div = document.createElement("div");
                        outer_div.className = 'col-md-12 col-sm-12 col-xs-12';

                        var input_div = document.createElement("div");
                        input_div.className = 'col-md-10 col-sm-10 col-xs-10';

                        var input = document.createElement("input");
                        input.value = image_url;
                        input.className = 'form-control';
                        input.type = 'text';

                        var button_div = document.createElement("div");
                        button_div.className = 'col-md-2 col-sm-2 col-xs-2';

                        var button = document.createElement("button");
                        button.className = 'btn btn-success';
                        button.type = 'button';
                        button.innerText = '確認する';
                        button.dataUrl = image_url;
                        button.addEventListener('click', function(){
                            window.open(this.dataUrl, '_blank');
                        });

                        form_group_div.appendChild(outer_div);
                        outer_div.appendChild(input_div);
                        input_div.appendChild(input);
                        outer_div.appendChild(button_div);
                        button_div.appendChild(button);

                        $("#confirmModal .modal-body").append(form_group_div);
                    }
                    $('#confirmModal').modal();
                } else {
                    $('#article_form').off();
                    $('#article_form').submit();
                }
            }, $('input[name="update_article_id"]').val(), undefined, body);
            return false;
        } else if (status === 'disable') {
            if (($("input[name='old_status']").val() == 'draft' || $("input[name='old_status']").val() == 'writing' || $("input[name='old_status']").val() == 'proofreading') &&
                $("input[name='article_feeds[]']:checked").length > 0) {
                modal_title_h4.innerText = '記事ステータスを作成中、作成完了から非公開ステータスにすると外部配信設定のチェックが全て外れます';
                $("#confirmModal .modal-header").append(modal_title_h4);
                modal_submit_button.innerText = '外部配信設定のチェックを外し非公開にする';
                $("#confirmModal .modal-footer").append(modal_submit_button);
                $('#confirmModal').modal();
            } else {
                $('#article_form').off();
                $('#article_form').submit();
            }
            return false;
        }
    });


    $('.deleteArticleForm').on('submit', function() {
        var alert_statement = "この記事を削除します。よろしいですか？";
        if (($("input[name='old_status']").val() == 'draft' || $("input[name='old_status']").val() == 'writing' || $("input[name='old_status']").val() == 'proofreading') &&
            $("input[name='article_feeds[]']:checked").length > 0
        ) {
            alert_statement += "\n※この記事の外部配信設定チェックも全て外れます";
        }
        return confirm(alert_statement) ? true : false;
    });


    function changeTrillAllowEnabled() {
        var categories = {
            1 : "POSE&BODY TRAINING",
            3 : "YOGA FASHION",
            5 : "MEDITATION",
            6 : "LIFE&PERSON",
            7 : "TREND&EVENT"
        };
        var category_id = $('#category_id').val();
        var checkBox = '#configFeed input[data-type="trill"]';
        if ($.inArray(category_id, Object.keys(categories)) != -1) {
            $(checkBox).prop('disabled', false);
        } else {
            $(checkBox).prop('checked', false);
            $(checkBox).prop('disabled', true);
        }
    }


    function ajax_failed_notification(response, textStatus, errorThrown) {
        alert('データの更新に失敗しました。画面をリロードし、再度ボタンを押して下さい。');
    }

    $('#category_id').on('change', changeTrillAllowEnabled);

    $('#bodyImagesPanel').toggle(true);

    $("#cacheDeleteBtn").on('click', function() {
        $('.deleteArticleCacheForm').submit();
    });

    changeTrillAllowEnabled();

})(jQuery);
