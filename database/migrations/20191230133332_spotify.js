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
			songs.string('songid', 128);
			songs.string('artist', 128);
			songs.string('track', 255);
			songs.float('danceability');
			songs.float('energy');
			songs.integer('key');
			songs.float('loudness');
			songs.integer('mode');
			songs.float('speechiness');
			songs.float('acousticness');
			songs.float('instrumentalness');
			songs.float('liveness');
			songs.float('valence');
			songs.float('tempo');
			songs.integer('duration_ms');
			songs.integer('time_signature');
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
