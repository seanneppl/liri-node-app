# liri-node-app

The liri-node-app is a client line application that simulates some of the search and utilities of Apple's Siri using APIs.

The application uses the Twitter API, Spotify API, and OMDB API, as well as request.  

To use the application you type "node liri.js" and then one of several commands:

1. "my-tweets"

   Lists the last few tweets of a specified account.

2. "spotify-this-song 'song title'"

   Lists the artist, song title, url, and album for a specified song.  
   ex. 'node liri.js spofity-this-song "creep"'

3. "movie-this 'movie title'"

   Lists the title, release year, imdb rating, rotten tomates rating, country of origin, language, plot, and actors
for a specified movie.  
ex. 'node liri.js movie-this "Jurassic Park"'

4. "do-what-it-says"

   Reads the random.txt file and follows its command. In this case 'spotify-this-song,"I Want it That Way"'
   


Each time a command is run the results are saved to log.txt  

To use the application you must provide your own api keys by adding them to an .env file

```js
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

# Twitter API keys

TWITTER_CONSUMER_KEY=your-twitter-consumer-key
TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret

```

![ScreenShot](https://user-images.githubusercontent.com/38054153/45458323-b44d4280-b6b8-11e8-83e9-edfa6a8b0aa1.png)
