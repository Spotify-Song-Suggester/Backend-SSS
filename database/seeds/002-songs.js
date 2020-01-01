exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex('songs').truncate().then(function() {
		// Inserts seed entries
		return knex('songs').insert([
			{ artist: 'Adele', genre: 'Country', title: 'Chasing Pavements', album: '19' },
			{ artist: 'CHIKA', genre: 'Rap', title: 'High Rises', album: 'High Rises' },
			{ artist: 'Chance the Rapper', genre: 'Rap', title: 'Pusha Man', album: 'Acid Rap' },
		]);
	});
};
