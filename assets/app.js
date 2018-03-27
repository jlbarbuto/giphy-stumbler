//Variables ===============================
var topics = ["Harry Potter", "Dumbledore", "Snape"]; //array of topics that will be buttons
var submitVal = ""; //string value of user input
var apiKey = "NDPQ3BzRa9KCkBNbtUcTIpoo72QjK7eN";

//Functions ===============================
function callButtons(){ //populates the page with buttons from the topics array
    $(".button-field").html("");
    for(var i=0; i<topics.length; i++){
        $(".button-field").append(
            `<button data-name="${topics[i]}">${topics[i]}</button> `
        );
    };
}
//Main Process ============================

//Array of topics are made into buttons and put in the .button-field div
callButtons();
//Click event on any button uses ajax to pull 10 gifs from Giphy API
$("button").click(function(){
    var search = $(this).attr("data-name");
    search = search.replace(/\s/g,"+");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + apiKey + "&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response.data);
        console.log(response.data.length);
        for (var i = 0; i<response.data.length; i++){
            $(".gif-farm").append(
                `<img src="${response.data[i].images.fixed_height.url}">`
            );
        };
    });

});

//Gifs are displayed in the .gif-farm div

//Clicking a gif toggles its animation/moving status

//Click event on submit button will make a new button with user's input 