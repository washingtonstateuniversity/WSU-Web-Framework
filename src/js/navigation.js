( function() {
	let toggle_menu = function( e ) {
		e.preventDefault();
		if ( document.body.classList.contains( "navigation-open" ) ) {
			document.body.classList.remove( "navigation-open" );
			this.innerHTML = "Menu";
		} else {
			document.body.classList.add( "navigation-open" );
			this.innerHTML = "X";
		}
	};

	document.getElementById( "menu-toggle" ).addEventListener( "click", toggle_menu, false );
}() );
