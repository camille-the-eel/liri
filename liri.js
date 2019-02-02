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
    doThis();
} else {
    console.log("Please enter a valid command. \n Search for music events by band or artist with: concert-this \n Learn more about your favorite songs with: spotify-this-song \n Get more information about your favorite movies with: movie-this \n Randomize your result with: do-what-it-says");
}

function concertThis() {

    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp").then(
        function (response) {

            var bit = response.data;
            var count = 1;

            console.log("\n------------------- Events -------------------\n");
            for (i = 0; i < bit.length; i++) {
                console.log(count + "." + "\n");
                count++;

                var bitInfo = response.data[i].venue;
                var momentDate = bitInfo.datetime;
                var eventDisplay  = [
                    "Name of Venue: " + bitInfo.name,
                    "Location of Venue: " + bitInfo.city + ", " + bitInfo.country,
                    "Date of Event: " + 
                    moment(momentDate).format("MM/DD/YYYY")
                    // moment ^^ this is todays date???
                ].join("\n\n");

                console.log(eventDisplay + "\n----------------------------------------------\n");
            }

    }).catch(function (error) {
            console.log(error);
        });

    log("concert-this, " + input);
}

function spotifyThis() {
     
    spotify.search( {type: 'track', query: input }, function (error, response) {
        if (error) {
        return console.log('Error occurred: ' + error);
        }

        var songData = response.tracks.items[0];
        var songDisplay = [
            "Artist: " + songData.artists[0].name,
            "Song Name: " + songData.name,
            "Album Name: " + songData.album.name,
            "Preview Link: " + songData.preview_url
        ].join("\n\n");
     
        console.log("\n--------------------------------------\n" + songDisplay + "\n--------------------------------------\n"); 
    });

    log("spotify this song, " + input);
}

function movieThis() {

    axios.get("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy").then( 
        function (response, error) {
        if (error) {
            return console.log('Error occurred: ' + error);
        }

        var movieData = response.data;
        var movieDisplay = [
            "Movie Title: " + movieData.Title,
            "Release Year: " + movieData.Year,
            "IMDB Rating: " + movieData.imdbRating,
            "Rotten Tomatoes Rating: " + movieData.Metascore,
            "Country of Production: " + movieData.Country,
            "Language of the Movie: " + movieData.Language,
            "Plot: " + movieData.Plot,
            "Actors: " + movieData.Actors
        ].join("\n\n");

        console.log("\n--------------------------------------\n" + movieDisplay + "\n--------------------------------------\n");
    });

    log("movie-this, " + input);

}

function doThis() {

    fs.readFile("random.txt", "utf8", function(error, response) {
        if (error) {
            console.log(error);
        }

        var info = response.split(",");
        var command = info[0];
        var searchInput = info[1].replace(/"/g, '');

        if (command === "spotify-this-song") {
            spotifyThis(searchInput);
        } else if (command === "concert-this") {
            concertThis(searchInput);
        } else if (command === "movie-this") {
            movieThis(searchInput);
        } else {
            console.log("Error. Sorry.");
        }

    });
}

function log() {

    fs.appendFile("log.txt", input + "\n", function(error) {
        if (error) {
            console.log("Error, cannot be logged" + error);
        }
    });
}