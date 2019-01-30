require("dotenv").config();

var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
var moment = require("moment");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);

var input = process.argv.slice(3).join(" ");

if (process.argv.length === 2) {
    console.log("Please give me a command!  \n Search for music events by band or artist with: concert-this \n Learn more about your favorite songs with: spotify-this-song \n Get more information about your favorite movies with: movie-this \n Randomize your result with: do-what-it-says");
} else if (process.argv[2] === "concert-this") {
    concertThis(input);
} else if (process.argv[2] === "spotify-this-song") {
    spotifyThis(input);
} else if (process.argv[2] === "movie-this") {
    movieThis(input);
} else if (process.argv[2] === "do-what-it-says") {
    doThis(input);
} else {
    console.log("Please enter a valid command. \n Search for music events by band or artist with: concert-this \n Learn more about your favorite songs with: spotify-this-song \n Get more information about your favorite movies with: movie-this \n Randomize your result with: do-what-it-says");
}

console.log(input);


//BANDS IN TOWN 
function concertThis(input) {

    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp")
        .then(function (response) {
            var bit = response.data[0];
            // var venueName = venue.VenueData.name;
            console.log(bit.venue.name);
        })
        .catch(function (error) {
            console.log(error);
        });

        fs.appendFile("log.txt", input + "\n", function(error) {
            if (error) {
                console.log("Error");
            }
    });
}

function spotifyThis(input) {

    axios.get()
        .then(function (response) {

        })


}
// COMMANDS TO INCLUDE
// * `concert-this`  `node liri.js concert-this <artist/band name here>`
    // WILL SEARCH BANDS IN TOWN FOR AN ARTIST AND GIVE YOU
    // name of venue
    // venue location
    // date of event mm/dd/yyyy

// * `spotify-this-song` `node liri.js spotify-this-song '<song name here>'`
    // will show this info:
    // artist
    // song name
    // preview link of song from spotify
    // album

    // if no song, default is : the sign by ace of base

// * `movie-this`
    // output:
    // * Title of the movie.
    // * Year the movie came out.
    // * IMDB Rating of the movie.
    // * Rotten Tomatoes Rating of the movie.
    // * Country where the movie was produced.
    // * Language of the movie.
    // * Plot of the movie.
    // * Actors in the movie.

    // default: mr. nobody

// * `do-what-it-says`