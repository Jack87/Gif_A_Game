//API Key 8PZUG6VpbkmEyObiRifjjEe2wWO8u09t
// Initial array of topics.
var topics = ["Nintendo", "Playstation", "xBox", "PC Gaming", "Blizzard Entertainment", "Rockstar Games", "StarCraft 2", "Diablo III", "GTA5", "Fallout 4", "Overwatch", "Mario", "PacMan", "Tetris", "Space Invadors", "Street Fighter", "Donkey Kong", "Moral Kombat", "Zelda", "Tomb Raider"]
var gifsToPreloadArray =[];
var l = 10;
var r = "r";
var random = "search?";

renderButtons()

// Event listeners for buttons
$(document).on("click", ".topic-btn", function(){
    if ($("#remove-topics").attr("data-random") == "true") {
        var index = topics.indexOf($(this).attr("data-name"));
        if (index > -1) {topics.splice(index, 1)};
        console.log($(this).attr("data-name") + " was removed.")
        $(this).remove();
        if (topics.length < 1){
            alert("You don't have anymore search buttons. \nAdd more to search Gifs; \nor just so you can remove it again.");
            $("#topic-input").focus();
            return;
        }
    } else {   
        displayGifs(this);
    };
});
$(document).on("click", ".topicImg", function(){
    toggleAnimate(this);
});
$(document).on("click", ".rating-btn", function(){
    r = $(this).data('rating');
    $(".rating-btn").removeClass("active");
    $(this).addClass("active");
});
$(document).on("change", "#inputGroupSelect", function(){
    l = $(this).val();
    console.log($(this).val());
});
$(document).on("click", ".randomize-btn", function(){
    event.preventDefault();
    var randomBtn = this;
    if ($(randomBtn).attr("data-random") == "true") {
        $(randomBtn).attr("data-random", "false");
        random = "search?";
        $(randomBtn).removeClass("active");
        $(randomBtn).html('<i class="fa fa-random" aria-hidden="true"></i> Not Random');
    } else {
        $(randomBtn).attr("data-random", "true");
        random = "random?";
        $(randomBtn).addClass("active");
        $(randomBtn).html('<i class="fa fa-random" aria-hidden="true"></i> Random');
    };
    console.log("Random? " + $(randomBtn).attr("data-random"));
});
$(document).on("click", "#remove-topics", function(){
    var removeBtn = this;
    if ($(removeBtn).attr("data-random") == "true") {
        $(removeBtn).attr("data-random", "false");
        $(removeBtn).removeClass("active");
        $(removeBtn).html('<i class="fa fa-minus" aria-hidden="true"></i> Removal Off');
    } else {
        $(removeBtn).attr("data-random", "true");
        $(removeBtn).addClass("active");
        $(removeBtn).html('<i class="fa fa-minus" aria-hidden="true"></i> Removal On');
    };
    console.log("Remove topics: " + $(removeBtn).attr("data-random"));
});
// This function handles adding new topic to the topics array and rendering it on screen. 
$("#add-topic").on("click", function(event) {
    event.preventDefault();
    var topic = $("#topic-input").val().trim();
    if (topic == ""){
        alert("Enter something to add it!");
        $("#topic-input").val('').focus();
        return;
    };
    // This line will grab the text from the input box
    var topic = $("#topic-input").val().trim();
    // The topic from the textbox is then added to our array
    var checkExistence = [];
    for (var i = 0; i < topics.length; i++) {
        checkExistence.push(topics[i].toLowerCase());
        if (checkExistence.indexOf(topic.toLowerCase()) != -1){
            alert("That button already exists. Add a different one!")
            $("#topic-input").focus();
            return;
        }
    }
    topics.push(topic);
    // calling renderButtons which handles the processing of our topic array
    renderButtons();
    console.log(topic + " was added.")
    $('#topic-input').val('');
});
// Toggle Animation of gif
function toggleAnimate(img) {
    // Grab url of the clicked image
    var clickSRC = $(img).attr("src");
    console.log(clickSRC);
    if (clickSRC.search("_s.gif") != -1) {
        clickSRC = clickSRC.replace("_s.gif", ".gif");
        console.log(clickSRC);
    } else {
        clickSRC = clickSRC.replace(".gif", "_s.gif");
        console.log(clickSRC);
    }
    // Update image src
    $(img).attr("src", clickSRC);
  }
