export function getIngredients(searchValue) {
  return fetch(
    `/api/ingredients${searchValue ? `/filter?q=${searchValue}` : ''}`,
    {
      method: 'GET',
    }
  )
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response;
    })
    .then((response) => response.json());
}
