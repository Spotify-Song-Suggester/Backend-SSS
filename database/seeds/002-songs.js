const songData = require('../../database/db_v2.json');

exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex('songs').truncate().then(async function() {
		for (let i = 0; i < songData.length; i++) {
			const updatedSong = songData[i];
			updatedSong.id = i;

			await knex('songs').insert(updatedSong);
			console.log(updatedSong.id, updatedSong.track);
		}
	});
};
