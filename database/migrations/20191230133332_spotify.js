exports.up = function(knex) {
	return knex.schema
		.createTable('users', (users) => {
			users.increments();

			users.string('email', 255).notNullable().unique();
			users.string('username', 255).notNullable().unique();
			users.string('password', 255).notNullable();
		})
		.createTable('songs', (songs) => {
			songs.increments();
			songs.string('artist', 128).notNullable();
			songs.string('track', 255).notNullable();
			songs.string('danceability', 128).notNullable();
			songs.string('energy', 128).notNullable();
			songs.string('key', 128).notNullable();
			songs.string('loudness', 128).notNullable();
			songs.string('mode', 128).notNullable();
			songs.string('speechiness', 128).notNullable();
			songs.string('acousticness', 128).notNullable();
			songs.string('instrumentalness', 128).notNullable();
			songs.string('liveness', 128).notNullable();
			songs.string('valence', 128).notNullable();
			songs.string('tempo', 128).notNullable();
			songs.string('duration_ms', 128).notNullable();
			songs.string('time_signature', 128).notNullable();
		})
		.createTable('favorites', (favs) => {
			favs.primary([ 'users_id', 'songs_id' ]);
			favs
				.integer('users_id', 68)
				.unsigned()
				.notNullable()
				.references('id')
				.inTable('users')
				.onDelete('CASCADE')
				.onUpdate('CASCADE'); // foriegn key connecting to users table

			favs
				.integer('songs_id', 68)
				.unsigned()
				.notNullable()
				.references('id')
				.inTable('songs')
				.onDelete('CASCADE')
				.onUpdate('CASCADE'); //foriegn key connecting to songs table
		});
};

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('favorites').dropTableIfExists('songs').dropTableIfExists('users');
};
