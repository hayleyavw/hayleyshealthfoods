import React from 'react'
import ReactGA from 'react-ga'
import {
    StyledLatestRecipeList,
    StyledLatestRecipeCard,
    StyledLatestRecipeImage,
    StyledLatestRecipeCardHeadings,
    StyledLatestRecipeDescription,
    StyledLatestRecipeImageWrapper,
    StyledTagsWrapper,
} from './LatestRecipeList.styled'
import { Recipe, TagObject } from '../../../api/recipes/ResponseShapes'
import { getRecipeGraphQL } from '../../../api/recipes/Queries'
import Loading from '../../Loading/Loading'
import { buildImagePath } from '../../../utils/utils'
import { TagLabel } from '../../TagLabel/TagLabel'

interface State {
    recipes: Recipe[]
    loading: boolean
}

export class LatestRecipeList extends React.Component {
    public readonly state: Readonly<State> = {
        recipes: [new Recipe()],
        loading: true,
    }

    async componentDidMount() {
        await getRecipeGraphQL({ preview: true, limit: '4' }).then(recipes => {
            this.setState({ recipes: recipes })
            this.setState({ loading: false })
        })
    }

    render() {
        let recipes = this.state.recipes
        recipes.forEach(recipe => {
            if (recipe.description.length > 120) {
                recipe.description = `${recipe.description.slice(0, 120)}...`
            }
        })

        function GAEvent(index: number, recipeName: string) {
            let action: string = ''
            switch (index) {
                case 0:
                    action = 'Featured'
                    break
                case 1:
                    action = 'Top'
                    break
                case 2:
                    action = 'Middle'
                    break
                case 3:
                    action = 'Bottom'
                    break
                default:
                    break
            }
            ReactGA.event({
                category: 'Latest',
                action: action,
                label: recipeName,
            })
        }

        return (
            <React.Fragment>
                {this.state.loading ? (
                    <React.Fragment>
                        <Loading />
                    </React.Fragment>
                ) : (
                    <StyledLatestRecipeList>
                        {recipes.map((recipe, index) => (
                            <StyledLatestRecipeCard
                                key={index}
                                id={`latest-recipe-image-${index}`}
                                to={`/recipes/${recipe.slug}`}
                                className={'latest-recipe-image'}
                                onClick={() => {
                                    GAEvent(index, recipe.title)
                                }}
                            >
                                <StyledLatestRecipeImageWrapper>
                                    <StyledLatestRecipeImage
                                        src={
                                            recipe.thumbnail
                                                ? index === 0
                                                    ? `${buildImagePath(recipe.mediumImage.url)}`
                                                    : `${buildImagePath(recipe.thumbnail.url)}`
                                                : ''
                                        }
                                        loading="lazy"
                                        alt={`${recipe.title}.`}
                                    />
                                    <StyledTagsWrapper>
                                        {recipe.tags &&
                                            recipe.tags.map((tag: TagObject, index) => (
                                                <React.Fragment key={index}>
                                                    <TagLabel
                                                        classText="tag-label-short"
                                                        key={`${recipe.id}-${index}-short`}
                                                        text={tag.shortName}
                                                    />
                                                    <TagLabel
                                                        classText="tag-label-long"
                                                        key={`${recipe.id}-${index}-long`}
                                                        text={tag.name}
                                                    />
                                                </React.Fragment>
                                            ))}
                                    </StyledTagsWrapper>
                                </StyledLatestRecipeImageWrapper>
                            </StyledLatestRecipeCard>
                        ))}
                        {this.state.recipes.map((recipe, index) => (
                            <StyledLatestRecipeCard
                                key={index}
                                id={`latest-recipe-text-${index}`}
                                to={`/recipes/${recipe['slug']}`}
                            >
                                <StyledLatestRecipeCardHeadings className="latest-recipe-heading">
                                    {recipe['title']}
                                </StyledLatestRecipeCardHeadings>
                                <StyledLatestRecipeDescription>
                                    {recipe['description']}
                                </StyledLatestRecipeDescription>
                            </StyledLatestRecipeCard>
                        ))}
                    </StyledLatestRecipeList>
                )}
            </React.Fragment>
        )
    }
}
