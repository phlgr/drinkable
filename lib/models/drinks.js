async function getDrinkList(ingredientsArray) {
  const ingredients = ingredientsArray.toString();
  console.log(ingredients);
  return ingredients;
}

exports.getDrinkList = getDrinkList;
