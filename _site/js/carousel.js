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
