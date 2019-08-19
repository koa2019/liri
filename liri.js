//import npm axios
var axios = require('axios');

//import fs node package
var fs = require('fs');

// dotenv npm reads & sets any environment variables 
// import dotenv package
// .config() reads .env file, parses the contents, assigns it to process.env, 
// and return an Object with a parsed key containing the loaded content 
// or an error key if it failed.
var dotenv = require("dotenv").config();

//import node package
var Spotify = require('node-spotify-api');

//import the keys.js file
var keys = require("./keys.js");

// access keys.js data
var spotify = new Spotify(keys.spotify);

if (process.argv.length < 1) {
    console.log("NOt enough agruements entered.")
}
//declare variable & set value to the 3rd arguement passed in cmd line
var action = process.argv[2];
var searchWord = process.argv[3];

//function uses axios get method to access data from Bands in Town API
function concert() {

    var artist = searchWord;

    var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(url).then(
            function(response) {

                var name = response.data[0].lineup[0];
                var venue = response.data[0].venue.name;
                var city = response.data[0].venue.city;
                var state = response.data[0].venue.region;
                var location = city + ', ' + state;
                var date = response.data[0].datetime;

                console.log('\nBand/Artist: ' + name +
                    '\nVenue: ' + venue +
                    '\nLocation: ' + location +
                    '\nDate of the Event: ' + date);

                //use moment to format this as "MM/DD/YYYY"
                // console.log(response.data[0].datetime);

            })
        .catch(function(err) {
            console.log('error')
        });
}

function song() {

    spotify.search({ type: 'track', query: searchWord, limit: 1 }, function(err, data) {
        if (err) {
            console.log('Error: ' + err);
        }

        var artist = data.tracks.items[0].artists[0].name;
        var album = data.tracks.items[0].album.name;
        var songUrl = data.tracks.items[0].external_urls.spotify;
        var track = data.tracks.items[0].name;

        console.log('Artist(s): ' + artist);
        console.log('Album: ' + album);
        console.log("Song name: " + track);
        console.log('A preview link of the song from Spotify ' + songUrl);
    });
}

//function uses axios get method to send a request. 
//if response is successful then movie details will be console logged, else an error message will be shown
function movie() {

    var movieName = searchWord;

    var url = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    // Then run a request with axios to the OMDB API with the movie specified
    axios.get(url).then(
            function(response) {

                var title = response.data.Title;
                var releaseDate = response.data.Released;
                var rating = response.data.imdbRating;
                var rottenTomatoes = response.data.Ratings[1].Value;
                var country = response.data.Country;
                var language = response.data.Language;
                var plot = response.data.Plot;
                var actors = response.data.Actors;
                console.log(title +
                    '\nReleased: ' + releaseDate +
                    "\nIMDB Rating of the movie: " + rating +
                    '\nRotten Tomatoes Rating: ' + rottenTomatoes +
                    '\nProduced in: ' + country +
                    '\nLanguage: ' + language +
                    '\nPlot: ' + plot +
                    '\nActors:' + actors +
                    '\n--------------');
            })
        .catch(function(error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                // `error.request` is an object that comes back with details pertaining to the error that occurred.
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log("Error", error.message);
            }
            console.log(error.config);
        });
}

//Using fs npm, functions reads data from random.txt and then uses it to call one of LIRI's commands.
//It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
//Edit the text in random.txt to test out the feature for movie-this and concert-this.
function doWhatItSays() {


    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
            return console.log(err);
        }
        // We will then print the contents of data
        // console.log('random.txt content: ' + data);

        // Then split it by commas & store in array for easier way to reference
        var dataArr = data.split(",");

        var command = "node liri.js ";

        // for (var d of dataArr) {
        for (var i = 0; i < dataArr.length; i++) {

            // console.log(dataArr[i]);
            var command = command + ' ' + dataArr[i];
        }
        console.log(command);
    });

    //BONUS append console logs to a file
    // fs.appendFile('log.txt', dataArr, function(err) {

    //     if (err) {
    //         return console.log(err);
    //     } else {
    //         console.log("Succesfully written to log.txt");
    //     }
    // });
}

//passes 1 agruement & excutes code within that case
switch (action) {
    case 'concert-this':
        concert();
        break;
    case 'spotify-this-song':
        song();
        break;
    case 'movie-this':
        movie();
        break;
    case 'do-what-it-says':
        doWhatItSays();
        break;
}