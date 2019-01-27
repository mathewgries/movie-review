import React from 'react'
//import { Link } from 'react-router-dom'
//import ResultsList from './ResultsList'
import PropTypes from 'prop-types'


class MovieSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmitMovie = this.handleSubmitMovie.bind(this)
    }

    handleChange(event){
        var value = event.target.value
        this.setState(function(){
            return {
                movie: value
            }
        })
    }

    handleSubmitMovie(){
        var { movie } = this.state
        this.props.onMovieSubmit(movie)
        this.setState(function(){
            return {
                movie: ''
            }
        })
    }

    render() {
        var { direction } = this.props
        var {movie} = this.state
        var disable = this.state.movie === '' ? true : false
        return (
            <div className='search-container' style={{ flexDirection: direction }}>
                <input
                    className='form-control'
                    type='text'
                    placeholder='Enter Movie Title...'
                    value={movie}
                    onChange={this.handleChange}
                />
                <button
                    type='button'
                    className='btn btn-success'
                    onClick={this.handleSubmitMovie}
                    disabled={disable}
                >
                    Search Reviews
			    </button>
            </div>
        )
    }
}

MovieSearch.defaultProps = {
    direction: 'column',
}

MovieSearch.propTypes = {
    direction: PropTypes.string.isRequired,
}

export default MovieSearch