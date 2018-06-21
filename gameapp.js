/********** GLOBAL VARIABLES ***********/

// let the javascript know the width and height of the image we placed in our HTML;
var width = 400;
var height = 400;
//count the number of clicks a user has to find treasure. Start at 0
var clicks = 0;
// Create an array that sets random coordinates for the hidden treasure.
var target = [getRandomNumber(width), getRandomNumber(height)]

/********** JQUERY DOM ELEMENTS ***********/

// When the app loads, we only want the form to show.
$(".game").hide();

//When the user submits the form, we want to grab their name to put into the heading, hide the form and show the game.
$("form").on("submit", function (event) {
    // this makes sure the DOM doesn't reload and lose all our data!
    event.preventDefault();

    //place the user's inputted name into the span tag with the #userName id
    $("#userName").text($("#name").val());

    // hide the form
    $("form").hide();

    //show the game
    $(".game").show();
})

// Code that runs when the user interacts with the map.
$("#map").click(function (event) {
    clicks++;

    //get distance between click event and target
    var distance = getDistance(event);

    // convert distance to a hint
    var distantHint = getDistanceHint(distance);

    // Update the #distance element with the new hint
    $("#distance").text(distantHint);

    // If the click was close enough, tell them they won!
    if (distance < 8) {
        alert(`Found the treasure in ${clicks} clicks!`)
    }
});

/********** FUNCTIONS THAT PROVIDE LOGIC TO THE GAME ***********/

// When we call getRandomNumber(400), we will get a number between 0 and 399.
function getRandomNumber(size) {
    // pick a random number and round it down
    return Math.floor(Math.random() * size);
}

function getDistance(event) {

    // The offsetX property returns the x-coordinate of the mouse pointer, relative to the target element.
    // Return Value: A Number, representing the horizontal coordinate of the mouse pointer, in pixels
    var diffX = event.offsetX - target[0];

    // The offsetY property returns the y-coordinate of the mouse pointer, relative to the target element.
    // Return Value: A Number, representing the vertical coordinate of the mouse pointer, in pixels
    var diffY = event.offsetY - target[1];

    //returns the sqare root of a number
    return Math.sqrt((diffX * diffX) + (diffY * diffY))
}

// Create the distance hint
function getDistanceHint(distance) {
    if (distance < 10) {
        return "Boiling Hot!";
    } else if (distance < 20) {
        return "Really Hot";
    } else if (distance < 40) {
        return "Hot";
    } else if (distance < 80) {
        return "Warm";
    } else if (distance < 160) {
        return "Cold";
    } else if (distance < 320) {
        return "Really Cold";
    } else {
        return "Freezing";
    }
}