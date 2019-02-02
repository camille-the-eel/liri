# liri-node-app

LIRI is a command line node app, that will take the information (parameters) that you give it, and return data. 

Using the command, "concert-this" will search for events/shows of the artist you provide using the Bands in Town Artist Events API. You will receive the name and location of the venue, as well as the date of the event in MM/DD/YYYY format.

This is an example of how your command should look:
node liri.js concert-this Adele

The command, "spotify-this-song" utilizes an installed node package (node-spotify-api) to retreive information from the Spotify API. This information will include: the artist, song name, album, and a preview link of the song from Spotify. If you do not provide a song, the default "The Sign" by Ace of Base will be searched for.

This is an example of how your command should look:
node liri.js spotify-this-song Ocean Eyes

To search for information on your favorite movie, use the command "movie-this". It will use the installed node package, axios, to retreive data from the OMDB API. This will grab the following information about the movie you input: title, release year, IMDB rating, Rotten Tomatoes rating, country of production, language of the movie, plot synopsis, and actors. Should you not provide a movie, the program will output data for "Mr. Nobody".

This is an example of how your command should look:
node liri.js movie-this Interstellar

"do-what-it-says" will randomize your command. Running "do-what-it-says" will take the text from inside the "random.txt" file and call one of LIRI's commands. The data you receive will be dependent on which command is run.

This is an example of how your command should look:
node liri.js do-what-it-says

To watch a video of this app in action, use this link to download a short video: 
https://github.com/camille-the-eel/liri-node-app/blob/master/assets/liri-app.mov
