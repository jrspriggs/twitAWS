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

function tweetPlayer() {
  
    tweetStatus("Ready Player " + fibonacciSequence[player].toString(10) + " from array index " + player.toString(10));
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
  });
  
  connection.query('select * from hashtags', function (err, rows, fields) {
    if (err) throw err
    for(var i = 0; i < rows.length; i++) {
        var obj = rows[i];
        cachedHashTags.push(obj);
    }
  });
  
  connection.end
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
  //tweetStatus('Ready Player One');
  tweetPlayer();
  /*
  TODOS: 1 connnect to database
        2 start caching tweets/tags
        3 link builder
        4 reset cache when older than one hour
        5 tweet a random book link ad every on the 89 minute of fibonacci
          A) make link
          B) add certain hashtags always
          C) add random hashtags other times 
          D) length alway < 280 chars (does this include url though)
        6 every even index minutes grab recent iartg post, repost
        7 random generate post
  */
  
  
});
