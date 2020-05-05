const fetch = require('node-fetch');
const { api_url, filter } = require('./api');
const { getCollection } = require('../database');
const { getDrinkDetails } = require('../models/drinks');
const { setIngredientsDB } = require('../models/ingredients');

const excludedIngredients = [
  'Anise',
  'Berries',
  'Blackberries',
  'Allspice',
  'Asafoetida',
  'Basil',
  'Almond Extract',
  'Apricot',
  'Bitters',
  'Almond',
  'Angelica Root',
  'Anis',
  'Beef Stock',
  'Angostura Bitters',
  'Banana',
  'Black Pepper',
  'Almond Flavoring',
  'Brown Sugar',
  'Chocolate Ice-cream',
  'Ice-Cream',
  'Lime Peel',
  'Orange',
  'Cherries',
  'Coriander',
  'Cranberries',
  'Fruit',
  'Heavy cream',
  'Kiwi',
  'lemon',
  'Candy',
  'Granulated Sugar',
  'Grapes',
  'lemon-lime',
  'Cayenne Pepper',
  'Cucumber',
  'Demerara Sugar',
  'Carbonated Water',
  'Glycerine',
  'Green Olives',
  'Chocolate',
  'Cornstarch',
  'Egg',
  'Eggnog',
  'Fresh Basil',
  'Nutmeg',
  'Peach',
  'Blueberries',
  'Celery Salt',
  'Egg White',
  'Food Coloring',
  'Licorice Root',
  'Light Cream',
  'Olive Oil',
  'Onion',
  'Club Soda',
  'Ground Ginger',
  'Butter',
  'Cocoa Powder',
  'Mandarin',
  'Cloves',
  'Cream',
  'Cumin Powder',
  'Hot Sauce',
  'Cherry',
  'Cinnamon',
  'Egg Yolk',
  'Dark Soy Sauce',
  'Lime',
  'Marshmallows',
  'Pepper',
  'Peychaud bitters',
  'Ice',
  'Kummel',
  'Lemon Peel',
  'Mint',
  'Carbonated Soft Drink',
  'Dried Oregano',
  'Olive',
  'Cardamom',
  'Orange Bitters',
  'Powdered Sugar',
  'Raisins',
  'Red Chili Flakes',
  'Salt',
  'Tabasco Sauce',
  'Tomato',
  'Sugar',
  'Habanero Peppers',
  'Lavender',
  'Plain Chocolate',
  'Rock Salt',
  'Soda Water',
  'Water',
  'Tea',
  'Pineapple',
  'Vanilla Ice-Cream',
  'Chocolate Sauce',
  'Fresh Mint',
  'Rosemary',
  'Vanilla',
  'Red Chile Flakes',
  'Red Hot Chili Flakes',
  'Vinegar',
  'Strawberries',
  'Salted Chocolate',
];

const collectionName = 'drinks';

async function getAllDrinksFromAPI() {
  const responseNonAlcoholicDrinks = await fetch(
    `${api_url}${filter}a=Non_Alcoholic`
  );
  const nonAlcoholicDrinks = await responseNonAlcoholicDrinks.json();
  const responseAlcoholicDrinks = await fetch(`${api_url}${filter}a=Alcoholic`);
  const alcoholicDrinks = await responseAlcoholicDrinks.json();

  const allDrinksArray = [
    ...nonAlcoholicDrinks.drinks,
    ...alcoholicDrinks.drinks,
  ];
  const formattedAllDrinks = allDrinksArray.map((drink) => {
    return {
      name: drink.strDrink,
      thumbnail: drink.strDrinkThumb,
      id: drink.idDrink,
    };
  });
  return formattedAllDrinks;
}

async function getAllDrinks() {
  const drinksCollection = await getCollection(collectionName);
  const existingDrinks = (await drinksCollection.find().toArray()).map(
    (drink) => drink.name
  );
  return existingDrinks;
}

async function getDrinkIngredients(id) {
  const drinkIngredients = (await getDrinkDetails(id)).ingredients
    .filter((ingredient) => ingredient.name !== null)
    .filter((ingredient) => ingredient.name !== '')
    .filter((ingredient) => !excludedIngredients.includes(ingredient.name))
    .map((ingredient) => {
      return ingredient.name.toLowerCase();
    });

  console.log(drinkIngredients);
  return drinkIngredients;
}

async function setDrinksDB() {
  const drinksCollection = await getCollection(collectionName);
  const allDrinks = await getAllDrinksFromAPI();
  const existingDrinks = await getAllDrinks();

  const newDrinks = allDrinks
    .filter((drink) => !existingDrinks.includes(drink.name))
    .map((drink) => {
      return {
        name: drink.name,
        thumbnail: drink.thumbnail,
        id: drink.id,
      };
    });
  if (newDrinks.length === 0) {
    console.log('No new Drinks');
    return;
  }

  const newDrinksWithIngredients = await Promise.all(
    newDrinks.map(async (drink) => {
      const ingredients = await getDrinkIngredients(drink.id);
      return {
        name: drink.name,
        thumbnail: drink.thumbnail,
        id: drink.id,
        ingredients: ingredients,
      };
    })
  );

  const result = await drinksCollection.insertMany(newDrinksWithIngredients);
  console.log(`${newDrinksWithIngredients.length} drinks were set!`);
  await setIngredientsDB();
  return result;
}

exports.setDrinksDB = setDrinksDB;
