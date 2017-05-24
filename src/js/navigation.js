( function() {
	let toggle_navigation = function( e ) {
		e.preventDefault();
		if ( document.body.classList.contains( "navigation-open" ) ) {
			document.body.classList.remove( "navigation-open" );
			this.innerHTML = "Menu";
		} else {
			document.body.classList.add( "navigation-open" );
			this.innerHTML = "X";
		}
	};

	let toggle_has_items = function( e ) {
		e.preventDefault();
		if ( this.parentNode.classList.contains( "has-items-open" ) ) {
			this.parentNode.classList.remove( "has-items-open" );
		} else {
			this.parentNode.classList.add( "has-items-open" );
		}
	};

	document.getElementById( "js-navigation-toggle" ).addEventListener( "click", toggle_navigation, false );

	let has_items = document.querySelectorAll( ".has-items > a" );

	for ( let i = 0; i < has_items.length; i++ ) {
		has_items[ i ].addEventListener( "click", toggle_has_items, false );
	}

}() );
