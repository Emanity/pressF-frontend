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
jest.mock('express', () => mockExpress);

/* mocking node-fetch */
const mockNodeFetch = jest.fn();
jest.mock('node-fetch', () => mockNodeFetch);

/* importing app.js file to test */
require('../app/app.js');

/* Test Suite: route testing app.js 
- does each route get called
- does it then render the appropriate view (with data if required */
describe('app.js route testing', () => {
	// GET / testing 
	describe('GET /index testing', () => {
		test('GET / renders index html page', () => {
			// call get function
			expect(mockApp.get).toHaveBeenCalledWith('/', expect.any(Function));
			// grabs the first call in the app file, i.e. app.get('/')
			const behaviour = mockApp.get.mock.calls[0][1];
			const res = { render: jest.fn() };
			// call function used by get handler
			behaviour(null, res);
			expect(res.render).toHaveBeenCalledWith('index');
		});
		test('GET /index renders index html page', () => {
			// call get function
			expect(mockApp.get).toHaveBeenCalledWith('/index', expect.any(Function));
			// grabs the second call in the app file, i.e. app.get('/index')
			const behaviour = mockApp.get.mock.calls[1][1];
			const res = { render: jest.fn() };
			// call function used by get handler
			behaviour(null, res);
			expect(res.render).toHaveBeenCalledWith('index');
		});
	});
	// GET /job-roles 
	describe('GET /job-roles testing', () => {
		test('GET /job-roles', () => {
			expect(mockApp.get).toHaveBeenCalledWith('/job-roles', expect.any(Function));
		});
		test('GET /job-roles renders job-roles.html page', async() => {
			// mocking example result from api call
			mockNodeFetch.mockImplementationOnce(() => Promise.resolve(
				{ status: 200, json: () => Promise.resolve(
					{ result: 'Test Data' }
				)}));
			// grabs the third call in the app file, i.e. app.get('/job-roles')
			const behaviour = mockApp.get.mock.calls[2][1];
			const res = { render: jest.fn() };
			// call function used by get handler
			await behaviour(null, res);
			await expect(res.render).toHaveBeenCalledWith('job-roles', {JobRoles: {result: 'Test Data'}});
		});
	});
	// GET /job-role-details/:JobRoleID 
	describe('GET /job-role-details/:jobRoleID testing', () => {
		test('GET /job-role-details/:jobRoleID', () => {
			expect(mockApp.get).toHaveBeenCalledWith('/job-role-details/:jobRoleID', expect.any(Function));
		});
		test('GET /job-role-details/1 renders job-role-details.html page', async() => {
			// mocking example result from api call
			mockNodeFetch.mockImplementationOnce(() => Promise.resolve(
				{ status: 200, json: () => Promise.resolve(
					{ result: 'Test Data' }
				)}));
			// grabs the fourth call in the app file, i.e. app.get('/job-role-details/:JobRoleID')
			const behaviour = mockApp.get.mock.calls[3][1];
			const res = { render: jest.fn() };
			const req = { params: jest.fn(1) };
			// call function used by get handler
			await behaviour(req, res);
			await expect(res.render).toHaveBeenCalledWith('job-role-details', {JobRole: {result: 'Test Data'}});
		});
	});
});