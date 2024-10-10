$(document).ready(function () {
  var quote;
  var author;

  // Function to get new quote  
  function getNewQuote() {
    // show loading animation
    $(".loading-svg").show();
    $("#text").text("");
    $("#author").text("");
    $.ajax({
      url: "http://api.forismatic.com/api/1.0/",
      jsonp: "jsonp",
      dataType: "jsonp",
      data: {
        method: "getQuote",
        lang: "en",
        format: "jsonp",
      },
      success: function (response) {
        quote = response.quoteText;
        author = response.quoteAuthor;
        $("#text").text(quote);
        if (author) {
          $("#author").text("Said by " + author);
        } else {
          $("#author").text("Unknown");
        }
        //hide loading animation
        $(".loading-svg").hide();
      },
    });
  }
  getNewQuote();
  $("#new-quote").on("click", function (event) {
    event.preventDefault();
    getNewQuote();
  });

  $(".share-quote").on("click", function (event) {
    event.preventDefault();
    window.open(
      "https://twitter.com/intent/tweet?text=" +
        encodeURIComponent(quote + "--Quote by" + author)
    );
  });
});
