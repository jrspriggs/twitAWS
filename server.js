/* Setting things up. */
require('dotenv').config();
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


var fibonacciSequence = [1,1,2,3,5,8,13,21,34,55,89];
var player = 0;


function tweetStatus(message, card_uri) {
  console.log("tweeting: ", message, "card:", card_uri);
  var options= { status: message};
  if(card_uri != undefined) {
    options.card_uri = card_uri
  }
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

app.all("/" + process.env.BOT_ENDPOINT, function (request, response) {
/* The example below tweets out "Hello world! in case anyone tries to talk to this bot". */
  var resp = response;
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

async function buildLink(whereClause) {
  var baseTweet = await getRandomFullRow('tweets', whereClause)
  var advert = baseTweet.tweet;
  var tagCount = 0;
  //add the link
    console.log("ad base:", advert);
  if(baseTweet.card_uri.length < 2) {
    advert += " https://www.amazon.com/dp/" + baseTweet.ASIN
  } 
  var usedTags = [];
  while(advert.length < 300 && tagCount < 3) {
    // add hashtags until the ad is filled
    var tag = await getRandomRow('hashtags', 'hashtag', 'where general = 1');
    if(usedTags.indexOf(tag) >= 0) {
      // tag was already used, skip and do it again
      continue;
    }
    if((advert.length + tag.length + 2) > 280 || tagCount == 2) {
      tweetStatus(advert, baseTweet.card_uri);
    }
    advert += " #" + tag;
    tagCount = tagCount + 1;
    usedTags.push(tag);
  }
}

async function buildMediumLink() {
  var mediumTweet = await getRandomFullRow('mediumTweets','');
  var advert = `${mediumTweet.tweet} ${mediumTweet.mediumUrl}`;
  console.log(advert, advert.length);
      tweetStatus(advert);
}

function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

async function ILikeTweet() {
  var randoTweet = "I like " + await getRandomRow('nouns', 'noun', '') + ". #ThingsILike"; 
  return randoTweet;
}


async function buildRandoTweet() {
  var tweet = await getRandomRow('madlibTweets', 'tweet', '');
  var randoTweet =  await buildTweetText(tweet);
  return randoTweet;
}

function getRandomRow(tableName, columnName, whereClause) {
  var queryString =`select ${columnName} as theColumn from ${tableName} ${whereClause} ORDER BY RAND() LIMIT 1 `; 
  var returnValue = '';
  return new Promise(function(resolve, reject){
    connection.query(queryString, function (err, rows, fields) {
    if (err) reject(new Error("Error rows is undefined"));
    if( rows.length > 0) {
      returnValue = rows[0].theColumn;
    }
    resolve(returnValue);
  })});
}

function getRandomFullRow(tableName, whereClause) {
  var queryString =`select * from ${tableName} ${whereClause} ORDER BY RAND() LIMIT 1 `; 
  var returnValue = '';
  return new Promise(function(resolve, reject){
    connection.query(queryString, function (err, rows, fields) {
    if (err) reject(new Error("Error rows is undefined"));
    if( rows.length > 0) {
      returnValue = rows[0];
    }
    resolve(returnValue);
  })});
}

async function buildTweetText(genericTweet) {
  var replacer = '';
  var newVal = '';
  var madlibs = genericTweet.match(/@\w+@/g);
  
  for (const value of madlibs) {
    replacer = value.replace(/@/g, '');
    newVal = await getRandomRow( `${replacer}s`, replacer, '' );
    genericTweet = genericTweet.replace(value, newVal);
  }
  
  return genericTweet;
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

async function tweetPlayer() {
  try {
    if(fibonacciSequence[player] === 21) {
      //tweet a book advertisement
      buildLink('where id < 40');
     } else if(fibonacciSequence[player] === 2) {
      // tweet a medium link
      buildMediumLink();
      // tweet the book ad 
    } else if(fibonacciSequence[player] === 89) {
      //tweet a different book advertisement
      buildLink('where id >= 40');
    } else {
      //if not a specific index of fibonnaci sequence, then look at index number
      //even numbers will make a random tweet that is a writing prompt
      if ( (player % 2) === 0 )  {
        //randomly choose to build one of the weird story idea tweets
        tweetStatus(await buildRandoTweet());
      }
      
      // also retweet and like something by a random hash tag
      retweetAndLikeByTag(await getRandomRow('sourceTags', 'sourceTag', 'where id in (3,4,5)'));
    }
  } catch (err) {
    console.log(err)
  }
  
    player++;
    //once we reache the end of the fibonacci sequence, reset the player to 0 to restart the sequence again
    if(player >= fibonacciSequence.length) {
      player = 0;
      
    }
    // measure the distance between the last used and next number in the sequence
    var span = fibonacciSequence[player] - fibonacciSequence[player-1];
    //make sure the number is always at leas one
    span = span <= 1 ? 1 : span;
    // find a random number in that span to be the next timeout
    var randomTimeout =  fibonacciSequence[player-1] + Math.floor((Math.random() * (span)));
    randomTimeout = randomTimeout  < 1 ? 1 : randomTimeout;
    
    console.log("next tweet in " + (randomTimeout ).toString(10) + " minutes");
    //the next tweet will occur X minutes where x is somewhere in that span of the fibonacci sequence
    setTimeout(tweetPlayer, randomTimeout * 60000);
}

var listener = app.listen(process.env.PORT, async function () {
  console.log('Your bot is running on port ' + listener.address().port);
  console.log('startup tweet');
  tweetPlayer();
});