
(function ($) {
    $('.select2').select2({
        minimumResultsForSearch: -1
    });

    $.datepicker.setDefaults( {
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        firstDay: 1,
    } );
    $( "#pickup_on_date" ).datepicker();

    $("#pickup_on_clear").click(function(event) {
        $("#pickup_on_date").val("");
        $("#pickup_on_hour").val("").change();
        $("#pickup_on_minute").val("").change();
        return false;
    });
})(jQuery);
