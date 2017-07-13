$(document).ready(function() {
  $(".tweet-text-area").on('input', function () {
    var maxTweetLength = 140;
    var tweetCount = (maxTweetLength - $(this).val().length);
    $(this).parent().find('.counter').html(tweetCount);
    
    //checks if tweetCount is above max tweet length allowed and adds class
    if(tweetCount < 0) {
      $('.counter').addClass('over-character-count');
    }
    else {
      $('.counter').removeClass('over-character-count');
    }
  });

});
