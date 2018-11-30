/* Setting things up. */
require('dotenv').config();
var Airtable = require('airtable');
var base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID);

var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : process.env.DBHOST,
  user     : process.env.DBUSERNAME,
  password : process.env.DBPASSWORD,
  database : process.env.DB
});


var path = require('path'),
    express = require('express'),
    app = express(),   
    Twit = require('twit'),
    config = {
    /* Be sure to update the .env file with your API keys. See how to get them: https://botwiki.org/tutorials/how-to-create-a-twitter-app */      
      twitter: {
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token: process.env.ACCESS_TOKEN,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
      }
    },
    T = new Twit(config.twitter);

app.use(express.static('public'));

/* You can use uptimerobot.com or a similar site to hit your /BOT_ENDPOINT to wake up your app and make your Twitter bot tweet. */

function tweetStatus(message) {
  T.post('statuses/update', { status: message }, function(err, data, response) {
    if (err){
      console.log('Error!');
      console.log(err);
      console.log();
    }
    else{
      console.log('success!');
      console.log("tweeted: ", message);
    }
  });
}

function followed(eventMessage) {
  var name = eventMessage.source.name;
  var screenName = eventMessage.source.screen_name;
  tweetStatus('@'+screenName+' Thanks for the follow!');
}

app.all("/" + process.env.BOT_ENDPOINT, function (request, response) {
/* The example below tweets out "Hello world!". */
  var resp = response;
  tweetStatus('hello world 👋');
});

function retweet(id) {
  console.log(id);
  T.post('statuses/retweet/:id', { id: id }, function (err, data, response) {
    if (err){
      console.log('Error!');
      console.log(err);
      console.log();
    }
    console.log(data)
  })
}

function likeTweet(id) {
  console.log("liking: ", id);
  T.post('favorites/create', { id: id }, function (err, data, response) {
    if (err){
      console.log('Error!');
      console.log(err);
      console.log();
    }
    console.log(data)
  })
}

function buildLink() {
  var y = Math.floor((Math.random() * cachedBookTweets.length));
  var advert = cachedBookTweets[y].tweet;
  //add the link
  advert += " https://www.amazon.com/dp/" + cachedBookTweets[y].ASIN
  var usedTags = [];
  console.log(advert);
  while(advert.length < 280) {
    // add hashtags until the ad is filled
    var randTag = Math.floor((Math.random() * cachedHashTags.length));
    if(usedTags.indexOf(cachedHashTags[randTag].tag) >= 0) {
      console.log("found and continuing: ", cachedHashTags[randTag].tag, usedTags)
      // tag was already used, skip and do it again
      continue;
    }
    
    if((advert.length + cachedHashTags[randTag].length + 2) > 280) {
    console.log("returning", advert);
      return advert;
    }
    advert += " #" + cachedHashTags[randTag].tag;
    console.log(advert);
    usedTags.push(cachedHashTags[randTag].tag);
  }
}

function tweetPlayer() {
  
    if(fibonacciSequence[player] === 89) {
      // tweet the book ad
    } else if ( (player % 2) === 0 )  {
      retweetAndLikeByTag('#iartg');
      // even number index, retweet #iartg
    } else {
      // odd number index, tinkering time with making a more useful tweet
      retweetAndLikeByTag('#iartg');
      tweetStatus("Ready Player " + fibonacciSequence[player].toString(10) + " from array index " + player.toString(10));
    }
  
    player++;
    if(player >= fibonacciSequence.length) {
      player = 0;
      //refill caches
      fillCaches();
      
    }
    setTimeout(tweetPlayer, fibonacciSequence[player] * 60000);
    console.log("Next Player: ", player);
}

function fillCaches() {
  
  cachedBookTweets = [];
  cachedHashTags = [];
  connection.connect();
  connection.query('select * from tweets', function (err, rows, fields) {
    if (err) throw err
    for(var i = 0; i < rows.length; i++) {
        var obj = rows[i];
        cachedBookTweets.push(obj);
    }
    console.log("book tweets cache refilled!");
  });
  
  connection.query('select * from hashtags', function (err, rows, fields) {
    if (err) throw err
    for(var i = 0; i < rows.length; i++) {
        var obj = rows[i];
        cachedHashTags.push(obj);
    }
    console.log("book hashtags cache refilled!");
  });
  connection.end
}

function tryTweetLinks() {
  var link1 = buildLink();
  var link2 = buildLink();
  var link3 = buildLink();
  var link4 = buildLink();
  console.log("tweet 1", link1);
  console.log("tweet 1 length", link1.length);
  console.log("tweet 2", link2);
  console.log("tweet 2 length", link2.length);
  console.log("tweet 3", link3);
  console.log("tweet 3 length", link3.length);
  console.log("tweet 4", link4);
  console.log("tweet 4 length", link4.length);
}

var fibonacciSequence = [1,1,2,3,5,8,13,21,34,55,89];
var player = 0;

// Cache the records in case we get a lot of traffic.
// Otherwise, we'll hit Airtable's rate limit.
var cachedBookTweets = [];
var cachedHashTags = [];

var listener = app.listen(process.env.PORT, function () {
  console.log('Your bot is running on port ' + listener.address().port);
  console.log('startup tweet');
  fillCaches();
  //give ten seconds to fill the caches
   //setTimeout(tweetPlayer, 10000);
   setTimeout(tryTweetLinks, 3000);
  /*
  TODOS: 3 link builder
        5 tweet a random book link ad every on the 89 minute of fibonacci
          A) make link
          B) add certain hashtags always
          C) add random hashtags other times 
          D) length alway < 280 chars (does this include url though)
        6 every even index minutes grab recent iartg post, repost
        7 random generate post
  */
  
  
});

function retweetAndLikeByTag(hashTag) {
  T.get('search/tweets', { q: hashTag + ' -filter:retweets', count:3, result_type: 'recent' }, function(err, data, response) {
    if (err) throw err
    console.log(data.statuses);
    for(var i = 0; i < data.statuses.length; i++) {
        likeTweet(data.statuses[i].id_str);
    }
    retweet(data.statuses[0].id_str);
  });
  
}