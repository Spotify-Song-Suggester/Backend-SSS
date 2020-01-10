const request = require('supertest');
const db = require('../../database/dbConfig');
const server = require('../../api/server');
const usersSeed = require('../../database/seeds//001-users');

describe('usersModel', () => {
	beforeEach(async () => {
		await db('users').truncate();
	});

	const user = {
		id       : 1,
		username : 'Penni',
		password : 'Penni',
	};
	describe('register', () => {
		it('user is not empty', () => {
			expect(user).toMatchObject({
				username : expect.any(String),
			});
		});
		it('user is not null', () => {
			expect(user).not.toBeNull();
		});
		it('should add the user into the database', async () => {
			await request(server).post('/api/auth/register').send({
				email    : 'Penni@mail.com',
				username : 'Penni',
				password : 'Penni',
			});
			const users = await db('users');
			expect(users).toHaveLength(1);
		});
	});
	describe('login', () => {
		it('not empty', () => {
			expect(user).toMatchObject({
				username : expect.any(String),
			});
		});
		it('not null', () => {
			expect(user).not.toBeNull();
		});
	});
	describe('login', () => {
		const user = {
			username : 'Penni',
			password : 'Penni',
		};
		it('does the literal word username exist', () => {
			expect(user).toHaveProperty('username');
		});
		it('not null', () => {
			expect(user).not.toBeNull();
		});

		it('does the literal word password exist', () => {
			expect(user).toHaveProperty('password');
		});
	});
	describe('update', () => {
		const user = {
			username : 'Penni',
			password : 'Pen',
		};
		it('does the literal word username exist', () => {
			expect(user).toHaveProperty('username');
		});
		it('not null', () => {
			expect(user).not.toBeNull();
		});
		it('does the literal word password exist', () => {
			expect(user).toHaveProperty('password');
		});
	});
	describe('when updating an existing user', () => {
		beforeEach(async () => {
			await usersSeed.seed(db);
		});
	});
});
