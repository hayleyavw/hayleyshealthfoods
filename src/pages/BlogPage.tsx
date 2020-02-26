import React from 'react'
import * as H from 'history'
import { Nav } from '../components/Nav/Nav'
import { Footer } from '../components/Footer/Footer'

interface MatchParams {
    slug: string
}

interface Props extends RouteComponentProps<MatchParams> {}

export interface RouteComponentProps<P> {
    match: match<P>
    location: H.Location
    history: H.History
    staticContext?: any
}

export interface match<P> {
    params: P
    isExact: boolean
    path: string
    url: string
}

interface State {
    slug: string
    blogTitle: string
    blogContent: string
}
export class BlogPage extends React.Component<Props> {
    public readonly state: Readonly<State> = {
        blogTitle: '',
        blogContent: '',
        slug: this.props.match.params.slug,
    }

    componentDidMount() {
        const api_url = process.env.REACT_APP_API_URL || ''
        fetch(`${api_url}/blogs?slug=${this.state.slug}`)
            .then(results => {
                return results.json()
            })
            .then(data => {
                this.setState({ blogTitle: data[0].title })
                this.setState({ blogContent: data[0].content })
            })
    }

    render() {
        return (
            <React.Fragment>
                <Nav />
                <p>{this.state.blogTitle}</p>
                <p>{this.state.blogContent}</p>
                <Footer />
            </React.Fragment>
        )
    }
}
