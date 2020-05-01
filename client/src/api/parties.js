function postParty() {
  return fetch('/api/parties', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'Your Party',
      ingredients: {},
      drinks: {},
    }),
  })
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response;
    })
    .then((response) => response.json());
}

function getParty(partyId) {
  return fetch(`/api/parties/${partyId}`)
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response;
    })
    .then((response) => response.json());
}

function patchParty(partyId, content) {
  return fetch(`/api/parties/${partyId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(content),
  });
}

function getPartyDrinks(partyId, searchValue) {
  return fetch(
    `/api/parties/${partyId}/drinks${searchValue ? `?q=${searchValue}` : ''}`
  )
    .then((response) => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response;
    })
    .then((response) => response.json());
}

function deletePartyIngredient(partyId, ingredient) {
  return fetch(`/api/parties/${partyId}/ingredients`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(ingredient),
  });
}

exports.postParty = postParty;
exports.getParty = getParty;
exports.patchParty = patchParty;
exports.getPartyDrinks = getPartyDrinks;
exports.deletePartyIngredient = deletePartyIngredient;
