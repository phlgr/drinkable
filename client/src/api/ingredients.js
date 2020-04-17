export function getIngredients() {
  return fetch(`/api/ingredients`, {
    method: 'GET',
  })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response;
    })
    .then((response) => response.json());
}
