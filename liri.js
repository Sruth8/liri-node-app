require("dotenv").config();
var keys = require("./keys.js");

var axios = require("axios");
var spotify = require("node-spotify-api");

var fs = require("fs");

var spotify = new Spotify(keys.spotify);

var Music = function () {

    this.divider = "\n----------------------------\n\n";


    this.findBands = function (bands) {

        var URL = 'https://api.spotify.com/v1/bands') {


            axios.get(URL).then(function (respose) {

                var jsonData = response.data;
                var





            }
           )
    }












}