// read and set any environment variables w/dotenv package
//import dotenv package
//.config() reads .env file, parse the contents, assign it to process.env, 
//and return an Object with a parsed key containing the loaded content 
//or an error key if it failed.
var dotenv = require("dotenv").config();

//import the keys.js file
var keys = require("./keys.js");

//import node package
var Spotify = require('node-spotify-api');

// access keys.js data
var spotify = new Spotify(keys.spotify);

var axios = require('axios');

//declare variable & set value to the 3rd arguement passed in cmd line
var action = process.argv[2];
var searchWord = process.argv[3];

//Make it so liri.js can take in one of the following commands:
switch (action) {
    case 'concert-this':
        console.log('call Bands in Town Artist Events API');
        concert();
        break;
    case 'spotify-this-song':
        // console.log('call Spotify API ');
        song();
        break;
    case 'movie-this':
        movie();
        break;
    case 'do-what-it-says':
        console.log('call');
        // doWhatItSays();
        break;

}
//
function concert() {

    var artist = searchWord;

    var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(url).then(
            function(response) {
                // console.log(response.data);
                var venue = response.data[0].venue.name;
                // console.log('Name of the venue ' + venue);
                var location = "";
                console.log(response.data[0].venue.city + ', ' + response.data[0].venue.region);
                // console.log('Venue location: ' + location);

                //use moment to format this as "MM/DD/YYYY"
                // console.log(response.data[0].datetime);

                var date = response.data[0].datetime;
                console.log('Date of the Event: ' + date);
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
        // console.log('Artist(s): ' + artist);
        var album = data.tracks.items[0].album.name;
        // console.log('Album: ' + album);
        var songUrl = data.tracks.items[0].external_urls.spotify;
        // console.log('A preview link of the song from Spotify ' + songUrl);

        var track = data.tracks.items[0].name;
        console.log("Song name: " + track);


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

//Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
//It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
//Edit the text in random.txt to test out the feature for movie-this and concert-this.
function doWhatItSays() {

}