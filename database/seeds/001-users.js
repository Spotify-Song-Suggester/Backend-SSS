exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex('users').truncate().then(function() {
		// Inserts seed entries
		return knex('users').insert([
			{ username: 'Penni', name: 'Penni', password: 'Penni' },
			{ username: 'Blake', name: 'Blake', password: 'Blake' },
			{ username: 'Hamm', name: 'Hamm', password: 'Hamm' },
		]);
	});
};
