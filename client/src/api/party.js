function postParty() {
  return fetch('/api/party', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: {
      name: 'Your Party',
      ingredients: {},
      drinks: {},
    },
  });
}

function getParty(partyId) {
  return fetch(`/api/party/${partyId}`);
}

function patchParty(partyId, content) {
  return fetch(`/api/party/${partyId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: content,
  });
}

exports.postParty = postParty;
exports.getParty = getParty;
exports.patchParty = patchParty;
