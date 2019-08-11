//add code to read and set any environment variables w/dotenv package
//import dotenv package
var dotenv = require("dotenv").config();

//readFile
dotenv.readFile();

//import the keys.js file
var keys = require("./keys.js");

//readFile
keys.readFile();

// access your keys information
var spotify = new Spotify(keys.spotify);

//declare variable & set value to the 3rd arguement passed in cmd line
var action = process.argv[2];

//Make it so liri.js can take in one of the following commands:
switch (action) {
    case 'concert-this':
        console.log('call Bands in Town Artist Events API ');
        concert();
        break;
    case 'spotify-this-song':
        console.log('call Spotify API ');
        song();
        break;
    case 'movie-this':
        console.log('call OMBD API ');
        movie();
        break;
    case 'do-what-it-says':
        console.log('call ');
        doWhatItSays();
        break;

}
//"https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
function concert() {

    console.log('Name of the venue ' + venue);

    console.log('Venue location: ' + location);

    //use moment to format this as "MM/DD/YYYY"
    console.log('Date of the Event: ' + date);

}

function song() {

    console.log('Artist(s): ' + artist);

    console.log("Song name: " + track);

    console.log('A preview link of the song from Spotify ' + songUrl);

    console.log('Album: ' + album);
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