exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex('favorites').truncate().then(function() {
		// Inserts seed entries
		return knex('favorites').insert([
			{ users_id: 1, songs_id: 1 },
			{ users_id: 2, songs_id: 1 },
			{ users_id: 3, songs_id: 2 },
		]);
	});
};
