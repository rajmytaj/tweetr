// jshint esversion: 6
// jshint node: true
/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function (){

  function createTweetElement (obj) {
    var timeSince = moment(`${obj.created_at}`, "x").fromNow();
    const html = `
    <article class="posted-tweet">
      <header class="tweet-header">
        <img class="profile-img" src="${obj.user.avatars.small}" />
        <span class="first-last-name">${obj.user.name}</span>
        <span class="usertag">${obj.user.handle}</span>
      </header>

      <p class="tweeted-content">${obj.content.text}</p>
      <footer>
        <span class="time-since-post">${timeSince}</span>
        <i class="fa fa-heart" aria-hidden="true"></i>
        <i class="fa fa-share-alt" aria-hidden="true"></i>
        <i class="fa fa-flag" aria-hidden="true"></i>
      </footer>
    </article>
  `;

  return html;
  }

  function renderTweets(data) {
    $("#tweets-container").empty();
    data.forEach(function (tweet) {
      $("#tweets-container").prepend(createTweetElement(tweet));
    });
  }

  function handleNewTweet(event) {
    event.preventDefault();
    if (validTweet()){
      let $form = $('form').serialize();
        $.ajax({
          url: '/tweets',
          method: 'POST',
          data: $form,
        }).done(function(data) {
          loadTweets(data);
        });
    }
  }

  function loadTweets() {
      $.ajax({
        url: '/tweets',
        method: 'GET',
        }).done(function(tweets) {
        renderTweets(tweets);
      });
  }
  loadTweets();


  function validTweet() {
    let $tweetTextArea = $(".tweet-text-area");
    if ($tweetTextArea.val().length === 0) {
      alert('tweets must contain characters!');
      return false;
    }
    else if ($tweetTextArea.val().length > 140) {
      alert('tweets can have a maximum of 140 characters');
      return false;
    }
    else {
      return true;
    }
  }


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

  $('.compose').click(function() {
    $('div.tweet-container').slideToggle();
    $('.tweet-text-area').focus();
  });

  $('form').on('submit',handleNewTweet);

});
