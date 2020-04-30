const { getCollection } = require('../database');
const { ObjectID } = require('mongodb');

const { getDrinkList } = require('../models/drinks');

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

  const modifiedCount = await partyCollection.updateOne(
    { _id: objectId },
    {
      $set: resource,
    },
    { upsert: true }
  );

  if (!modifiedCount) {
    throw new Error('Party does not exist');
  }
  const setKeys = Object.keys(resource);
  if (setKeys.find((key) => key.startsWith('ingredients'))) {
    const party = await partyCollection.findOne({ _id: objectId });
    const ingredients = Object.keys(party.ingredients);
    const drinks = await getDrinkList(ingredients);

    await partyCollection.updateOne(
      { _id: objectId },
      {
        $set: { drinks },
      }
    );
  }

  return modifiedCount;
}

async function getAllPartyDrinks(partyId) {
  const partyCollection = await getCollection('parties');
  const objectId = new ObjectID.createFromHexString(partyId);
  const party = await partyCollection.findOne({
    _id: objectId,
  });

  const drinks = party.drinks;

  return drinks;
}

async function filterPartyDrinks(partyId, searchValue) {
  const partyCollection = await getCollection('parties');
  const objectId = new ObjectID.createFromHexString(partyId);
  const party = await partyCollection.findOne({
    _id: objectId,
  });
  const drinks = party.drinks;

  const filteredDrinks = Object.entries(drinks)
    .filter(([key]) => key.toLowerCase().includes(searchValue.toLowerCase()))
    .reduce((acc, [key, value]) => {
      acc[key] = value;

      return acc;
    }, {});

  return filteredDrinks;
}

exports.setParty = setParty;
exports.getParty = getParty;
exports.updateParty = updateParty;
exports.getAllPartyDrinks = getAllPartyDrinks;
exports.filterPartyDrinks = filterPartyDrinks;
