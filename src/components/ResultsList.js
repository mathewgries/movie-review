import React from 'react'
import Review from './Review'
import { getMovie } from '../utils/api'
import PropType from 'prop-types'

class ResultsList extends React.Component {

    static propTypes = {
        location: PropType.object.isRequired
    }

    state = {
        resultList: [],
        count: 0,
        orderby: 'title',
        ascending: true,
        loading: false,
        more: false,
    }

    componentDidMount = () => {
        var movie = this.props.location.search.slice(1)

        this.setState(() => ({ loading: true }))

        getMovie(movie)
            .then(({ results, num_results, has_more }) => {
                this.setState(() => ({
                    orderby: 'title',
                    ascending: true,
                    resultList: results.sort((a, b) => {
                        var x = a.display_title
                        var y = b.display_title
                        if (x < y) { return -1 }
                        if (x > y) { return 1 }
                        return 0
                    }),
                    count: num_results,
                    loading: false,
                    more: has_more,
                }))
            }).catch((error) => console.log('Did Mount', error))
    }

    componentWillReceiveProps = (nextProps) => {
        var movie = nextProps.location.search.slice(1)

        this.setState(() => ({ loading: true }))

        getMovie(movie)
            .then((data) => {
                this.setState(() => ({
                    orderby: 'title',
                    ascending: true,
                    resultList: data.results.sort((a, b) => {
                        var x = a.display_title
                        var y = b.display_title
                        if (x < y) { return -1 }
                        if (x > y) { return 1 }
                        return 0
                    }),
                    count: data.num_results,
                    loading: false,
                    more: data.has_more,
                }))
            }).catch((error) => console.log('Recieve Props', error))
    }


    reorderList = (event) => {
        var name = event.target.name
        if (name === 'title') { this.orderListByTitle(name) }
        if (name === 'date') { this.orderListByDate(name) }
    }

    orderListByTitle = (name) => {
        var ascending = this.state.orderby === name ? !this.state.ascending : true
        var list = this.state.resultList
        var newList = []

        if (ascending) {
            newList = list.sort((a, b) => {
                var x = a.display_title.toLowerCase()
                var y = b.display_title.toLowerCase()
                if (x < y) { return -1 }
                if (x > y) { return 1 }
                return 0
            })
        }
        else {
            newList = list.sort((a, b) => {
                var x = a.display_title.toLowerCase()
                var y = b.display_title.toLowerCase()
                if (x > y) { return -1 }
                if (x < y) { return 1 }
                return 0
            })

        }

        this.setState(() => ({
            resultList: newList,
            ascending: ascending,
            orderby: name,
        }))
    }

    orderListByDate = (name) => {
        var ascending = this.state.orderby === name ? !this.state.ascending : true
        var newList = []
        var list = this.state.resultList

        if (ascending) {
            newList = list.sort((a, b) => new Date(b.opening_date) - new Date(a.opening_date))
        } else {
            newList = list.sort((a, b) => new Date(a.opening_date) - new Date(b.opening_date))
        }

        this.setState(() => ({
            resultList: newList,
            ascending: ascending,
            orderby: name,

        }))
    }

    render() {
        const { loading } = this.state
        return (
            loading === true
                ? <div>Loading</div>
                : <div className='list-container'>
                    <div className='order-container'>
                        <div className='order-header'>
                            <h3>Review List</h3>
                        </div>
                        <div className='order-button-group'>
                            <p>Order by: </p>
                            <button
                                type='button'
                                className='order-btn btn-primary'
                                name='title'
                                onClick={this.reorderList}
                            >
                                Title
                            </button>
                            <button
                                type='button'
                                className='order-btn btn-primary'
                                name='date'
                                onClick={this.reorderList}
                            >
                                Release Date
                            </button>
                        </div>
                    </div>
                    {this.state.resultList.map((item, index) => <Review key={index} movie={item} />)}
                </div>
        )
    }
}

export default ResultsList