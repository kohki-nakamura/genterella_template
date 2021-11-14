(function ($) {
    $('.select2-tags').select2({
        tags: true,
        createTag: function (params) {
            return undefined;
        }
        /*
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
        }
        */
    });
})(jQuery);
