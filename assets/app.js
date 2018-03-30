//Variables ===============================
var topics = ["Harry Potter", "Dumbledore", "Snape"]; //array of topics that will be buttons
var submitVal = ""; //string value of user input
var apiKey = "NDPQ3BzRa9KCkBNbtUcTIpoo72QjK7eN";
var state = "";

//Functions ===============================
function callButtons(){ //populates the page with buttons from the topics array
    $(".button-field").html("");
    for(var i=0; i<topics.length; i++){
        $(".button-field").append(
            `<button data-name="${topics[i]}">${topics[i]}</button> `
        );
    };
};

//Main Process ============================

//Array of topics are made into buttons and put in the .button-field div
callButtons();

//Click event on any button uses ajax to pull 10 gifs from Giphy API
$(".button-field").on("click", "button", function(){
    var search = $(this).attr("data-name");
    search = search.replace(/\s/g,"+");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + apiKey + "&limit=10";

    $(".gif-farm").empty();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response.data);
        for (var i = 0; i<response.data.length; i++){
            //Gifs are displayed in the .gif-farm div
            $(".gif-farm").append(
                `<div class="gif">
                    <p>Gif Rating: ${response.data[i].rating}</p>
                    <img src="${response.data[i].images.fixed_height_still.url}" data-state="off" data-off="${response.data[i].images.fixed_height_still.url}" data-on="${response.data[i].images.fixed_height.url}">
                </div>`
            );
        };
    });
});

//Clicking a gif toggles its animation/moving status
$(".gif-farm").on("click", "img", function(){
    if ($(this).attr("data-state") === "off") {
        $(this).attr("src", $(this).attr("data-on"));
        $(this).attr("data-state", "on");
    }
    else {
        $(this).attr("src", $(this).attr("data-off"));
        $(this).attr("data-state", "off");
    }
});

//Click event on submit button will make a new button with user's input 
$("#addCharacter").on("click", function(event){
    event.preventDefault();
    submitVal = $(".userInput").val().trim();
    if (submitVal === ""){
        alert("Please enter a character.");
    }
    else{
        $(".userInput").val("");
        topics.push(submitVal);
        callButtons();
    };
});