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
  })
}

function buildLink() {
  var y = Math.floor((Math.random() * cachedBookTweets.length));
  var advert = cachedBookTweets[y].tweet;
  //add the link
  advert += " https://www.amazon.com/dp/" + cachedBookTweets[y].ASIN
  var usedTags = [];
  while(advert.length < 280) {
    // add hashtags until the ad is filled
    var randTag = Math.floor((Math.random() * cachedHashTags.length));
    if(usedTags.indexOf(cachedHashTags[randTag].tag) >= 0) {
      // tag was already used, skip and do it again
      continue;
    }
    
    if((advert.length + cachedHashTags[randTag].length + 2) > 280) {
      return advert;
    }
    advert += " #" + cachedHashTags[randTag].tag;
    usedTags.push(cachedHashTags[randTag].tag);
  }
}

function buildRandoTweet() {
  //
//        ex: You are in a British garden. In front of you is a private party. The babies are chanting. The dark is struggling to speak.
  //      check to make sure it doesn't match babies and fucking
  
  var placeIndex = Math.floor((Math.random() * cachedPlaces.length));
  var pluralNounIndex = Math.floor((Math.random() * cachedPluralNouns.length));
  var verbing1Index = Math.floor((Math.random() * cachedVerbings.length));
  while(cachedVerbings[verbing1Index] === 'fucking' && cachedPluralNouns[pluralNounIndex] === 'babies') {
    pluralNounIndex = Math.floor((Math.random() * cachedPluralNouns.length));
    verbing1Index = Math.floor((Math.random() * cachedVerbings.length));
  }
  var verbing2Index = Math.floor((Math.random() * cachedVerbings.length));
  var nounIndex = Math.floor((Math.random() * cachedNouns.length));
  var randoTweet = "Before you is a " + cachedPlaces[placeIndex].place + ". The " + cachedPluralNouns[pluralNounIndex].noun + " are " + 
                    cachedVerbings[verbing1Index].verbing + ". The " + cachedNouns[nounIndex].noun + " is " + cachedVerbings[verbing2Index].verbing + "."; 
  return randoTweet;
}

function tweetPlayer() {
  
    if(fibonacciSequence[player] === 2 || fibonacciSequence[player] === 21 || fibonacciSequence[player] === 55) {
      tweetStatus(buildLink());
      // tweet the book ad
    } else if ( (player % 2) !== 0 )  {
      retweetAndLikeByTag('#iartg');
      // odd number index, retweet #iartg
    } else {
      tweetStatus(buildRandoTweet());
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
  // connection.connect();
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
  
  connection.query('select * from nouns', function (err, rows, fields) {
    if (err) throw err
    for(var i = 0; i < rows.length; i++) {
        var obj = rows[i];
        cachedNouns.push(obj);
    }
    console.log("nouns cache refilled!");
  });
  
  connection.query('select * from places', function (err, rows, fields) {
    if (err) throw err
    for(var i = 0; i < rows.length; i++) {
        var obj = rows[i];
        cachedPlaces.push(obj);
    }
    console.log("places cache refilled!");
  });
  
  connection.query('select * from pluralNouns', function (err, rows, fields) {
    if (err) throw err
    for(var i = 0; i < rows.length; i++) {
        var obj = rows[i];
        cachedPluralNouns.push(obj);
    }
    console.log("pluralNouns cache refilled!");
  });
  
  connection.query('select * from verbings', function (err, rows, fields) {
    if (err) throw err
    for(var i = 0; i < rows.length; i++) {
        var obj = rows[i];
        cachedVerbings.push(obj);
    }
    console.log("verbings cache refilled!");
  });
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
var cachedPlaces = [];
var cachedPluralNouns = [];
var cachedNouns = [];
var cachedVerbings = [];

var listener = app.listen(process.env.PORT, function () {
  console.log('Your bot is running on port ' + listener.address().port);
  console.log('startup tweet');
  fillCaches();
  //give ten seconds to fill the caches
  setTimeout(tweetPlayer, 10000);
  
  
});

function retweetAndLikeByTag(hashTag) {
  T.get('search/tweets', { q: hashTag + ' -filter:retweets', count:3, result_type: 'recent' }, function(err, data, response) {
    if (err) throw err
    for(var i = 0; i < data.statuses.length; i++) {
        likeTweet(data.statuses[i].id_str);
    }
    retweet(data.statuses[0].id_str);
  });
  
}