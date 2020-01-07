exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex('songs').truncate().then(function() {
		// Inserts seed entries
		return knex('songs').insert([
			{
				artist           : 'Adele',
				track            : 'Chasing Pavements',
				valence          : '0.87',
				danceability     : '0.78',
				acousticness     : '0.87',
				speechiness      : '0.87',
				tempo            : '0.87',
				energy           : '0.87',
				duration_ms      : '0.87',
				loudness         : '0.87',
				instrumentalness : '0.87',
				liveness         : '0.87',
				key              : '9',
				mode             : '1',
				time_signature   : '4',
			},
			{
				artist           : 'CHIKA',
				track            : 'High Rises',
				valence          : '0.87',
				danceability     : '0.78',
				acousticness     : '0.87',
				speechiness      : '0.87',
				tempo            : '0.87',
				energy           : '0.87',
				duration_ms      : '0.87',
				loudness         : '0.87',
				instrumentalness : '0.87',
				liveness         : '0.87',
				key              : '9',
				mode             : '1',
				time_signature   : '4',
			},
			{
				artist           : 'Chance the Rapper',
				track            : 'Pusha Man',
				valence          : '0.87',
				danceability     : '0.78',
				acousticness     : '0.87',
				speechiness      : '0.87',
				tempo            : '0.87',
				energy           : '0.87',
				duration_ms      : '0.87',
				loudness         : '0.87',
				instrumentalness : '0.87',
				liveness         : '0.87',
				key              : '9',
				mode             : '1',
				time_signature   : '4',
			},
		]);
	});
};
