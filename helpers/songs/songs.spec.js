const Songs = require('./songs-model');

const db = require('../../database/dbConfig');
const server = require('../../api/server');

describe('songsModel', () => {
	beforeEach(async () => {
		await db('songs').truncate();
	});

	const song = {
		id               : 1,
		songid           : '41RpZW2lxAdnqDd2nMBzLQ',
		artist           : 'Hudson Mohawke',
		track            : 'No One Could Ever',
		danceability     : 0.662,
		energy           : 0.823,
		key              : 4,
		loudness         : -1.711,
		mode             : 0,
		speechiness      : 0.0662,
		acousticness     : 0.0000454,
		instrumentalness : 0.952,
		liveness         : 0.343,
		valence          : 0.621,
		tempo            : 177.745,
		duration_ms      : 138960,
		time_signature   : 4,
	};
	// makes sure it is a string - sanity test with Number
	describe('songs', () => {
		it('songs is not empty', () => {
			expect(song).toMatchObject({
				artist : expect.any(String),
			});
		});
		it('song is not null', () => {
			expect(song).not.toBeNull();
		});
	});
});

describe('songs', () => {
	const song = {
		id               : 1,
		songid           : '41RpZW2lxAdnqDd2nMBzLQ',
		artist           : 'Hudson Mohawke',
		track            : 'No One Could Ever',
		danceability     : 0.662,
		energy           : 0.823,
		key              : 4,
		loudness         : -1.711,
		mode             : 0,
		speechiness      : 0.0662,
		acousticness     : 0.0000454,
		instrumentalness : 0.952,
		liveness         : 0.343,
		valence          : 0.621,
		tempo            : 177.745,
		duration_ms      : 138960,
		time_signature   : 4,
	};
	// checks to see if the user property exists
	it('does the literal word artist exist', () => {
		expect(song).toHaveProperty('artist');
	});
	it('not null', () => {
		expect(song).not.toBeNull();
	});
	// checks to see if property of password exists
	it('does the literal word track exist', () => {
		expect(song).toHaveProperty('track');
	});
});

describe('favoritesModel', () => {
	beforeEach(async () => {
		await db('favorites').truncate();
	});

	const favorites = {
		users_id : 1,
		songs_id : 1,
	};
	// makes sure it is a number - sanity test with string
	describe('favorites', () => {
		it('favorites is not empty', () => {
			expect(favorites).toMatchObject({
				users_id : expect.any(Number),
			});
		});
		it('song is not null', () => {
			expect(favorites).not.toBeNull();
		});
	});
});
// describe('favoritesModel', function() {
// 	beforeEach(async () => {
// 		await db('favorites').truncate();
// 	});
// 	describe('insert()', function() {
// 		it('should add the favortie to the database', async function() {
// 			await Songs.associateSongAccount({
// 				users_id : 1,
// 				songs_id : 12,
// 			});

// 			const favorites = await db('favorites');
// 			expect(favorites).toHaveLength(1);
// 		});
// 	});
// });
