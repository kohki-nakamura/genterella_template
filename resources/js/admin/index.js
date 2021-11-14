(function ($) {
	var changeSuggest = function(id, defaultTitle) {
        var elemName;
        if (id === 'article_id') {
            elemName = 'article_default_title';
        }
        if (!document.querySelector('input[name='+elemName+']')) {
            var input = document.createElement('input');
            input.type = 'hidden';
            input.name = elemName;
            $(input).insertAfter('#'+id);
        }
        $('input[name='+elemName+']').val(defaultTitle);
    };
    $('.select2-article').select2({
        ajax: {
            url: "/api/suggest",
            dataType: 'json',
            delay: 250,
            type: "POST",
            data: function (params) {

                return {
                    q: params.term, // search term
                    limit: 10,
                    'type' : 'article',
                    'query_status' : 'all'
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

	function showArticleIdForm() {
		$("#articleIdForm").show();
		$(this).hide();
	}
	$('#addArticleId').on('click', showArticleIdForm);
})(jQuery)