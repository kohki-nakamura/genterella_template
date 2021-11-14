(function($) {
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

    function showAddSearchPanel() {
        $("#add_search_panel").show();
        $("#add_search_btn").hide();
    }

    $('.select2-writers').select2({
        matcher: fowardMatch
    });

    $("#add_search_btn").on("click", showAddSearchPanel);

    function init() {
        var isAddSearchPanelShow = false;
        $(".additionalSearchSelect").each(function(cnt, row) {
            var id = $(row).attr("id");
            var selected = $("#" + id + " option:selected").val();
            if (selected) {
                isAddSearchPanelShow = true;
                return false;
            }
        });
        if (isAddSearchPanelShow) {
            showAddSearchPanel();
        }
    }

    init();

})(jQuery);