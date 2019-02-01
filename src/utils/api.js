import axios from 'axios'

var _baseURL = 'https://api.nytimes.com/svc/movies/v2/reviews/search.json?query='
var _APIKEY = '&api-key=lDScKB3aIURGUXjTzj5U8RAZtaSF8n1F'

async function filterTitles(movie, movies) {
    const filteredTitles = movies.data.results.filter((item) => (
        item.display_title.toLowerCase().indexOf(movie) !== -1
    ))
    return filteredTitles
}


export async function getMovie(movie) {
    const movieToLower = movie.toLowerCase()
    const results = await axios.get(_baseURL + movieToLower + _APIKEY)
        .catch((error) => console.error(error))

    const filteredResults = await filterTitles(movieToLower, results)

    return filteredResults
}