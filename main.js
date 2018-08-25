var $body = $('body');
var index = streams.home.length - 1;
var newidx = index;

var showTweets = function() {
  for (var i = 0; i < index; i++) {
    appendTweets(i);
  }
}

var appendTweets = function(idx) {
  var tweet = streams.home[idx];
  var $tweet = $("<div class=tweet></div>");
  var $user = $("<div class=user></div>");
  var $message = $("<div class=message></div>");
  var $time = $("<div class=timeago></div>");

  $user.html('<strong>@' + tweet.user + '</strong>');
  $message.text(tweet.message);
  $time.html(jQuery.timeago(tweet.created_at));
  
  $user.addClass(tweet.user);
  $tweet.prependTo("#tweets");
  $tweet.append($user);
  $tweet.append($message);
  $tweet.append($time);
}

// var sortTweets = function() {
//   var str = $(this).text().slice(1);
//   for (var prop in streams.users) {
//     if (prop !== str) {
//       $("." + prop).parent("div").hide();
//     }
//   }
//   var $newButton = $("<button class=first></button>");
//   $newButton.html('Go to the main page');
//   $newButton.appendTo(".post")
// }

var writingTweets = function() {
  var $tweetcontents = $('#post-tweet-comment').val();

  var $tweet = $("<div class=tweet></div>");
  var $user = $("<div class=user></div>");
  var $message = $("<div class=message></div>");
  var $time = $("<div class=timeago></div>");

  $user.html("<strong>@visitor<strong>");
  $message.text($tweetcontents);
  $time.html(jQuery.timeago(new Date()));

  $user.addClass("visitor");
  $tweet.prependTo("#tweets");
  $tweet.append($user);
  $tweet.append($message);
  $tweet.append($time);  
}

var refreshDate = new Date();
  
function updateTimeStamp() {
  var timeAgo = jQuery.timeago(refreshDate);
  $(".timeago").text(timeAgo);
}

$(document).ready(function() {


  updateTimeStamp();
  setInterval(updateTimeStamp, 60000);

  showTweets();

  $('#submit-tweet').on('click', function() {
    if ($('#post-tweet-comment').val()) {
      writingTweets();
      $('#post-tweet-comment').val("")
    }
  })
  
  $('#refresh-tweet').on('click', function() {
    for (var idx = newidx; idx < streams.home.length - 1; idx++) {
      appendTweets(idx)
      newidx = idx + 1;
    }
  });

}).on('click', '.user', function() {
  var str = $(this).text().slice(1);
  for (var prop in streams.users) {
    if (prop !== str) {
      $("." + prop).parent("div").hide();
    }
  }
  var $newButton = $("<button class=first></button>");
  $newButton.html('Go to the main page');
  $newButton.appendTo(".post")  
}).on('click', '.first', function() {
  $('.first').remove();
  $('.tweet').show();
});