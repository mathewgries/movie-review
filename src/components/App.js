import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import MovieSearch from './MovieSearch'
import ResultsList from './ResultsList';

function Blurb() {
	return (
		<div>
			<p>
				This is a search engine for the New York Times Movie Review API.
				Search a movie title, and get a result list matching your requested
				title. All rights belong to New York Times
			</p>
		</div>
	)
}

function Header() {
	return (
		<div className='site-header-container'>
			<div>
				<h1>
					<Link to='/' className='header-link'>
						Welcome to Movie Review
					</Link>
				</h1>
			</div>
			<div>
				<MovieSearch
					direction='row'
				/>
			</div>
		</div>
	)
}

function Footer() {
	return (
		<div className='footer'>
			<p>Copyright (c) 2019 The New York Times Company. All Rights Reserved.</p>
		</div>
	)
}

function Home(props) {
	return (
		<div className='home-container'>
			<div className='blurb-container'>
				<Blurb />
			</div>
			<div className='movie-search-container'>
				<h3 className='search-header'>Search Movie Reviews</h3>
				<MovieSearch
					direction='column'
					onMovieSubmit={function (movie) {
						props.history.push({
							pathname: 'moviereviews',
							search: movie
						})
					}}
				/>
			</div>
		</div>
	)
}

class App extends Component {
	render() {
		return (
			<Router>
				<div className='container'>
					<Header />
					<Switch>
						<Route exact path='/' component={Home} />
						<Route path='/moviereviews' component={ResultsList} />
					</Switch>
					<Footer />
				</div>
			</Router>
		);
	}
}

export default App
