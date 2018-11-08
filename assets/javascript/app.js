//API Key 8PZUG6VpbkmEyObiRifjjEe2wWO8u09t
// Initial array of topics.
var topics = ["Nintendo", "Playstation", "xBox", "PC Gaming", "Blizzard Entertainment", "Rockstar Games", "StarCraft 2", "Diablo III", "GTA5", "Fallout 4", "Overwatch"]

renderButtons()


// Event listeners for buttons
$(document).on("click", ".topic-btn", displayGifs);

$(document).on("click", ".topicImg", function(){
    toggleAnimate(this)
});

// $(".topicImg").on("click", function() {
//     toggleAnimate(this);
//   });
function toggleAnimate(img) {
    // Grab url of the clicked image
    var clickSRC = $(img).attr("src");
    console.log(clickSRC);
    // Does it have "_s.gif"?
    if (clickSRC.search("_s.gif") != -1) {
        console.log(clickSRC.search("_s.gif"))
        clickSRC = clickSRC.replace("_s.gif", ".gif");
        console.log(clickSRC);
    } else {
        clickSRC = clickSRC.replace(".gif", "_s.gif");
        console.log(clickSRC);
    }
    // Update image src
    $(img).attr("src", clickSRC);
  
  }
function displayGifs() {

    var gifSearch = $(this).attr("data-name");
    var l = 10;
    var r = "r";
    // var queryURL = "https://www.omdbapi.com/?t=" + gif + "&y=&plot=short&apikey=trilogy";
    // Storing parts of API call construct
    var baseURL = "https://api.giphy.com/v1/gifs/search?";
    var apiKey = "api_key=8PZUG6VpbkmEyObiRifjjEe2wWO8u09t&";
    var q = "q=" + gifSearch + "&";
    var rating= "rating=" + r + "&";
    var limit = "limit=" + l + "&";
    queryURL = baseURL + apiKey + q + rating + limit
    console.log(queryURL)
    //https://api.giphy.com/v1/gifs/search?api_key=8PZUG6VpbkmEyObiRifjjEe2wWO8u09t&limit=10&rating=&q=gta
    // Storing our giphy API URL for a topic image
    // var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + gifSearch;
    // var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=8PZUG6VpbkmEyObiRifjjEe2wWO8u09t&limit=1&rating=" + "" + "&q=" + gifSearch
    
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response);
        // Saving the image_original_url property
        // var imageUrl = response.data.image_original_url;
        var imageUrl = response.data[1].images.downsized_still.url;
        // Store this into varable first then we can prepend it. Need to put image into it. 
        var topicCard = $("<div>").addClass("card col-6")
        topicCard.html('<div class="card-body"> \
                <h5 class="card-title">Card title</h5> \
                <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6> \
                <img class="card-img-top topicImg" alt="game image" src="' + imageUrl + '"></img> \
                <a href="#" class="card-link">Card link</a> \
                <a href="#" class="card-link">Another link</a> \
            </div> \
        </div> ')
        $("#images").prepend(topicCard);
        // // Creating and storing an image tag
        // var topicImage = $("<img>")
        
        // // Setting the topicImage src attribute to imageUrl
        // .attr("src", imageUrl)
        // .attr("alt", "game image")
        // .addClass("topicImg")
        // .addClass("col-6");

        // // Prepending the topicImage to the images div
        // $("#images").prepend(topicImage);
    });
  }
// Function for displaying topic buttons
function renderButtons() {

    // Deleting the topic buttons prior to adding new topic button
    // (this is necessary otherwise we will have repeat buttons)
    $("#buttonsList").empty();

        // Looping through the array of topics
        for (var i = 0; i < topics.length; i++) {

            // Then dynamicaly generating buttons for each topic in the array.
            var a = $("<button>");
            // Adding a class
            a.addClass("topic-btn");
            // Adding a data-attribute with a value of the topic at index i
            a.attr("data-name", topics[i]);
            // Providing the button's text with a value of the topic at index i
            a.text(topics[i]);
            // Adding the button to the HTML
            $("#buttonsList").append(a);
        }
}

      // This function handles events where one button is clicked
      $("#add-topic").on("click", function(event) {
        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();

        // This line will grab the text from the input box
        var topic = $("#topic-input").val().trim();
        // The topic from the textbox is then added to our array
        topics.push(topic);

        // calling renderButtons which handles the processing of our topic array
        renderButtons();
      });