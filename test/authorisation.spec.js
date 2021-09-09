const sinon = require('sinon');
// mocking app
const mockApp = {
	get: jest.fn(),
	listen: jest.fn(),
	set: jest.fn(),
	use: jest.fn(),
	post: jest.fn()
};

/* mocking express and express.static method */
const mockExpress = jest.fn(() => mockApp);
mockExpress.static = jest.fn();
mockExpress.Router = jest.fn(() => mockApp);
jest.mock('express', () => mockExpress);

/* mocking node-fetch */
const mockNodeFetch = jest.fn();
jest.mock('node-fetch', () => mockNodeFetch);

/* importing routes.js file to test */
require('../app/routes.js');

/* importing authorisation.js file to test */
const authorisation = require('../app/authorisation.js');

let mockRequest;

const mockResponse = {
	status: jest.fn(),
	render: jest.fn(),
	redirect: jest.fn()
};
let mockNext = sinon.spy();
describe('isLoggedIn testing', () => {
	test('isLoggedIn should block access if user not logged in', () => {
		mockRequest = {
			session: {}
		};
		
		jest.spyOn(authorisation, 'isLoggedIn');
		authorisation.isLoggedIn(mockRequest,mockResponse,mockNext);
		expect(authorisation.isLoggedIn).toHaveReturnedWith(false);
		jest.restoreAllMocks();
	});
	test('isLoggedIn should allow access if user logged in', async () => {
		mockRequest = {
			session: {
				email: 'email@kainos.com',
				role: 0
			}
		};
		jest.spyOn(authorisation, 'isLoggedIn');
		authorisation.isLoggedIn(mockRequest,mockResponse,mockNext);
		expect(authorisation.isLoggedIn).toHaveReturnedWith(true);
	});
});

describe('isAdmin testing', () => {
	test('isAdmin should block access if user is not an admin', () => {
		mockRequest = {
			session: {
				email: 'email@kainos.com',
				role: 0
			}
		};
		
		jest.spyOn(authorisation, 'isAdmin');
		authorisation.isAdmin(mockRequest,mockResponse,mockNext);
		expect(authorisation.isAdmin).toHaveReturnedWith(false);
		jest.restoreAllMocks();
	});
	test('isAdmin should allow access if user is an admin', async () => {
		mockRequest = {
			session: {
				email: 'admin@kainos.com',
				role: 1
			}
		};
		jest.spyOn(authorisation, 'isAdmin');
		authorisation.isAdmin(mockRequest,mockResponse,mockNext);
		expect(authorisation.isAdmin).toHaveReturnedWith(true);
	});
});