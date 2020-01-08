const db = require('../../database/dbConfig');

module.exports = {
	getSongs,
	findById,
	associateSongAccount,
	getFavSongs,
	deleteSongsFromFav,
	findByIdFavorites,
};

function getSongs() {
	return db('songs');
}
//select * from songs
//not working yet
// function addFavSongs(favSongs) {
// 	return db('favSongs').insert(favSongs);
// }

// function saveSongs(songs, users_id, songs_id) {
// 	return db('songs').insert(songs).returning('id').then((ids) => {
// 		return ids[0], users_id, songs_id;
// 	});
// }
// insert into favorites (users_id, songs_id)
// values(1,1)

function findById(id) {
	return db('songs').where('id', id).first();
}
async function associateSongAccount(favorite) {
	return db('favorites').insert(favorite, 'id').then(([ id ]) => {
		return findById(favorite.songs_id);
	});
}
//
function getFavSongs(id) {
	return db('favorites').select().where({ users_id: id }).join('songs', 'songs_id', 'songs.id');
}

// function deleteFavSongs(id) {
// 	return db('favorites').delete().where({ id });
// }

//delete from favorites where songs_id = 1
//OR
// delete from favorites where songs_id = 1 and users_id = 1

function deleteSongsFromFav(users_id, songs_id) {
	return db('favorites').where({ users_id, songs_id }).limit(1).delete();
}

function findByIdFavorites(users_id, songs_id) {
	return db('favorites').where({ users_id, songs_id }).first();
}
