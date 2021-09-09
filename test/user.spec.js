const nock = require('nock');
const getLoginResponse = require('../app/user.js').getLoginResponse;

const mockRequest = {
	body: {
		email: 'email@test.com',
		password: 'password'
	}
};

describe('User login testing', () => {
	test('User should be able to login with correct details', () => {
		nock('http://localhost:8080/')
			.post('/api/login')
			.reply(200, 'Login successful');
		return getLoginResponse(mockRequest)
			.then(response => {
				expect(response).toEqual('Login successful');
			});
	});
	test('User should not be able to login with incorrect details', () => {
		nock('http://localhost:8080/')
			.post('/api/login')
			.reply(401, null);
		return getLoginResponse(mockRequest)
			.then(response => {
				expect(response).toEqual(401);
			});
	});
});