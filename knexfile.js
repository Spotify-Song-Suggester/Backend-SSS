module.exports = {
	development : {
		client           : 'sqlite3',
		connection       : {
			filename : './database/spotify.db3',
		},
		useNullAsDefault : true,
		migrations       : {
			directory : './database/migrations',
		},
		seeds            : {
			directory : './database/seeds',
		},
		pool             : {
			afterCreate : (conn, done) => {
				conn.run('PRAGMA foreign_keys = ON', done);
			},
		},
	},

	testing     : {
		client           : 'sqlite3',
		connection       : {
			filename : './database/spotify-test.db3',
		},
		useNullAsDefault : true,
		migrations       : {
			directory : './database/migrations',
		},
		seeds            : {
			directory : './database/seeds',
		},
		pool             : {
			afterCreate : (conn, done) => {
				conn.run('PRAGM foreign_keys = ON', done);
			},
		},
	},
};
