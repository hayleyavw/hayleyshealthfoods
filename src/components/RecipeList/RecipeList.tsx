import React from 'react'
import { Card } from '../Card/Card'
import { StyledRecipeList } from './RecipeList.styled'
import { getRecipeGraphQL } from '../../api/recipes/Queries'
import { Recipe } from '../../api/recipes/ResponseShapes'
import Loading from '../Loading/Loading'

interface State {
    recipes: Recipe[]
    loading: boolean
}

export class RecipeList extends React.Component {
    public readonly state: Readonly<State> = {
        recipes: [new Recipe()],
        loading: true,
    }

    async componentDidMount() {
        try {
            await getRecipeGraphQL({}).then(recipe => {
                this.setState({ recipes: recipe })
                this.setState({ loading: false })
            })
        } catch {
            this.setState({ loading: false })
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.state.loading ? (
                    <React.Fragment>
                        <Loading />
                    </React.Fragment>
                ) : (
                    <StyledRecipeList>
                        {this.state.recipes.map((recipe: Recipe, index) => (
                            <Card
                                key={index}
                                url={`/recipes/${recipe.slug}`}
                                title={recipe.title}
                                description={recipe.description}
                                thumbnail={recipe.thumbnail.url}
                                tags={recipe.tags}
                            />
                        ))}
                    </StyledRecipeList>
                )}
            </React.Fragment>
        )
    }
}