function displayGifs(tpc) {
    var gifSearch = $(tpc).attr("data-name");
    // Storing parts of API call construct
    // var baseURL = "https://api.giphy.com/v1/gifs/search?";
    var baseURL = "https://api.giphy.com/v1/gifs/";
    // var apiKey = "api_key=8PZUG6VpbkmEyObiRifjjEe2wWO8u09t&";
    // var apiKey = "api_key=8101kMpoOkY0OZMCiLrDyGMG8NpAJ4eQ&";
    var apiKey = "api_key=kSsEs2WpTg5QFqUOOp5hE8IzuB0PIaOh&";
    var isRandom = random; // https://developers.giphy.com/explorer/
    var q = "q=" + gifSearch + "&";
    var rating= "rating=" + r + "&";
    var limit = "limit=" + l + "&"; 
    if (random == "random?") {
        q = "tag=" + gifSearch + "&";
        limit = "limit=" + "" + "&"; 
    };
    var limit = "limit=" + l + "&"; 
    queryURL = baseURL + isRandom + apiKey + q + rating + limit
    // queryURL = queryURL.trim().replace(/ /g,"%20");
    console.log(queryURL)
    //https://api.giphy.com/v1/gifs/search?api_key=8PZUG6VpbkmEyObiRifjjEe2wWO8u09t&limit=10&rating=&q=gta
    // Storing our giphy API URL for a topic image
    // var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + gifSearch;
    // var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=8PZUG6VpbkmEyObiRifjjEe2wWO8u09t&limit=1&rating=" + "" + "&q=" + gifSearch
    if (random == "search?"){
        console.log(queryURL)
        $.ajax({
            url: queryURL,
            method: "GET"
          }).then(function(response) {
              console.log(response);
              for (var i = 0; i < l; i++) {
                  // Saving the image_original_url property
                  var imageUrl = response.data[i].images.fixed_height_still.url;
                  var gifURL = response.data[i].images.fixed_height.url;
                  var title = toTitleCase(response.data[i].title);
                  // Store this into varable first then we can prepend it. Need to put image into it. 
                  var topicCard = $("<div>").addClass("card col-lg-4 col-md-6 col-xs-12")
                  topicCard.html('<div class="card-body"> \
                          <h5 class="card-title"><strong>'+ gifSearch + '</strong></h5> \
                          <h5 class="card-title">'+ title + '</h5> \
                          <h6 class="card-subtitle mb-2 text-muted">Rating: ' + response.data[i].rating.toUpperCase() + '</h6> \
                          <img class="card-img-top topicImg" alt="game image" src="' + imageUrl + '"></img> \
                          <a href="' + response.data[i].url + '" class="card-link" target="_blank"><i class="fas fa-external-link-alt"></i> Giphy link</a> \
                          <a href="' + response.data[i].embed_url + '" class="card-link" target="_blank"><i class="fas fa-code"></i> Share Embed link</a> \
                      </div> \
                  </div> ')
                  $("#images").prepend(topicCard);
                //   console.log(gifURL)
                  loadGifsToCache(gifURL);
              }
          });
    } else { //Since Random doesn't have a limit parameter and only returns one Gif. Using a loop to retrive the total requested amounts of Gifs. 
        for (var i = 0; i < l; i++) {
            console.log(queryURL)
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function(response) {
                console.log(response);
                // Saving the image_original_url property
                var imageUrl = response.data.images.fixed_height_still.url;
                var gifURL = response.data.images.fixed_height.url;
                var title = toTitleCase(response.data.title);
                // Store this into varable first then we can prepend it. Need to put image into it. 
                var topicCard = $("<div>").addClass("card col-lg-4 col-md-6 col-xs-12")
                topicCard.html('<div class="card-body"> \
                        <h5 class="card-title"><strong>'+ gifSearch + '</strong></h5> \
                        <h5 class="card-title">'+ title + '</h5> \
                        <!-- // <h6 class="card-subtitle mb-2 text-muted">Rating: ' + "" + '</h6> \ --> \
                        <img class="card-img-top topicImg" alt="game image" src="' + imageUrl + '"></img> \
                        <a href="' + response.data.url + '" class="card-link" target="_blank"><i class="fas fa-external-link-alt"></i>Giphy link</a> \
                        <a href="' + response.data.embed_url + '" class="card-link" target="_blank"><i class="fas fa-code"></i> Share Embed link</a> \
                        </div> ')
                $("#images").prepend(topicCard);
                // console.log(gifURL);
                loadGifsToCache(gifURL);
            });
        }
    };

  }
// Function for displaying topic buttons
function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}
function renderButtons() {
    // Deleting the topic buttons prior to adding new topic button
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttonsList").empty();
        // Looping through the array of topics
        for (var i = 0; i < topics.length; i++) {
            // Then dynamicaly generating buttons for each topic in the array.
            var a = $("<button>");
            // Adding a class
            a.addClass("topic-btn btn btn-outline-secondary m-1");
            // Adding a data-attribute with a value of the topic at index i
            a.attr("data-name", topics[i]);
            // Providing the button's text with a value of the topic at index i
            a.text(topics[i]);
            // Adding the button to the HTML
            $("#buttonsList").append(a);
        }
}
function loadGifsToCache(gifToPreload) { // Function to load Gifs to Cache
    console.log(gifToPreload)
    var preloadedGIF = $("<img>")
    .attr("src",  gifToPreload)
    .attr("class", "gif-img-preloaded")
    .attr("alt", "preloaded giphy goes here")
    .attr("style", "display: none");
    $("#preloaded-giphy-view").append(preloadedGIF);
} // animated images will now animate quicker once clicked by user
