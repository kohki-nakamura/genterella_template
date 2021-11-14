window.CKEDITOR.plugins.add( 'citetag', {
    icons: 'citetag',
    init: function( editor ) {
        if ( editor.blockless )
            return;

        var commandName = 'insertCiteTag';
        var citeStyle = new window.CKEDITOR.style({element: 'cite'});

        editor.attachStyleStateChange( citeStyle, function( state ) {
            !editor.readOnly && editor.getCommand( commandName ).setState( state );
        } );

        editor.addCommand( commandName, new CKEDITOR.styleCommand( citeStyle ) );

        editor.ui.addButton( 'CiteTag', {
            label: 'cite code',
            command: 'insertCiteTag',
            toolbar: 'links'
        });
    }
});