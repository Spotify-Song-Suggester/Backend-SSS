const db = require('../../database/dbConfig');

module.exports = {
	getSongs,
	addFavSongs,
	saveSongs,
	getFavSongs,
	findById,
	// updateFavSongs,
	deleteFavSongs,
};

function getSongs() {
	return db('songs');
}
//select * from songs
//not working yet
function addFavSongs(favSongs) {
	return db('favSongs').insert(favSongs);
}

// function saveSongs(songs, users_id, songs_id) {
// 	return db('songs').insert(songs).returning('id').then((ids) => {
// 		return ids[0], users_id, songs_id;
// 	});
// }
// insert into favorites (users_id, songs_id)
// values(1,1)

//join

function saveSongs(songs, users_id, songs_id) {
	return db('songs').insert(songs).returning('id').then((ids) => {
		return associateSongAccount(ids[0], users_id, songs_id);
	});
}

function findById(id) {
	return db('songs').where('id', id).first();
}
function associateSongAccount(songs_id, users_id, songs_id) {
	const association = {
		users_id : users_id,
		songs_id : songs_id,
	};
	return db('favorites').insert(association).returning('users_id');
}
//
function getFavSongs(id) {
	return db('favorites').select().where({ users_id: id }).join('songs', 'songs_id', 'songs.id');
}

function deleteFavSongs(id) {
	return db('favorites').delete().where({ id });
}

//delete from favorites where songs_id = 1
//OR
// delete from favorites where songs_id = 1 and users_id = 1
function deleteFavSongs(users_id, songs_id) {
	return db('favorites').select().where({ users_id, favorites: songs_id }).limit(1).first().del();
}
