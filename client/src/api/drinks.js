export async function getDrinkDetails(id) {
  return fetch(`/api/drinks/${id}`)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response;
    })
    .then((response) => response.json());
}
