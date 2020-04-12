import React from 'react'
import * as H from 'history'
import { RecipeSteps } from '../components/RecipeSteps/RecipeSteps'
import { getRecipeBySlug, getRecipeGraphQL } from '../api/recipes/Queries'
import { Recipe } from '../api/recipes/ResponseShapes'
import { Hero } from '../components/Hero/Hero'
import { RecipeHead } from '../components/CustomHead/RecipeHead'
import ErrorPage from '../components/ErrorPage/ErrorPage'
import Loading from '../components/Loading/Loading'
import { StyledContentBox } from '../components/common/ContentBox.styled'
import { jsonld } from '../components/common/jsonld'
import Helmet from 'react-helmet'

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
    recipe: Recipe
    loading: boolean
}

function isRecipeObject(response: Recipe | Error): response is Recipe {
    return (response as Recipe).title !== undefined
}

export class RecipePage extends React.Component<Props> {
    public readonly state: Readonly<State> = {
        slug: this.props.match.params.slug,
        recipe: new Recipe(),
        loading: true,
    }

    async componentDidMount() {
        try {
            const response = await getRecipeBySlug({ slug: this.state.slug })
            if (isRecipeObject(response)) {
                getRecipeGraphQL({ id: response.id }).then(recipe => {
                    this.setState({ recipe: recipe })
                    this.setState({ loading: false })
                })
            }
        } catch {
            this.setState({ loading: false })
        }
    }

    render() {
        const recipe = this.state.recipe
        return (
            <React.Fragment>
                {this.state.loading ? (
                    <React.Fragment>
                        <Helmet>
                            <script type="application/ld+json">{jsonld}</script>
                        </Helmet>
                        <StyledContentBox>
                            <Loading />
                        </StyledContentBox>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        {recipe.slug !== 'Loading...' ? (
                            <React.Fragment>
                                <RecipeHead recipe={recipe} />
                                <React.Fragment>
                                    <Hero
                                        smallImage={recipe.thumbnail}
                                        mediumImage={recipe.mediumImage}
                                        largeImage={recipe.largeImage}
                                        title={recipe.title}
                                        tags={recipe.tags}
                                    />
                                    <RecipeSteps
                                        method={recipe.method}
                                        ingredients={recipe.ingredients}
                                    />
                                </React.Fragment>
                            </React.Fragment>
                        ) : (
                            <ErrorPage />
                        )}
                    </React.Fragment>
                )}
            </React.Fragment>
        )
    }
}
