//API Key 8PZUG6VpbkmEyObiRifjjEe2wWO8u09t
// Initial array of topics.
var topics = ["Nintendo", "Playstation", "xBox", "PC Gaming", "Blizzard Entertainment", "Rockstar Games", "StarCraft 2", "Diablo III", "GTA5", "Fallout 4", "Overwatch"]

renderButtons()


// Event listener for buttons
$(document).on("click", ".topic-btn", displayGifs);

$(document).on("click", ".topicImg", function(){
    toggleAnimate(this)
});

// $(".topicImg").on("click", function() {
//     toggleAnimate(this);
//   });

function displayGifs() {

    var gifSearch = $(this).attr("data-name");
    // var queryURL = "https://www.omdbapi.com/?t=" + gif + "&y=&plot=short&apikey=trilogy";
    // Storing our giphy API URL for a topic image
    var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + gifSearch;
    // var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=8PZUG6VpbkmEyObiRifjjEe2wWO8u09t&limit=1&rating=" + "" + "&q=" + gifSearch

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        console.log(response);
        // Saving the image_original_url property
        // var imageUrl = response.data.image_original_url;
        var imageUrl = response.data.images.downsized_still.url;

        // Creating and storing an image tag
        var topicImage = $("<img>");
        
        // Setting the topicImage src attribute to imageUrl
        topicImage.attr("src", imageUrl);
        topicImage.attr("alt", "game image");
        topicImage.addClass("topicImg")

        // Prepending the topicImage to the images div
        $("#images").prepend(topicImage);
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