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

/* importing server.js file to test */
require('../app/server.js');

/* Test Suite: server.js port setup testing
- does it setup and listen on expected port: 7999 */
describe('server.js set up testing', () => {
	test('Start successfully and listen on port 7999', () => {
		expect(mockApp.listen).toHaveBeenCalledWith(7999, expect.any(Function));
	});
}); 