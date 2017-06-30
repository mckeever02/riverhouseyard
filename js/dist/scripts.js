var Carousel = function (frameSelector, sliderSelector, slidesSelector, btnLeftSelector, btnRightSelector) {
    //A variable to store the position of the slides
    var leftPosition = 0;
    var frame = document.querySelector(frameSelector);
    var slides = document.querySelectorAll(slidesSelector);
    //Get the number of slides in the slider
    var slidesNumber = slides.length;
    var leftButton = document.querySelector(btnLeftSelector);
    var rightButton = document.querySelector(btnRightSelector);
    var slider = document.querySelector(sliderSelector);

    //Add classes to frame and slider divs
    frame.classList.add('frame');
    slider.classList.add('slider');

    //Event listeners for when the user clicks on the arrows
    leftButton.addEventListener("click", function() {
        carousel.previous();
    });

    rightButton.addEventListener("click", function() {
        carousel.next();
    });

    //Function that moves the slides left or right depending on variable value
    //Moves to the next slide if value is -1, moves to the previous is value is 1
    var moveSlide = function (value) {
        leftPosition += value*100;
        slider.style.left = leftPosition + '%';
    };

    return {
        //Function to move to next slide
        next: function() {
            if(leftPosition > (slidesNumber-1)*-100)
            {
                moveSlide(-1);
            } else {
                leftPosition = 0;
                slider.style.left = leftPosition + '%';
            }
        },
        //Function to go to previous slide
        previous: function() {
            if(leftPosition !== 0) {
                 moveSlide(1);
            } else {
                leftPosition = (slidesNumber-1)*-100;
                slider.style.left = leftPosition + '%';
            }
        }
    };
};

//Create new instance of Carousel
var carousel = new Carousel('#frame', '#slider', '#slider .slide', '.arrow-left', '.arrow-right');

/*! loadCSS. [c]2017 Filament Group, Inc. MIT License */
(function(w){
	"use strict";
	/* exported loadCSS */
	var loadCSS = function( href, before, media ){
		// Arguments explained:
		// `href` [REQUIRED] is the URL for your CSS file.
		// `before` [OPTIONAL] is the element the script should use as a reference for injecting our stylesheet <link> before
			// By default, loadCSS attempts to inject the link after the last stylesheet or script in the DOM. However, you might desire a more specific location in your document.
		// `media` [OPTIONAL] is the media type or query of the stylesheet. By default it will be 'all'
		var doc = w.document;
		var ss = doc.createElement( "link" );
		var ref;
		if( before ){
			ref = before;
		}
		else {
			var refs = ( doc.body || doc.getElementsByTagName( "head" )[ 0 ] ).childNodes;
			ref = refs[ refs.length - 1];
		}

		var sheets = doc.styleSheets;
		ss.rel = "stylesheet";
		ss.href = href;
		// temporarily set media to something inapplicable to ensure it'll fetch without blocking render
		ss.media = "only x";

		// wait until body is defined before injecting link. This ensures a non-blocking load in IE11.
		function ready( cb ){
			if( doc.body ){
				return cb();
			}
			setTimeout(function(){
				ready( cb );
			});
		}
		// Inject link
			// Note: the ternary preserves the existing behavior of "before" argument, but we could choose to change the argument to "after" in a later release and standardize on ref.nextSibling for all refs
			// Note: `insertBefore` is used instead of `appendChild`, for safety re: http://www.paulirish.com/2011/surefire-dom-element-insertion/
		ready( function(){
			ref.parentNode.insertBefore( ss, ( before ? ref : ref.nextSibling ) );
		});
		// A method (exposed on return object for external use) that mimics onload by polling document.styleSheets until it includes the new sheet.
		var onloadcssdefined = function( cb ){
			var resolvedHref = ss.href;
			var i = sheets.length;
			while( i-- ){
				if( sheets[ i ].href === resolvedHref ){
					return cb();
				}
			}
			setTimeout(function() {
				onloadcssdefined( cb );
			});
		};

		function loadCB(){
			if( ss.addEventListener ){
				ss.removeEventListener( "load", loadCB );
			}
			ss.media = media || "all";
		}

		// once loaded, set link's media back to `all` so that the stylesheet applies once it loads
		if( ss.addEventListener ){
			ss.addEventListener( "load", loadCB);
		}
		ss.onloadcssdefined = onloadcssdefined;
		onloadcssdefined( loadCB );
		return ss;
	};
	// commonjs
	if( typeof exports !== "undefined" ){
		exports.loadCSS = loadCSS;
	}
	else {
		w.loadCSS = loadCSS;
	}
}( typeof global !== "undefined" ? global : this ));
