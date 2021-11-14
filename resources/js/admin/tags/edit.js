(function ($) {
    $('.select2').select2({
        minimumResultsForSearch: -1
    });

    function checkPickupMax() {
        if ($('#is_pickedup').prop('checked') == true) {
            if ($("#pickupTagCount").val() >= 20) {
                return confirm('ピックアップされたタグの数が20件以上になりますが、更新しますか？') || false;
            }
        }
        return true;
    }
    $("#tag-form").on('submit', checkPickupMax);
})(jQuery);