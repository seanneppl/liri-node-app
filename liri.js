// require("dotenv").config();
require('dotenv').config({ path: './keys.env' })

// const result = dotenv.config()
// if (result.error) {
//   throw result.error
// }
// console.log(result.parsed)

var keys = require("./keys.js");
var request = require("request");
var fs = require("fs");

var Spotify = require('node-spotify-api');
var Twitter = require("twitter");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


var commands = process.argv[2];
var commandInput = (process.argv[3] === undefined ? undefined : process.argv.splice(3).join(" "));

function doThis(commands, commandInput){
//user the switch case to call the function

switch (commands) {
    
    case "spotify-this-song":

        // This will show the following information about the song in
        // your terminal / bash window
        // default "The Sign" by Ace of Base.

        // Artist(s) console.log(dat.tracks.items[0].album.artists[0].name);
        // The song's name console.log(dat.tracks.items[0].name);
        // A preview link of the song from Spotify console.log(dat.tracks.items[0].external_urls.spotify);
        // The album that the song is from console.log(dat.tracks.items[0].album.name);

        var songName = (commandInput === undefined ? "The Sign Ace of Base" : commandInput);
        // console.log(songName);

        spotify.search({ type: 'track', query: songName, limit: 1 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            // console.log(JSON.stringify(data, null, 2));
            console.log("Artist: ",data.tracks.items[0].album.artists[0].name); // artist
            console.log("Song Title: ",data.tracks.items[0].name);  //song title
            console.log("URL: ",data.tracks.items[0].external_urls.spotify); // url
            console.log("Album: ",data.tracks.items[0].album.name); // album
        
            var songData = `${data.tracks.items[0].album.artists[0].name},${data.tracks.items[0].name}, ${data.tracks.items[0].external_urls.spotify}, ${data.tracks.items[0].album.name}\n`;
        fs.appendFile("log.txt", songData, function (err) {
            if (err) throw err;
            console.log("Song-data logged!");
        });
});
        break;
    case "my-tweets":
        //* This will show your last 20 tweets and when they were
        // created at in your terminal/bash window.

        var params = { screen_name: 'sean_e_n' };
        client.get('statuses/user_timeline', params, function (error, tweets, response) {
            if (!error) {
                // console.log(tweets);
                tweets.forEach(each => console.log(each.text + "  ( " + each.created_at + " )"));
            }
        var tweetData = [];
        tweets.forEach(each => tweetData.push(each.text));
            var tweetLog = tweetData.join(", ") + "\r\n";
        
        fs.appendFile("log.txt", tweetLog, function (err) {
            if (err) throw err;
            console.log("tweets logged!");
        });
  });
         // client.get('search/tweets', { q: 'from:sean_e_n', count: 20 }, function (error, tweets, response) {
        //     // console.log(JSON.stringify(tweets, null, 2));
        //     tweets.statuses.forEach(each => console.log(each.text));
        // });

        // client.post('statuses/update', { status: 'I am a tweet' }, function (error, tweet, response) {
        //     if (!error) {
        //         console.log(tweet);
        //     }
        // });

        break;
    case "movie-this":
        // * Title of the movie. JSON.parse(body).Title
        // * Year the movie came out. JSON.parse(body).Year
        // * IMDB Rating of the movie. JSON.parse(body).imdbRating
        // * Rotten Tomatoes Rating of the movie. JSON.parse(body).Ratings[1].Value;
        // * Country where the movie was produced. JSON.parse(body).Country
        // * Language of the movie. JSON.parse(body).Language
        // * Plot of the movie. JSON.parse(body).Plot
        // * Actors in the movie. JSON.parse(body).Actors
        // default "Mr. Nobody"

        var movieName = commandInput === undefined ? "Mr. Nobody" : commandInput;
        
        // console.log("movieName: ", movieName);

        // Then run a request to the OMDB API with the movie specified
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        // This line is just to help us debug against the actual URL.
        // console.log("URL: ", queryUrl);

        request(queryUrl, function (error, response, body) {
            if (error) { console.log("error ", error); }
            
            console.log("Title of the movie: ", JSON.parse(body).Title);
            console.log("The movie was released in: ", JSON.parse(body).Year);
            console.log("IMDB Rating: ",JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: ", JSON.parse(body).Ratings[1].Value);
            console.log("Country where the movie was produced: ",JSON.parse(body).Country);
            console.log("Language of the movie: ",JSON.parse(body).Language);
            console.log("Plot: ", JSON.parse(body).Plot);
            console.log("Actors: ",JSON.parse(body).Actors);
       

        var movieData = `${JSON.parse(body).Title}, ${JSON.parse(body).Year}, ${JSON.parse(body).imdbRating}, ${JSON.parse(body).Ratings[1].Value}, ${JSON.parse(body).Country}, ${JSON.parse(body).Language}, ${JSON.parse(body).Plot}, ${JSON.parse(body).Actors}\n`;

        fs.appendFile("log.txt", movieData, function (err) {
            if (err) throw err;
            console.log("Movie-data logged!");
        });
 });

        break;
    case "do-what-it-says":
        // * Using the`fs` Node package, LIRI will take the text inside
        // of random.txt and then use it to call one of LIRI's commands.

        // * It should run`spotify-this-song` for "I Want it That Way,"
        // as follows the text in `random.txt`.

        // This block of code will read from the "movies.txt" file.
        // It's important to include the "utf8" parameter or the code will provide stream data (garbage)
        // The code will store the contents of the reading inside the variable "data"
        fs.readFile("random.txt", "utf8", function (error, data) {
            // If the code experiences any errors it will log the error to the console.
            if (error) {
                return console.log(error);
            }
            // We will then print the contents of data
            console.log(data);
            // Then split it by commas (to make it more readable)
            var dataArr = data.split(",");
            // We will then re-display the content as an array for later use.
            // console.log(dataArr);
            var doThing = dataArr[0];
            var doThisInfo = dataArr[1];
            if(doThing === "do-what-it-says"){console.log("sorry can't do that"); return;};
            doThis(doThing, doThisInfo);
        });

        break;
    default:
        console.log("Well that didnt' work");
        console.log("command: ", commands);
}
}
doThis(commands, commandInput);


    