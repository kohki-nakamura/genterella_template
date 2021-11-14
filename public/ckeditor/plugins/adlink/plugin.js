window.CKEDITOR.plugins.add( 'adlink', {
    icons: 'adlink',
    init: function( editor ) {
        if ( editor.blockless )
            return;

        var commandName = 'insertAdLink';
        var adlinkStyle = new window.CKEDITOR.style({element: 'div', attributes: {'class': 'button-detail'}});

        editor.attachStyleStateChange( adlinkStyle, function( state ) {
            !editor.readOnly && editor.getCommand( commandName ).setState( state );
        } );

        editor.addCommand( commandName, new CKEDITOR.styleCommand( adlinkStyle ) );

        editor.ui.addButton( 'AdLink', {
            label: '広告リンク',
            command: 'insertAdLink',
            toolbar: 'links'
        });
    }
});