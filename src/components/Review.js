import React from 'react'
import PropType from 'prop-types'

function Review({ movie }) {
    var pic = null
    var link = null

    if (movie.multimedia !== null) {
        pic = movie.multimedia.src
    }
    else {
        pic = 'https://i2.wp.com/kerryhannon.com/wp-content/uploads/2013/11/the-new-york-times-logo.jpg?fit=1202%2C1056&ssl=1'
    }

    if (movie.link !== null) {
        link = movie.link.url
    }

    return (
        <div>
            <a href={link} className='redirect-link'>
                <div className='movie-result'>
                    <div className='image-container'>
                        <img
                            src={pic}
                            className='movie-result-image'
                            alt={'Image for ' + movie.display_title}
                        />
                    </div>
                    <div className='movie-result-details'>
                        <div>
                            <h2>{movie.display_title}</h2>
                            <h6>{movie.headline}</h6>
                        </div>
                        <ul>
                            <li><p>Critic:</p> {movie.byline !== '' ? movie.byline : 'N/A'}</li>
                            <li><p>Review Summary:</p> {movie.summary_short !== '' ? movie.summary_short : 'N/A'}</li>
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
    movie: PropType.object.isRequired
}

export default Review