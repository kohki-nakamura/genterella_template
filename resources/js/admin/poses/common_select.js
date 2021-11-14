(function ($) {
    $('.select2').select2({
        minimumResultsForSearch: -1
    });

    $('.select2-poses').select2({
        poses: true,
        maximumInputLength: 191,
        dropdownParent: $('#select2-poses-parent')
    });

    $('.select2-postures').select2({
        postures: true,
        maximumInputLength: 191,
        dropdownParent: $('#select2-postures-parent')
    });

    $('.select2-efficacies').select2({
        efficacies: true,
        maximumInputLength: 191,
        dropdownParent: $('#select2-efficacies-parent')
    });

    $('.select2-poseparts').select2({
        poseparts: true,
        maximumInputLength: 191,
        dropdownParent: $('#select2-poseparts-parent')
    });

})(jQuery);