import React from 'react'
import Helmet from 'react-helmet'
import { Recipe, Ingredients, RecipeStep, TagObject } from '../../api/recipes/ResponseShapes'
import { buildImagePath } from '../../utils/utils'

interface Props {
    recipe: Recipe
}

export class RecipeHead extends React.Component<Props> {
    render() {
        const { recipe } = this.props
        return (
            <Helmet>
                <title>{recipe.title}</title>
                <meta name="description" content={`${recipe.description}`} />
                <meta property="og:title" content={`${recipe.title}`} />
                <meta property="og:description" content={`${recipe.description}`} />
                <meta property="og:image" content={`${recipe.thumbnail.url}`} />
                <script type="application/ld+json">{generateRecipeStructuredData(recipe)}</script>
            </Helmet>
        )
    }
}

const generateMethodStructuredDataFromString = (method: string): string => {
    let methodStepsRaw = method.split('\n')
    let methodSteps: string[] = []
    let methodString = ''
    methodStepsRaw.forEach(function(step) {
        if (step.length > 0) {
            methodSteps.push(step)
        }
    })
    methodSteps.forEach(step => {
        methodString += `{
                "@type": "HowToStep",
                "text": "${step}"
            },`
    })
    return methodString.slice(0, -1) // Slice to remove trailing comma
}

const generateIngredientsStructuredData = (ingredients: Ingredients[]): string => {
    let ingredientString = ''
    ingredients.forEach(ingredient => {
        ingredientString += `"${ingredient.quantity} ${ingredient.ingredient.name}",`
    })
    return ingredientString.slice(0, -1) // Slice to remove trailing comma
}

const generateStructuredDataFromSteps = (steps: RecipeStep[]): string[] => {
    let ingredientString = ''
    let methodString = ''
    steps.forEach(step => {
        methodString += `{
                "@type": "HowToStep",
                "text": "${step.description}"
            },`
        step.ingredients.forEach(ingredient => {
            ingredientString += `"${ingredient.quantity} ${ingredient.ingredient.name}",`
        })
    })
    return [ingredientString.slice(0, -1), methodString.slice(0, -1)] // Slice to remove trailing comma
}

const generateKeyWords = (tags: TagObject[]) => {
    let tagString = ''
    tags.forEach(tag => {
        tagString += `${tag.name},`
    })
    return tagString.slice(0, -1)
}

const generateYieldString = (recipeYield: string) => {
    let yieldString = ''
    if (recipeYield !== '') {
        yieldString = `[
            "${recipeYield.split(' ')[0]}",
            "${recipeYield}"
        ]`
    }
    return yieldString
}

const generateRecipeStructuredData = (recipe: Recipe) => {
    let ingredientString = ''
    let methodString = ''
    let tagString = generateKeyWords(recipe.tags)
    let yieldString = generateYieldString(recipe.yield)

    if (recipe.useSteps) {
        ;[ingredientString, methodString] = generateStructuredDataFromSteps(recipe.steps)
    } else {
        methodString = generateMethodStructuredDataFromString(recipe.method)
        ingredientString = generateIngredientsStructuredData(recipe.ingredients)
    }

    return `{
        "@context": "http://schema.org/",
        "@type": "Recipe",
        "name": "${recipe.title}",
        "image": "${buildImagePath(recipe.thumbnail.url)}",
        "author": {
            "@type": "Person",
            "name": "Hayley van Waas"
        },
        "description": "${recipe.title} recipe designed with gut health in mind.",
        "keywords": "${recipe.title}${tagString.length > 0 ? ', ' + tagString : ''}",
        "recipeIngredient": [
            ${ingredientString}
        ],
        "recipeInstructions": [
            ${methodString}
        ]${yieldString.length > 0 ? ', "recipeYield": ' + yieldString : ''}
    }`
}
