(function ($) {
    window.getImageList = function($, callback, articleId, imagePaths, body) {
        if (articleId) {
            params = {};
            params['articleId'] = articleId;
            if (typeof body !== 'undefined') {
                params['body'] = body;
            }
        } else {
            params = "";
            for (var i=0; i<imagePaths.length; i++) {
                var imagePath = imagePaths[i];
                if (params.length > 0) {
                    params = params + '&';
                }
                var parser = new URL(imagePath);
                params = params + 'imagePaths[]=' + parser.pathname.substr(1) + parser.search + parser.hash;
            }
            if (typeof body !== 'undefined') {
                params = params + '&body=' + body;
            }
        }

        $.ajax({
            url: "/api/image/list",
            type: "POST",
            dataType: "json",
            data: params,
            success: function(images) {
                callback(images);
            }
        });
    }
})(jQuery);