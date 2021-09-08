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

/* importing middleware.js file to test */
const middleware = require('../app/middleware.js');

let mockRequest;

const mockResponse = {
	status: jest.fn(),
	render: jest.fn(),
	redirect: jest.fn()
};
let mockNext = sinon.spy();
describe('loginMiddleware testing', () => {
	test('loginMiddleware should block access if user not logged in', () => {
		mockRequest = {
			session: {}
		};
		
		let loginMiddleware = jest.spyOn(middleware, 'loginMiddleware');
		middleware.loginMiddleware(mockRequest,mockResponse,mockNext);
		expect(middleware.loginMiddleware).toHaveReturnedWith(false);
		jest.restoreAllMocks();
	});
	test('loginMiddleware should allow access if user logged in', async () => {
		mockRequest = {
			session: {
				email: 'email@kainos.com',
				role: 0
			}
		};
		let loginMiddleware = jest.spyOn(middleware, 'loginMiddleware');
		middleware.loginMiddleware(mockRequest,mockResponse,mockNext);
		expect(middleware.loginMiddleware).toHaveReturnedWith(true);
	});
});

describe('roleMiddleware testing', () => {
	test('roleMiddleware should block access if user is not an admin', () => {
		mockRequest = {
			session: {
				email: 'email@kainos.com',
				role: 0
			}
		};
		
		let roleMiddleware = jest.spyOn(middleware, 'roleMiddleware');
		middleware.roleMiddleware(mockRequest,mockResponse,mockNext);
		expect(middleware.roleMiddleware).toHaveReturnedWith(false);
		jest.restoreAllMocks();
	});
	test('roleMiddleware should allow access if user is an admin', async () => {
		mockRequest = {
			session: {
				email: 'admin@kainos.com',
				role: 1
			}
		};
		let roleMiddleware = jest.spyOn(middleware, 'roleMiddleware');
		middleware.roleMiddleware(mockRequest,mockResponse,mockNext);
		expect(middleware.roleMiddleware).toHaveReturnedWith(true);
	});
});