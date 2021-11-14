/*
 Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/

// Register a templates definition set named "default".
$.ajax({
    type: "GET",
    url: '/api/article/get_templates',
    async: false,
    dataType: "json",
    success: function(data) {

        list = [];
        JSON.parse(data.res).forEach(function (row) {
            list.push({
                title: row.name,
                image: "template1.gif",
                description: "",
                html: row.body
            });
        });

        CKEDITOR.addTemplates('default', {
            // The name of sub folder which hold the shortcut preview images of the
            // templates.
            imagesPath: CKEDITOR.getUrl(CKEDITOR.plugins.getPath('templates') + 'templates/images/'),

            // The templates definitions.
            templates: list
        });
    },
    error: function() {
        alert("テンプレートの読み込みに失敗しました");
    }
});
