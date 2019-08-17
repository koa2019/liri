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

//declare variable & set value to the 3rd arguement passed in cmd line
var action = process.argv[2];
var searchWord = process.argv[3];

//Make it so liri.js can take in one of the following commands:
switch (action) {
    case 'concert-this':
        console.log('call Bands in Town Artist Events API ');
        // concert();
        break;
    case 'spotify-this-song':
        // console.log('call Spotify API ');
        song();
        break;
    case 'movie-this':
        console.log('call OMBD API ');
        // movie();
        break;
    case 'do-what-it-says':
        console.log('call ');
        // doWhatItSays();
        break;

}
//"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
function concert() {

    //import bandsintown API
    var bandsintown = require('bandsintown')(APP_ID);

    bandsintown
        .getArtist('Skrillex')
        .then(function(events) {
            // return array of events
        });

    console.log('Name of the venue ' + venue);

    console.log('Venue location: ' + location);

    //use moment to format this as "MM/DD/YYYY"
    console.log('Date of the Event: ' + date);

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

//use axios & trilogy api key
//function will output message if movieName is empty
function movie() {
    if (movieName === "") {
        console.log('If you havent watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/. Its on Netflix!');
        break;
    }
    // output:
    // Title of the movie.
    // Year the movie came out.
    // IMDB Rating of the movie.
    // Rotten Tomatoes Rating of the movie.
    // Country where the movie was produced.
    // Language of the movie.
    // Plot of the movie.
    // Actors in the movie.

}

//Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
//It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
//Edit the text in random.txt to test out the feature for movie-this and concert-this.
function doWhatItSays() {

}