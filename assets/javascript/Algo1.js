function filterMainSearch (recipe, input) {
    if (recipe.name.toLowerCase().includes(input) || recipe.description.toLowerCase().includes(input)) {
        return true
    }
    for (let index = 0; index < recipe.ingredients.length; index++) {
        const element = recipe.ingredients[index]
        if (element.ingredient.toLowerCase().includes(input)) {
            return true
        }
    }
    return false
}

mainSearchbar.addEventListener('input', e => {
    const input = e.target.value.toLowerCase()
    if (input.length >= 3) {
        const newRecipesList = recipes.filter(recipe => filterMainSearch(recipe, input))
        displayRecipesGrid(newRecipesList)
        let ingArraySearch = []
        let appArraySearch = []
        let ustArraySearch = []
        if (blueSearchbar.value.length >= 3) {
            ingArraySearch = ingArraySearch.filter(ing => ing.toLowerCase().includes(blueSearchbar.value.toLowerCase()))
        }
        if (greenSearchbar.value.length >= 3) {
            appArraySearch = appArraySearch.filter(app => app.toLowerCase().includes(greenSearchbar.value.toLowerCase()))
        }
        if (redSearchbar.value.length >= 3) {
            ustArraySearch = ustArraySearch.filter(ust => ust.toLowerCase().includes(redSearchbar.value.toLowerCase()))
        }
        refreshSecondaryMenus(ingArraySearch, appArraySearch, ustArraySearch, newRecipesList)
    } else if (input.length < 3 && tagContainer.childElementCount === 0) {
        displayRecipesGrid(recipes)
        refreshSecondaryMenus(ingArray, appArray, ustArray, recipes)
    } else if (input.length < 3 && tagContainer.childElementCount > 0) {
        const mainList = recipes.filter(recipe => filterMainSearch(recipe, input))
        filterByTag(mainList)
    }
})