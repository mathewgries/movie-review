import React from 'react'
import PropType from 'prop-types'

function Review(props) {
    var { movie } = props
    var pic = null
    var link = null

    if (movie.multimedia !== null) {
        pic = movie.multimedia.src
    }

    if (movie.link !== null) {
        link = movie.link.url
    }

    return (
        <div>
            <a href={link} className='redirect-link'>
                <div className='movie-result'>
                    <div className='image-container'>
                        {
                            pic !== null
                                ? <img
                                    src={pic}
                                    className='movie-result-image'
                                    atl={'Image for ' + movie.display_title}
                                />
                                : <div className='movie-result-image no-image'><p>No Image</p></div>
                        }
                    </div>
                    <div className='movie-result-details'>
                        <div>
                            <h2>{movie.display_title}</h2>
                            <h6>{movie.headline}</h6>
                        </div>
                        <ul>
                            <li><p>Critic:</p> {movie.byline !== '' ? movie.byline : 'N/A'}</li>
                            <li><p>Review Summary:</p> {movie.summary_short != '' ? movie.summary_short : 'N/A'}</li>
                            <li><p>Rating:</p> {movie.mpaa_rating !== '' ? movie.mpaa_rating : 'N/A'}</li>
                            <li><p>Release Date:</p> {movie.opening_date !== null ? movie.opening_date : 'N/A'}</li>
                        </ul>
                    </div>
                </div>
            </a>
        </div>
    )
}

Review.propTypes = {
    movie: PropType.array.isRequired
}

export default Review