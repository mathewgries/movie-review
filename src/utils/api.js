var axios = require('axios');

// var _baseURL = 'http://api.openweathermap.org/data/2.5/';
// var _APIKEY = 'b714ec74bbab5650795063cb0fdf5fbe';

var _baseURL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?query='
var _APIKEY = '&api-key=lDScKB3aIURGUXjTzj5U8RAZtaSF8n1F'

function getMovie(movie) {
    return axios.get(_baseURL + movie + _APIKEY )
        .then(function (res) {
            return res.data
        })
        .catch(function (error) {
            console.error(error)
        })
}

module.exports = {
    getMovie: getMovie
}