window.CKEDITOR.plugins.add('inserthtml', {
    icons: 'inserthtml',
    init: function( editor ) {
        editor.addCommand( 'inserthtml', new CKEDITOR.dialogCommand( 'inserthtmlDialog' ) );
        editor.ui.addButton( 'InsertHtml', {
            label: 'Insert HTML',
            command: 'inserthtml',
            toolbar: 'insert'
        });

        CKEDITOR.dialog.add( 'inserthtmlDialog', this.path + 'dialogs/inserthtml.js' );
    }
});