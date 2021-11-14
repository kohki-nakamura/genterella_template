window.CKEDITOR.dialog.add('inserthtmlDialog', function(editor){
    return{
        title:'HTMLコードを入力してください',
        minWidth:380,
        minHeight:250,
        contents:[
            {	id:'info',
                label:'HTML',
                expand: true,
                elements:[
                    {
                        type: 'textarea',
                        id: 'insertcode_area',
                        label: '',
                        cols: 60,
                        rows: 4,
                        inputStyle: 'height: 200px'
                    }
                ]
            }
        ],
        onOk: function() {
            var sInsert = this.getValueOf('info', 'insertcode_area');
            if ( sInsert.length > 0 ) {
                var insert = sInsert.replace(/[\n\r]/g, "");
                insert = '<div data-class="direct-html">' + insert + '</div>';
                editor.insertHtml(insert);
            }

        }
    };
});