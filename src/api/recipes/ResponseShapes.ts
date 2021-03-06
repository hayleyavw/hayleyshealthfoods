import { Image, extractImage } from '../common/ResponseShapes'

export class TagObject {
    id: number
    slug: string
    name: string
    shortName: string

    constructor(results?: any) {
        this.id = results && results.id ? results.id : 0
        this.slug = results && results.slug ? results.slug : 'Loading...'
        this.name = results && results.name ? results.name : 'Loading...'
        this.shortName = results && results.short_name ? results.short_name : 'Loading...'
    }
}

export class IngredientGraphQLObject {
    id: number
    slug: string
    name: string

    constructor(results?: any) {
        this.id = results && results.id ? results.id : 0
        this.slug = results && results.slug ? results.slug : 'Loading...'
        this.name = results && results.name ? results.name : 'Loading...'
    }
}

export class IngredientUnit {
    id: number
    name: string
    shortName: string

    constructor(results?: any) {
        this.id = results && results.id ? results.id : 0
        this.name = results && results.name ? results.name : 'Loading...'
        this.shortName = results && results.short_name ? results.short_name : 'Loading...'
    }
}

export class Ingredients {
    id: number
    quantity: string
    ingredient: IngredientGraphQLObject
    ingredientUnit: IngredientUnit

    constructor(results?: any) {
        this.id = results && results.id ? results.id : 0
        this.quantity = results && results.quantity ? results.quantity : 'Loading...'
        this.ingredient =
            results && results.ingredient
                ? new IngredientGraphQLObject(results.ingredient)
                : new IngredientGraphQLObject()
        this.ingredientUnit =
            results && results.ingredient_unit
                ? new IngredientUnit(results.ingredient_unit)
                : new IngredientUnit()
    }
}

export class RecipeStep {
    id: number
    stepNumber: number
    description: string
    ingredients: Ingredients[]

    constructor(results?: any) {
        this.id = results && results.id ? results.id : 0
        this.stepNumber = results && results.step_number ? results.step_number : null
        this.description = results && results.description ? results.description : ''
        this.ingredients =
            results && results.recipe_ingredients
                ? results.recipe_ingredients.map((ingredient: any) => {
                      return new Ingredients(ingredient)
                  })
                : [new Ingredients()]
    }
}

export class RecipeTime {
    id: number
    title: string
    duration: string
    category: string

    constructor(results?: any) {
        this.id = results && results.id ? results.id : 0
        this.title = results && results.title ? results.title : ''
        this.duration = results && results.duration ? results.duration : ''
        this.category =
            results && results.category && results.category.name ? results.category.name : ''
    }
}

export class Recipe {
    id: number
    slug: string
    title: string
    yield: string
    prepTime: string
    cookTime: string
    method: string
    description: string
    thumbnail: Image
    mediumImage: Image
    largeImage: Image
    tags: TagObject[]
    ingredients: Ingredients[]
    useSteps: boolean
    steps: RecipeStep[]
    times: RecipeTime[]
    published: boolean

    constructor(results?: any) {
        this.id = results && results.id ? results.id : 0
        this.slug = results && results.slug ? results.slug : 'Loading...'
        this.title = results && results.title ? results.title : 'Loading...'
        this.yield = results && results.yield ? results.yield : ''
        this.prepTime = results && results.prep_time ? results.prep_time : ''
        this.cookTime = results && results.cook_time ? results.cook_time : ''
        this.method = results && results.method ? results.method : 'Loading...'
        this.description = results && results.description ? results.description : 'Loading...'
        this.thumbnail =
            results && results.images ? extractImage('thumbnail', results.images) : new Image()
        this.mediumImage =
            results && results.images ? extractImage('medium', results.images) : new Image()
        this.largeImage =
            results && results.images ? extractImage('large', results.images) : new Image()
        this.tags =
            results && results.tags
                ? results.tags.map((tag: any) => {
                      return new TagObject(tag)
                  })
                : [new TagObject()]
        this.ingredients =
            results && results.ingredients
                ? results.ingredients.map((ingredient: any) => {
                      return new Ingredients(ingredient)
                  })
                : [new Ingredients()]
        this.published = results && results.published ? results.published : false
        this.steps =
            results && results.recipe_steps
                ? results.recipe_steps.map((step: any) => {
                      return new RecipeStep(step)
                  })
                : [new RecipeStep()]
        this.times =
            results && results.recipe_times
                ? results.recipe_times.map((time: any) => {
                      return new RecipeTime(time)
                  })
                : [new RecipeTime()]
        this.useSteps = results && results.use_steps ? results.use_steps : false
    }
}
