/* Setting things up. */
require('dotenv').config();
var Airtable = require('airtable');
var base = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
}).base(process.env.AIRTABLE_BASE_ID);
var tweetsTable = 'Tweets';
var hashTagsTable = 'hashtags';
var viewName = 'Main View';

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

app.all("/" + process.env.BOT_ENDPOINT, function (request, response) {
/* The example below tweets out "Hello world!". */
  var resp = response;
  if (cachedResponse && new Date() - cachedResponseDate < cacheTimeoutMs) {
    response.send(cachedResponse);
  } else {
    // Select the first 10 records from the view.
    base(tweetsTable).select({
      maxRecords: 10,
      view: viewName,
    }).firstPage(function(error, records) {
      if (error) {
        response.send({error: error});
      } else {
        cachedResponse = {
          records: records.map(record => {
            return {
              name: record.get('Name'),
              picture: record.get('Picture'),
            };
          }),
        };
        cachedResponseDate = new Date();
        
        response.send(cachedResponse);
      }
    });
  }
  T.post('statuses/update', { status: 'hello world 👋' }, function(err, data, response) {
    if (err){
      resp.sendStatus(500);
      console.log('Error!');
      console.log(err);
    }
    else{
      resp.sendStatus(200);
    }
  });
});

// Cache the records in case we get a lot of traffic.
// Otherwise, we'll hit Airtable's rate limit.
var cacheTimeoutMs = 5 * 1000; // Cache for 5 seconds.
var cachedResponse = null;
var cachedResponseDate = null;
var cachedHashTags = null;

var listener = app.listen(process.env.PORT, function () {
  console.log('Your bot is running on port ' + listener.address().port);
  console.log('startup tweet');
  T.post('statuses/update', { status: 'Ready Player One' });
    base(tweetsTable).select({
      maxRecords: 10,
      view: viewName,
    }).firstPage(function(error, records) {
      if (error) {
      } else {
        cachedHashTags = {
          records: records.map(record => {
            return {
              tag: record.get('tag'),
              length: record.get('length'),
            };
          }),
        };
      }
    });
});
