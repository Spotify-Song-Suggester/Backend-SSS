const database = require('../../database/dbConfig');

module.exports = {
	add,
	find,
	findBy,
	findById,
	deleteAccount,
};

function find() {
	return database('users').select('id', 'email', 'username');
}

function findBy(filter) {
	return database('users').where(filter);
}

async function add(user) {
	const [ id ] = await database('users').insert(user);

	return findById(id);
}

function findById(id) {
	return database('users').where({ id }).first();
}
function deleteAccount(id) {
	return database('users').where({ id }).del();
}
