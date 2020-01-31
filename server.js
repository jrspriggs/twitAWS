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
  console.log("tweeting: ", message);
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

function tweetStatusWithCard(message, card_uri) {
  console.log("tweeting: ", message, "card:", card_uri);
  T.post('statuses/update', { status: message, card_uri: card_uri }, function(err, data, response) {
    if (err){
      console.log('Error!');
      console.log(err);
      console.log(err.twitterReply.errors);
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

function buildLink(tweetArray) {
  var y = Math.floor((Math.random() * tweetArray.length));
  var advert = tweetArray[y].tweet;
  var tagCount = 0;
  //add the link
    // += " #kindleUnlimited";
    console.log("ad base:", advert);
    console.log("card_uri and len: " , tweetArray[y].card_uri, " ", tweetArray[y].card_uri.length);
  if(tweetArray[y].card_uri.length < 2) {
    advert += " https://www.amazon.com/dp/" + tweetArray[y].ASIN
  } 
  var usedTags = [];
  console.log(advert.length);
  while(advert.length < 300 && tagCount < 3) {
    // add hashtags until the ad is filled
    var randTag = Math.floor((Math.random() * cachedHashTags.length));
    console.log(cachedHashTags[randTag].tag);
    if(usedTags.indexOf(cachedHashTags[randTag].tag) >= 0) {
      // tag was already used, skip and do it again
      continue;
    }
    
    //check if it's one of my books or someone elses, skip tag if it's somebody else's book and this isn't a general tag
    //if(cachedHashTags[randTag].general === 0 && (tweetArray[y].ASIN === 'B07DB15B2F' ||tweetArray[y].ASIN === 'B07H65HX56')) {
  //    continue;
    //}
    
    if((advert.length + cachedHashTags[randTag].length + 2) > 280 || tagCount == 2) {
      tweetStatusWithCard(advert, tweetArray[y].card_uri);
    }
    advert += " #" + cachedHashTags[randTag].tag;
    tagCount = tagCount + 1;
    usedTags.push(cachedHashTags[randTag].tag);
  }
}

function buildMediumLink() {
  var y = Math.floor((Math.random() * cachedMediumTweets.length));
  var advert = cachedMediumTweets[y].tweet;
  var tagCount = 0;
  //add the link
    console.log("medium ad base:", advert);
    advert += " " + cachedMediumTweets[y].mediumUrl;
  console.log(advert.length);
      tweetStatus(advert);
}

function buildTingler() {
  //
//        ex: verbing noun Pounded in the butt by verbing2 plural nouns at a place with noun2
  
  var placeIndex = Math.floor((Math.random() * cachedPlaces.length));
  var pluralNounIndex = Math.floor((Math.random() * cachedPluralNouns.length));
  var verbing1Index = Math.floor((Math.random() * cachedVerbings.length));
  while(cachedPluralNouns[pluralNounIndex] === 'babies') {
    pluralNounIndex = Math.floor((Math.random() * cachedPluralNouns.length));
  }
  //let's leave chuck out of this one
  while(cachedPlaces[placeIndex] === 'the writing shed of @ChuckWendig') {
    placeIndex = Math.floor((Math.random() * cachedPlaces.length));
  }
  var verbing2Index = Math.floor((Math.random() * cachedVerbings.length));
  if(verbing2Index === verbing1Index) {
    verbing2Index = Math.floor((Math.random() * cachedVerbings.length));
  }
  var nounIndex = Math.floor((Math.random() * cachedNouns.length));
  var nounIndex2 = Math.floor((Math.random() * cachedNouns.length));
  var randoTingler = '"A ' + cachedVerbings[verbing1Index].verbing + " " + cachedNouns[nounIndex].noun + " pounded in the butt by "  + cachedVerbings[verbing2Index].verbing + " " + cachedPluralNouns[pluralNounIndex].noun + " at " + cachedPlaces[placeIndex].place  + " with a " + cachedNouns[nounIndex2].noun + '" #writingPrompts #BadStoryIdeas #tingler'; 
  return toTitleCase(randoTingler);
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

function ILikeTweet() {
  var nounIndex = Math.floor((Math.random() * cachedNouns.length));
  var randoTweet = "I like " + cachedNouns[nounIndex].noun + ". #ThingsILike"; 
  return randoTweet;
}

function indyCodeRandoTweet2() {

  var pluralNounIndex = Math.floor((Math.random() * cachedPluralNouns.length));
  var nounIndex = Math.floor((Math.random() * cachedNouns.length));
  var randoTweet = "Looking for a " +  cachedNouns[nounIndex].noun + " from the vendor swag at #indyCode this week. But will I find it? 🤔"; 
  return randoTweet;
}

function indyCodeRandoTweet() {

  var pluralNounIndex = Math.floor((Math.random() * cachedPluralNouns.length));
  var nounIndex = Math.floor((Math.random() * cachedNouns.length));
  var randoTweet = "Will I find a " +  cachedNouns[nounIndex].noun + " or " +  cachedPluralNouns[pluralNounIndex].noun + " while I attend #indyCode this week? Maybe my Conjurer will finally learn machine learning so I can answer it myself."; 
  return randoTweet;
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
  if(verbing2Index === verbing1Index) {
    verbing2Index = Math.floor((Math.random() * cachedVerbings.length));
  }
  var nounIndex = Math.floor((Math.random() * cachedNouns.length));
  var randoTweet = "Before you is " + cachedPlaces[placeIndex].place + ". The " + cachedPluralNouns[pluralNounIndex].noun + " are " + 
                    cachedVerbings[verbing1Index].verbing + ". The " + cachedNouns[nounIndex].noun + " is " + cachedVerbings[verbing2Index].verbing + ". #writingPrompts #BadStoryIdeas"; 
  return randoTweet;
}

function buildRandoTweet2() {
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
  if(verbing2Index === verbing1Index) {
    verbing2Index = Math.floor((Math.random() * cachedVerbings.length));
  }
  var nounIndex = Math.floor((Math.random() * cachedNouns.length));
  var randoTweet = "You suddenly appear at " + cachedPlaces[placeIndex].place + ". You can see " + cachedPluralNouns[pluralNounIndex].noun + " " + 
                    cachedVerbings[verbing1Index].verbing + ". You are being challenged by a " + cachedVerbings[verbing2Index].verbing + " " + cachedNouns[nounIndex].noun + ". #writingPrompts #BadStoryIdeas"; 
  return randoTweet;
}



function tweetPlayer() {
  try {
    if(fibonacciSequence[player] === 21) {
      buildLink(cachedBookTweets);
      // tweet the book ad
     } else if(fibonacciSequence[player] === 2) {
      //tweetStatus(buildTingler());
      buildMediumLink();
        //tweetStatus(buildRandoTweet());
      // tweet the book ad 
    } else if(fibonacciSequence[player] === 89) {
      //tweetStatus(ILikeTweet());
      buildLink(cachedADITweets);
      // tweet the book ad
    } else if ( (player % 2) !== 0 )  {
      var randTag = Math.floor((Math.random() * cachedSourceTags.length));
      retweetAndLikeByTag(cachedSourceTags[randTag].sourceTag);
      // odd number index, retweet #iartg
    } else {
      var randTag = Math.floor((Math.random() * 2));
      if(randTag === 1) {
        //tweetStatus(indyCodeRandoTweet2());
        tweetStatus(buildRandoTweet());
      } else {
        //tweetStatus(indyCodeRandoTweet());
        tweetStatus(buildRandoTweet2());
        
        var randTag = Math.floor((Math.random() * cachedSourceTags.length));
        retweetAndLikeByTag(cachedSourceTags[randTag].sourceTag);
      }
    }
  } catch (err) {
    console.log(err)
  }
  
    player++;
    if(player >= fibonacciSequence.length) {
      player = 0;
      //refill caches
      fillCaches();
      
    }
    var span = fibonacciSequence[player] - fibonacciSequence[player-1];
    span = span <= 1 ? 1 : span;
    var randomTimeout =  fibonacciSequence[player-1] + Math.floor((Math.random() * (span)));
    randomTimeout = randomTimeout  < 1 ? 1 : randomTimeout;
    console.log("next tweet in " + (randomTimeout ).toString(10) + " minutes");
    setTimeout(tweetPlayer, randomTimeout * 60000);
    console.log("Next Player: ", player);
}

function fillCaches() {
  
  cachedBookTweets = [];
  cachedHashTags = [];
   cachedPlaces = [];
   cachedPluralNouns = [];
   cachedNouns = [];
   cachedVerbings = [];
   cachedSourceTags = [];
   cachedMediumTweets = [];
   cachedADITweets = [];
  // connection.connect();
  connection.query('select * from mediumTweets', function (err, rows, fields) {
    if (err) throw err
    for(var i = 0; i < rows.length; i++) {
        var obj = rows[i];
        cachedMediumTweets.push(obj);
    }
    console.log("medium tweets cache refilled!");
  });
  connection.query('select * from tweets where id < 40', function (err, rows, fields) {
    if (err) throw err
    for(var i = 0; i < rows.length; i++) {
        var obj = rows[i];
        cachedBookTweets.push(obj);
    }
    console.log("book tweets cache refilled!");
  });
  connection.query('select * from tweets where id >= 40', function (err, rows, fields) {
    if (err) throw err
    for(var i = 0; i < rows.length; i++) {
        var obj = rows[i];
        cachedADITweets.push(obj);
    }
    console.log("ADI tweets cache refilled!");
  });
  
  connection.query('select * from hashtags where general = 1', function (err, rows, fields) {
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
  
  connection.query('select * from sourceTags where id in (3,4,5)', function (err, rows, fields) {
    if (err) throw err
    for(var i = 0; i < rows.length; i++) {
        var obj = rows[i];
        cachedSourceTags.push(obj);
    }
    console.log("source tags cache refilled!");
  });
}

function tryTweetLinks() {
  var link1 = buildLink(cachedBookTweets);
  var link2 = buildLink(cachedBookTweets);
  var link3 = buildLink(cachedBookTweets);
  var link4 = buildLink(cachedBookTweets);
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
var cachedADITweets = [];
var cachedHashTags = [];
var cachedPlaces = [];
var cachedPluralNouns = [];
var cachedNouns = [];
var cachedVerbings = [];
var cachedSourceTags = [];
var cachedMediumTweets = [];

function getRandomRow(tableName, columnName, whereClause, callback) {
  var queryString =`select ${columnName} as theColumn from ${tableName} ${whereClause} ORDER BY RAND() LIMIT 1 `; 
  var returnValue = '';
  console.log(queryString);
  return new Promise(function(resolve, reject){
    connection.query(queryString, function (err, rows, fields) {
    if (err) reject(new Error("Error rows is undefined"));
    console.log("blarg",rows[0].theColumn);
    if( rows.length > 0) {
      returnValue = rows[0].theColumn;
    }
    resolve(returnValue);
  })});
  
}

var listener = app.listen(process.env.PORT, async function () {
  console.log('Your bot is running on port ' + listener.address().port);
  console.log('startup tweet');
  console.log(await getRandomRow('pluralNouns', 'noun', ''));
  fillCaches();
  //give ten seconds to fill the caches
  setTimeout(tweetPlayer, 5000);
  //setTimeout(shortcutCall, 5000);
});

function shortcutCall() {
  buildLink(cachedADITweets);
}

function retweetAndLikeByTag(hashTag) {
  T.get('search/tweets', { q: hashTag + ' -filter:retweets', count:3, result_type: 'recent' }, function(err, data, response) {
    if (err) throw err
   
    if(data.statuses[0] !== undefined && data.statuses[0].id_str !== undefined) {
      // retweet able, retweet
      retweet(data.statuses[0].id_str);
      likeTweet(data.statuses[0].id_str);
    } else {
      // can't retweet, shit tweet it again
      tweetStatus(buildRandoTweet());
    }
  });
  
}