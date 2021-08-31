// mocking and setup

const mockApp = {
	get: jest.fn(),
	listen: jest.fn(),
	set: jest.fn(),
	use: jest.fn(),
};
const mockExpress = jest.fn(() => mockApp);
mockExpress.static = jest.fn();

jest.mock('express', () => mockExpress);

require('../app/server.js');

describe('server.js set up testing', () => {
	test('Start successfully and listen on port 7999', () => {
		expect(mockApp.listen).toHaveBeenCalledWith(7999, expect.any(Function));
	});
}); 