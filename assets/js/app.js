/*Start Psuedocode
For week06 project we will be creating an array which we will use to populate a row of buttons
These buttons when clicked will use AJAX to dynamically create 10 returns from GIPHY based
on the inputs associated with each button.
The images returned will be still.
The user will need to click the images to toggle whether or not the GIF is animated or still.
There is an option to add additional items to the array and display that to the html.
**New: Added local storage 
End Pseudocode */

//Optional sounds
let audioClick = new Audio("assets/sounds/mouse_click.wav");
let audioDing = new Audio("assets/sounds/ding.wav");

//localStorage.clear();
// Starting array of meals
let meals = JSON.parse(localStorage.getItem("mealStorage"));
    // Checks to see if the todolist exists in localStorage and is an array currently
    // If not, set a local list variable to an empty array
    // Otherwise list is our current list of todos
    if (!Array.isArray(meals)) {
        meals = [];
      }


/*
Remove the hard coded array for the local storage functionality
let meals = [
   "lobster",
    "Miller Lite",
    "barbeque",
    "pancit",
    "prime rib",
    "sushi",
    "cheesecake",
    "McRib",
    "red wine",
    "short rib",
    "ice cream",
    "deep dish pizza",
    "korean bbq",
    "gummy bears",
    "crab",
    "clam",
    "pho"
];*/


$(document).ready(function () {
    renderButtons();
    // Function for displaying the array
    function renderButtons() {
        // Deleting the content prior to adding new content
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttonSection").empty();
        // Looping through the array of movies
        
        var mealList = JSON.parse(localStorage.getItem("mealStorage"));
        
        if (!Array.isArray(mealList)){
            mealList = [];
            //Change the header
            $("#buttonHeader").text("Your favorite foods will show up here.")
            $("#inputMeal").focus();
        }

        for (let i = 0; i < mealList.length; i++) {
            //Change the header
            $("#buttonHeader").text("Click these foods!")
            // Then dynamicaly generating buttons for each movie in the array
            // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
            let a = $("<button>");
            // Adding a class of movie-btn to our button
            a.addClass("mealBtn");
            // Adding a data-attribute
            a.attr("mealName", mealList[i]);
            a.attr("value", i);
            // Providing the initial button text
            a.text(mealList[i]);
            // Adding the button to the buttons-view div
            $("#buttonSection").prepend(a);
        }//End For Loop
    }//End render Function
    // This function handles events where a movie button is clicked
    //$("body").on("click.formSubmit", function() {
    $("#formSubmit").on("click", function (event) {
        event.preventDefault();
        audioClick.play();
        //console.log(this.val);
        // This line grabs the input from the textbox
        let newMeal = $("#inputMeal").val().trim();
        if (newMeal.length > 0) { //Prevent null meals from being pushed into the array
            // Adding meal from the textbox to our array and LocalStorage
            meals.push(newMeal);
            localStorage.setItem("mealStorage",JSON.stringify(meals));
            $("input[type='text']").val("");
            //$("#inputMeal").text = "";
            //$("inputMeal").val("");
            // Calling renderButtons which handles the processing of our meal array
            renderButtons();
        };//End If
    });//End Submit click

    $("#formClear").on("click", function (event) {
        event.preventDefault();
        audioDing.play();
        //alert("I was clicked");
        localStorage.clear(); 
        $("input[type='text']").val("");        
        $("#gifSection").empty();
        meals = [];
        //Change the header
        $("#buttonHeader").text("Your favorite foods will show up here.")
        $("#inputMeal").focus();
        renderButtons();
    });//End Submit click


    $("body").on("click", ".mealBtn", function () {
        //alert("I was clicked!");
        $("#gifSection").empty();
        audioClick.play();
        //console.log("Button Value:", $(this).attr("value"));
        //console.log("Meal Name:", $(this).attr("mealName"));
        const apiKey = "&api_key=dc6zaTOxFJmzC&limit=10";
        let queryURL = "https://api.giphy.com/v1/gifs/search?q="
        let meal = $(this).attr("mealName");
        queryURL += meal;
        queryURL += apiKey;
        //console.log("QueryURL ", queryURL);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            //console.log("Size of the array: ", meals.length);
            for (let i = 0; i < response.data.length; i++) {
                //  console.log(i+ " " + meals[i] + "_____________________________________________________");
                //  console.log("Animated: ",response.data[i].images.fixed_width.url);
                //  console.log("Still ",response.data[i].images.fixed_width_still.url);
                //  console.log("_____________________________________________________");
                let gifFlex = $("#gifSection");
                let mealDiv = $("<div>");
                // Get the titel of the gif
                // Removed the title meta from gif. It added little value to the page
                //let title = response.data[i].title
                let rating = response.data[i].rating;
                // Gets the animated gif URL
                let active = response.data[i].images.fixed_width.url;
                // Gets the still gif URL
                let still = response.data[i].images.fixed_width_still.url;
                let mealImg = $("<img>");                
                let p = $("<p>").html("Rating: " + rating + " " + "<a download href='" + active + "' target='_blank'><i class='fa fa-download'></i></a>");
                gifFlex.addClass(".flex-container");
                mealImg.attr({ "src": still, "class": "gif img-responsive", "state": "still", "dataStill": still, "dataAnimate": active });
                //mealDiv.attr("class", "col-lg-3");
                mealDiv.append(p, mealImg);
                //mealDiv.append(mealImg);
                $("#gifSection").append(mealDiv);
                //$("#gifSection").append(p, mealImg);                
            }//End for Loop
        });//End Function Response 
    });//End AJAX call

    $("body").on("click", ".gif", function () {
        //alert("I was clicked");
        // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
        var state = $(this).attr("state");
        audioClick.play();
        // If the clicked image's state is still, update its src attribute to what its data-animate value is.
        // Then, set the image's data-state to animate
        // Else set src to the data-still value
        if (state === "still") {
            $(this).attr("src", $(this).attr("dataAnimate"));
            $(this).attr("state", "animate");
        } else {
            $(this).attr("src", $(this).attr("dataStill"));
            $(this).attr("state", "still");
        }//end If
    });//End gif click

});//End document ready