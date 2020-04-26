const { getCollection } = require('../database');
const { ObjectID } = require('mongodb');

async function setParty(party) {
  const partyCollection = await getCollection('parties');
  const result = await partyCollection.insertOne({ ...party });
  return result.insertedId;
}

async function getParty(partyId) {
  const partyCollection = await getCollection('parties');
  const objectId = new ObjectID.createFromHexString(partyId);
  const party = await partyCollection.findOne({ _id: objectId });
  if (!party) {
    throw new Error('Party does not exist');
  }
  return party;
}

async function updateParty(partyId, resource) {
  const partyCollection = await getCollection('parties');
  const objectId = new ObjectID.createFromHexString(partyId);
  const party = await partyCollection.update(
    { _id: objectId },
    {
      $set: resource,
    },
    { upsert: true }
  );
  if (!party) {
    throw new Error('Party does not exist');
  }
  return party;
}

exports.setParty = setParty;
exports.getParty = getParty;
exports.updateParty = updateParty;
