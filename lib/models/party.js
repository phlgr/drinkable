const { getCollection } = require('../database');

async function setParty(party) {
  const partyCollection = await getCollection('parties');
  const result = partyCollection.insertOne({ ...party });
  return result.insertedId;
}

exports.setParty = setParty;
