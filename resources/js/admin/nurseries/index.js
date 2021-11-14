(function($) {

    $("#searchCitySelect").change(function() {
        if ($(this).val()) {
            $("#csvDownloadBtn").prop("disabled", false)
        } else {
            $("#csvDownloadBtn").prop("disabled", true)
        }
    })

})(jQuery);