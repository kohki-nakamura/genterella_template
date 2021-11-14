(function ($) {
    $(document).on('click', '.addStep', function(e) {
        e.preventDefault();
        $(this).closest('.form-group').find('.addStep').hide();
        $(this).closest('.form-group').find('.removeStep').hide();
        var num = $(this).data('num');
        var maxNum = incrementMax(num);
        $("#step" + maxNum).closest('.form-group').show();
    }).on('click', '.removeStep', function(e) {
        e.preventDefault();
        var maxNum = $('#maxStepNum').val();
        if ($("#step" + maxNum).closest('.form-group').find('textarea').val()) {
            if (confirm("項目に記載があります。削除してもよろしいですか？")) {
                removeStep(maxNum)
            }
        } else {
            removeStep(maxNum)
        }
    });

    function removeStep(maxNum) {
        $("#step" + maxNum).closest('.form-group').find('textarea').val('');
        $("#step" + maxNum).closest('.form-group').hide();
        var num = decrementMax(maxNum);
        $("#step" + num).closest('.form-group').find('.addStep').show();
        $("#step" + num).closest('.form-group').find('.removeStep').show();
    }

    function decrementMax(num) {
        num = num - 1;
        $('#maxStepNum').val(num);
        return num;
    }

    function incrementMax(num) {
        num = num + 1;
        $('#maxStepNum').val(num);
        return num;
    }

    function initialize() {
        var displayMinNum = $('#maxStepNum').val() - 1;
        // 追加、削除ボタンの微調整
        for (num=displayMinNum; num<=15; num++) {
            $("#step" + num).closest('.form-group').find('.addStep').show();
            $("#step" + num).closest('.form-group').find('.removeStep').show();
        }
    }

    initialize();

})(jQuery);