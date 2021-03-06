// utils/GoogleAnalytics.js
import React, { Component } from 'react'
import ReactGA from 'react-ga'
import { Route } from 'react-router-dom'

interface Props {
    location: {
        pathname: string
        search: string
    }
    options: {}
}

class GoogleAnalytics extends Component<Props> {
    componentDidMount() {
        this.logPageChange(this.props.location.pathname, this.props.location.search)
    }

    componentDidUpdate(prevLocation: any) {
        const {
            location: { pathname, search },
        } = this.props
        const isDifferentPathname = pathname !== prevLocation.pathname
        const isDifferentSearch = search !== prevLocation.search

        if (isDifferentPathname || isDifferentSearch) {
            this.logPageChange(pathname, search)
        }
    }

    logPageChange(pathname: string, search = '') {
        const page = pathname + search
        const { location } = window
        ReactGA.set({
            page,
            location: `${location.origin}${page}`,
            ...this.props.options,
        })
        ReactGA.pageview(page)
    }

    render() {
        return null
    }
}

const RouteTracker = () => <Route component={GoogleAnalytics} />

const init = (options = {}) => {
    const isGAEnabled = process.env.NODE_ENV === 'production'

    if (isGAEnabled) {
        ReactGA.initialize('UA-61782039-2')
    }

    return isGAEnabled
}

export default {
    GoogleAnalytics,
    RouteTracker,
    init,
}
