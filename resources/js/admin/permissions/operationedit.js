(function ($) {
    $('.select2').select2({
        minimumResultsForSearch: -1
    });

    $("#controller").change(function() {
        var controllerName = $(this).val();
        $("[id^='action_']").each(function(index, element) {
            element = $(element);
            element.parent().css('display', 'none');
            element.attr('disabled', 'disabled');
        });
        $("[id^='action_"+controllerName+"']").parent().css('display', 'block');
        $("[id^='action_"+controllerName+"']").removeAttr('disabled');
    });
})(jQuery);

function confirmDelete() {
    var controllerName = $("#controller option:selected").val();
    var actionName     = $("[id^='action_"+controllerName+"'] option:selected").val();

    var txt = 'このオペレーションを削除します。削除を行うとプログラム内の\n' +
              '\n' +
              '@can ' + controllerName + '-' + actionName + '\n' +
              '~~~\n'+
              '@endcan\n' +
              '\n' +
              '上記のような分岐が無視され、全て真と評価されるようになります。\n' +
              '削除を行う前に上記のような分岐が残っていないか十分ご注意ください。';

    if (confirm(txt)) {
        return true;
    }
    return false;
}