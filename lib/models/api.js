const api_url = `https://www.thecocktaildb.com/api/json/${process.env.API_VERSION}/${process.env.API_KEY}/`;
const filter = 'filter.php?';
const lookup = 'lookup.php?';
const list = 'list.php?';

exports.api_url = api_url;
exports.filter = filter;
exports.lookup = lookup;
exports.list = list;
