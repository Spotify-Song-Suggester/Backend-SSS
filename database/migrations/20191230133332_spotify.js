exports.up = function(knex) {
	return knex.schema
		.createTable('users', (users) => {
			users.increments();

			users.string('username', 255).notNullable().unique();
			users.string('password', 255).notNullable();
			users.string('name', 255).notNullable();
		})
		.createTable('songs', (songs) => {
			songs.increments();
			songs.string('artist', 128).notNullable();
			songs.string('artist', 128).notNullable();
			songs.string('genre', 128).notNullable();
			songs.string('title', 255).notNullable();
			songs.string('album', 255).notNullable();
		})
		.createTable('favorites', (favs) => {
			favs.increments();

			favs
				.integer('users_id', 68)
				.unsigned()
				.notNullable()
				.references('id')
				.inTable('users')
				.onDelete('CASCADE')
				.onUpdate('CASCADE'); // foriegn key connecting to users table

			favs
				.integer('song_id', 68)
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
