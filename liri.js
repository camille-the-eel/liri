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

console.log(input);

function concertThis(input) {

    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp").then(
        function (response) {
            var bit = response.data[0];
            // var venueName = venue.VenueData.name;
            // console.log(bit.VenueData.name);
            console.log(response);

            //STILL NEED TO FIND AND SHOW THE DATA
            //AND SET DEFAULT


    }).catch(function (error) {
            console.log(error);
        });

    fs.appendFile("log.txt", input + "\n", function(error) {
        if (error) {
            console.log("Error");
        }
    });
}

function spotifyThis(input) {
     
    spotify.search( {type: 'track', query: input }, function (error, response) {
        if (error) {
        return console.log('Error occurred: ' + error);
        }

        var data = response.tracks.items[0];
        var display = [
            "Artist: " + data.artists[0].name,
            "Song Name: " + data.name,
            "Album Name: " + data.album.name,
            "Preview Link: " + data.preview_url
        ]
     
        console.log(display); 
        //pretty up the log display
    });

    fs.appendFile("log.txt", input + "\n", function(error) {
        if (error) {
            console.log("Error, cannot be logged.");
        }
    });
}

function movieThis(input) {

    axios.get("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy").then( 
        function (response) {
            console.log(response);

            //STILL NEED TO FIND AND SHOW THE DATA
            //and set default
    });

    fs.appendFile("log.txt", input + "\n", function(error) {
        if (error) {
            console.log("Error, cannot be logged" + error);
        }
    });

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
        
        //maybe use switch for this instead?

    })
}

//change logging  into one function that is called in each function