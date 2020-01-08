const database = require('../../database/dbConfig');

module.exports = {
	add,
	find,
	findBy,
	findById,
	deleteAccount,
	editAccount,
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

// function editAccount(users_id, userInfo) {
// 	return database('users').where({ users_id }).update(userInfo);
// }

function editAccount(id, user) {
	return database('users').where('id', Number(id)).update(user);
}
