import React from 'react'
import PropTypes from 'prop-types'

class MovieSearch extends React.Component {

    static defaultProps = {
        direction: 'column',
    }

    static propTypes = {
        direction: PropTypes.string.isRequired,
    }

    state = {
        movie: ''
    }

    handleChange = (event) => {
        var value = event.target.value
        this.setState(() => ({ movie: value }))
    }

    handleSubmitMovie = () => {
        var { movie } = this.state
        this.props.onMovieSubmit(movie)
        this.setState(() => ({ movie: '' }))
    }

    render() {
        var { direction } = this.props
        var { movie } = this.state
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



export default MovieSearch