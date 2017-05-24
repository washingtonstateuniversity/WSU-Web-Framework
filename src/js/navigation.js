( function() {
	let toggle_menu = function( e ) {
		e.preventDefault();
		if ( document.body.classList.contains( "navigation-open" ) ) {
			document.body.classList.remove( "navigation-open" );
		} else {
			document.body.classList.add( "navigation-open" );
		}
	};

	document.getElementById( "menu-toggle" ).addEventListener( "click", toggle_menu, false );
}() );
