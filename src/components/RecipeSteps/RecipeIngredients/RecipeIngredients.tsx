import React from 'react'

import { IngredientsGraphQLObject } from '../../../api/DefaultObjects'
import { StyledRecipeIngredients } from './RecipeIngredients.styled'
import { StyledHeadingFour } from '../../common/Headings.styled'

interface RecipeIngredientsProps {
    ingredients: IngredientsGraphQLObject[]
}

export class RecipeIngredients extends React.Component<RecipeIngredientsProps> {
    render() {
        const { ingredients } = this.props
        return (
            <StyledRecipeIngredients>
                <StyledHeadingFour>Ingredients</StyledHeadingFour>
                {ingredients.map(ingredient => (
                    <p key={ingredient.ingredient.id}>
                        {ingredient.ingredient.name} ({ingredient.quantity}{' '}
                        {ingredient.ingredient_unit ? ingredient.ingredient_unit.short_name : ''})
                    </p>
                ))}
            </StyledRecipeIngredients>
        )
    }
}