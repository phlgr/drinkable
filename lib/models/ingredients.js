const { getCollection } = require('../database');

const collectionName = 'ingredients';

async function getAllIngredients() {
  const ingredientsCollection = await getCollection(collectionName);
  const result = await ingredientsCollection.find().toArray();
  return result;
}

async function setIngredientsDB() {
  const drinksCollection = await getCollection('drinks');
  const newIngredients = (await drinksCollection.find().toArray())
    .map((drink) => drink.ingredients)
    .reduce((a, b) => a.concat(b))
    .filter((x, i, a) => a.indexOf(x) == i);

  const ingredientsCollection = await getCollection(collectionName);

  const existingIngredients = (
    await ingredientsCollection.find().toArray()
  ).map((ingredient) => ingredient.name);

  const ingredients = newIngredients
    .filter((ingredient) => !existingIngredients.includes(ingredient))
    .map((ingredient) => {
      return {
        name: ingredient,
        popularity: 0,
      };
    });
  if (ingredients.length === 0) {
    console.log('No new ingredients');
    return;
  }
  const result = await ingredientsCollection.insertMany(ingredients);
  console.log(`${ingredients.length} ingredients were set!`);
  return result;
}

async function filterIngredients(searchValue) {
  const lowerCaseSearchValue = searchValue.toLowerCase();
  const ingredients = await getAllIngredients();
  const filteredIngredients = ingredients.filter((ingredient) => {
    return ingredient.name.toLowerCase().includes(lowerCaseSearchValue);
  });
  return filteredIngredients;
}

exports.filterIngredients = filterIngredients;
exports.getAllIngredients = getAllIngredients;
exports.setIngredientsDB = setIngredientsDB;
