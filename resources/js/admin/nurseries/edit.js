(function($) {

    var formInputData = JSON.stringify($('#nursery-form').serializeArray());
    function checkMoveDelegate() {
        if (!$(this).data('nursery-exist')) {
            alert('定員数を設定するには、先に保育園を作成する必要があります。');
            return false;
        }
        if (formInputData != JSON.stringify($('#nursery-form').serializeArray())) {
            return confirm('保育園情報に変更があります。移動してもよろしいですか？');
        }
        return true;
    }

    $("#toCapacity").on('click', checkMoveDelegate);
    $("#toVacancyCapacity").on('click', checkMoveDelegate);
    $("#toImages").on('click', checkMoveDelegate);

})(jQuery);