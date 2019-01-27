import React from 'react'
import Review from './Review'
var api = require('../utils/api')

class ResultsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resultList: [],
            count: 0,
            orderby: 'title',
            ascending: true,
            loading: false,
            more: false,
        }
        this.reorderList = this.reorderList.bind(this)
        this.orderListByTitle = this.orderListByTitle.bind(this)
        this.orderListByDate = this.orderListByDate.bind(this)
    }

    componentDidMount() {
        var movie = this.props.location.search.slice(1)

        this.setState(function () {
            return { loading: true, }
        })

        api.getMovie(movie)
            .then(function (data) {
                this.setState(function () {
                    return {
                        orderby: 'title',
                        ascending: true,
                        resultList: data.results.sort(function (a, b) {
                            var x = a.display_title
                            var y = b.display_title
                            if (x < y) { return -1 }
                            if (x > y) { return 1 }
                            return 0
                        }),
                        count: data.num_results,
                        loading: false,
                        more: data.has_more,
                    }
                })
            }.bind(this))
    }

    reorderList(event) {
        var name = event.target.name
        if (name === 'title') { this.orderListByTitle(name) }
        if (name === 'date') { this.orderListByDate(name) }
    }

    orderListByTitle(name) {
        var ascending = this.state.orderby === name ? !this.state.ascending : true
        var list = this.state.resultList
        var newList = []

        if (ascending) {
            newList = list.sort(function (a, b) {
                var x = a.display_title.toLowerCase()
                var y = b.display_title.toLowerCase()
                if (x < y) { return -1 }
                if (x > y) { return 1 }
                return 0
            })
        }
        else {
            newList = list.sort(function (a, b) {
                var x = a.display_title.toLowerCase()
                var y = b.display_title.toLowerCase()
                if (x > y) { return -1 }
                if (x < y) { return 1 }
                return 0
            })

        }

        this.setState(function () {
            return {
                resultList: newList,
                ascending: ascending,
                orderby: name,
            }
        })
    }

    orderListByDate(name) {
        var ascending = this.state.orderby === name ? !this.state.ascending : true
        var newList = []
        var list = this.state.resultList

        if (ascending) {
            newList = list.sort(function (a, b) {
                return new Date(b.opening_date) - new Date(a.opening_date)
            })
        } else {
            newList = list.sort(function (a, b) {
                return new Date(a.opening_date) - new Date(b.opening_date)
            })
        }

        this.setState(function () {
            return {
                resultList: newList,
                ascending: ascending,
                orderby: name,
            }
        })
    }

    render() {
        return (
            this.state.loading === true
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
                    {this.state.resultList.map(function (item) {
                        return <Review key={item.display_title} movie={item} />
                    })}
                </div>
        )
    }
}

export default ResultsList