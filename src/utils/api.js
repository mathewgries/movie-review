import axios from 'axios'
// var _baseURL = 'http://api.openweathermap.org/data/2.5/';
// var _APIKEY = 'b714ec74bbab5650795063cb0fdf5fbe';

var _baseURL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?query='
var _APIKEY = '&api-key=lDScKB3aIURGUXjTzj5U8RAZtaSF8n1F'

export function getMovie(movie) {
    var formattedMovie = movie.toLowerCase()
    return axios.get(_baseURL + movie + _APIKEY)
        .then(function (res) {
            var results = res.data.results.filter(function(item){
                var title = item.display_title.toLowerCase()
                if(title.indexOf(formattedMovie) !== -1){
                    return item
                }else{
                    return null
                }
            })
            return {
                results
            }
        })
        .catch(function (error) {
            console.error(error)
        })
}