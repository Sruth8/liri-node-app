require("dotenv").config();

// these are the npm calls-require I need
var keys = require("./keys.js");

var axios = require("axios");
var fs = require("fs");


var Spotify = require("node-spotify-api");

var spotify = new Spotify(keys.spotify);
var request = require("request");
var moment = require("moment"); // for the concert api
// var spotify = new Spotify({

//   });

//   spotify.search({ type: 'track', query: 'Black Sweat' }, function(err, data) {
//     if (err) {
//       return console.log('Error occurred: ' + err);
//     }

//   console.log(data); 
//   });




//put process.argv variables here

var input = process.argv;
var command = input[2]; // this gets the users input
var userdata = input[3];
// var userdata = "";

//  for (i = 3; i < input.length; i++) {
// 	name = name + " " + input[i];
//}


//  spotify-this-song function
function spotifyJams(info) {
    if (!info) {

        info = 'The Sign by Ace of Base';  //info || '"The Sign" by Ace of Base'

    }
    spotify.search({ type: 'track', query: info }, function (error, data) {

        if (error) {
            console.log('Error occurred: ' + error);
            return;
        }

        // console.log(data);
        var summary = data.tracks.items;

        console.log("Artist(s): " + summary[0].artists[0].name);
        console.log("Song Name: " + summary[0].name);
        console.log("Preview Link: " + summary[0].preview_url);
        console.log("Album: " + summary[0].album.name);
    })

};



//  movie-this function
// Watch levelOneOmdbInteractive.js video
function omdbFlix(info) {
    //axios.get("http://www.omdbapi.com/?i=&y=&plot=short&apikey=trilogy")
    var queryUrl = "http://www.omdbapi.com/?t=" + info + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function (error, response, body) {

        if (info) {
            info = 'Mr Nobody';
        }
        // 200= this error code means the reponse was sent and it is ok on the http level
        if (!error && response.statusCode === 200) {

            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
        }
    });

};

// //  do-what-it-says function
function liriSays() {

    fs.readFile('random.txt', 'utf8', function (error, data) {

        if (error) {
            return console.log(error)
        };

        var dataArr = data.split(',');

        if (dataArr[0] === 'spotify-this-song') {
            spotifyJams(dataArr[1]);

        } else if (dataArr[0] === 'movie-this') {
            omdbFlix(dataArr[1]);

        } else if (dataArr[0] === 'concert-this') {
            concert(dataArr[1]);

        } else {
            console.log("What are you doing?")
        };

    });

};
  //concert-this  Patrick helped me with this part of the code
function concert(info) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + info + "/events?app_id=codingbootcamp";

    request(queryUrl, function (error, response) {
        if (!info) {
            info = "Purple Rain, Prince";

        }



        //var result = JSON.parse(body)[0];  // got this from youtube. this is suppose to formate the info in console.log
        if (!error && response.statusCode === 200) {
            var result = JSON.parse(response.body)[0];
            console.log("City: " + result.venue.city);
            console.log("Venue Name: " + result.venue.name);
            console.log("Event Date: " + moment(result.datetime).format("mm/dd/yyyy")
            );
        }

    });
}

// function concert() {
//     fs.readFile("random.txt", "utf-8", function(error, data) {
//         console.log(error);
//     });
// }

// //  Run liri.js  switches
switch (command) {


    case "spotify-this-song":
        if (userdata) {
            spotifyJams(userdata);
        } else {
            spotifyJams();
        };
        break;

    case "movie-this":
        if (userdata) {
            omdbFlix(userdata);
        } else {
            omdbFlix("Mr. Nobody")
        };
        break;

    case "do-what-it-says":
        liriSays();
        break;

    case "concert-this":
        if (userdata) {
            concert(userdata);
        } else {
            concert("  ")
        };
        break;

    default:
        console.log("{Enter a command:  spotify-this-song, movie-this, do-what-it-says}");
        break;
}

// // var follower = new Spotify({       //keys.spotify
// //     follower_ID: "",
// //     follower_secret: "",
// // } );       


// // var Music = function () {

// //     this.divider = "\n----------------------------\n\n";


// //     this.findBands = function (bands) {

// //         var URL = ('https://api.spotify.com/v1/bands');


// //             axios.get(URL).then(function (respose) {

// //                 var jsonData = response.data;
// //                 var


















