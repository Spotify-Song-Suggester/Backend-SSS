exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex('users').truncate().then(function() {
		// Inserts seed entries
		return knex('users').insert([
			{ email: 'Penni@mail.com', username: 'Penni', password: 'Penni' },
			{ email: 'Blake@mail.com', username: 'Blake', password: 'Blake' },
			{ email: 'Hamm@mail.com', username: 'Hamm', password: 'Hamm' },
		]);
	});
};
