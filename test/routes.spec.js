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

const mockRequest = {
	session: {
		email: 'admin@test.com',
		role: 1
	},
	params: jest.fn(1)
};

const mockResponse = {
	status: jest.fn(),
	render: jest.fn(),
	redirect: jest.fn()
};

/* Test Suite: route testing routes.js 
- does each route get called
- does it then render the appropriate view (with data if required */
describe('routes.js route testing', () => {
	describe('GET /index testing', () => {
		test('GET / renders index html page', () => {
			// call get function
			expect(mockApp.get).toHaveBeenCalledWith('/', expect.any(Function), expect.any(Function));
			// grabs the first call in the app file, i.e. app.get('/')
			const behaviour = mockApp.get.mock.calls[0][2];
			// call function used by get handler
			behaviour(mockRequest, mockResponse);
			expect(mockResponse.redirect).toHaveBeenCalledWith('index');
		});
		test('GET /index renders index html page', () => {
			// call get function
			expect(mockApp.get).toHaveBeenCalledWith('/index', expect.any(Function), expect.any(Function));
			// grabs the second call in the app file, i.e. app.get('/index')
			const behaviour = mockApp.get.mock.calls[1][2];
			// call function used by get handler
			behaviour(null, mockResponse);
			expect(mockResponse.render).toHaveBeenCalledWith('index');
		});
	});
	// GET /job-roles 
	describe('GET /job-roles testing', () => {
		test('GET /job-roles', () => {
			expect(mockApp.get).toHaveBeenCalledWith('/job-roles', expect.any(Function), expect.any(Function));
		});
		test('GET /job-roles renders job-roles.html page', async () => {
			// mocking example result from api call
			mockNodeFetch.mockImplementationOnce(() => Promise.resolve({
				status: 200,
				json: () => Promise.resolve({
					result: 'Test Data'
				})
			}));
			// grabs the third call in the app file, i.e. app.get('/job-roles')
			const behaviour = mockApp.get.mock.calls[2][2];
			// call function used by get handler
			await behaviour(null, mockResponse);
			await expect(mockResponse.render).toHaveBeenCalledWith('job-roles', {
				jobRoles: {
					result: 'Test Data'
				}
			});
		});
	});

	describe('GET /job-role-details/:jobRoleID testing', () => {
		test('GET /job-role-details/:jobRoleID', () => {
			expect(mockApp.get).toHaveBeenCalledWith('/job-role-details/:jobRoleID', expect.any(Function), expect.any(Function));
		});
		test('GET /job-role-details/1 renders job-role-details.html page', async () => {
			// mocking example result from api call
			mockNodeFetch.mockImplementationOnce(() => Promise.resolve({
				status: 200,
				json: () => Promise.resolve({
					result: 'Test Data'
				})
			}));
			// grabs the fourth call in the app file, i.e. app.get('/job-role-details/:JobRoleID')
			const behaviour = mockApp.get.mock.calls[3][2];
			// call function used by get handler
			await behaviour(mockRequest, mockResponse);
			await expect(mockResponse.render).toHaveBeenCalledWith('job-role-details', {
				jobRole: {
					result: 'Test Data'
				}
			});
		});
	});

	describe('GET /add-job-role testing', () => {
		test('GET /add-job-role', () => {
			expect(mockApp.get).toHaveBeenCalledWith('/add-job-role', expect.any(Function), expect.any(Function), expect.any(Function));
		});
		test('GET /add-job-role renders add-job-roles.html page', async () => {
			mockNodeFetch.mockImplementationOnce(() => Promise.resolve({
				status: 200,
				json: () => Promise.resolve({
					bands: 'Test Data'
				})
			}));

			mockNodeFetch.mockImplementationOnce(() => Promise.resolve({
				status: 200,
				json: () => Promise.resolve({
					capabilities: 'Test Data'
				})
			}));

			mockNodeFetch.mockImplementationOnce(() => Promise.resolve({
				status: 200,
				json: () => Promise.resolve({
					disciplines: 'Test Data'
				})
			}));
			// grabs the seventh call in the app file, i.e. app.get('/add-job-role')
			const behaviour = mockApp.get.mock.calls[9][3];
			const res = {
				render: jest.fn()
			};
			// call function used by get handler
			await behaviour(mockRequest, res);
			await expect(res.render).toHaveBeenCalledWith('add-job-role', {
				bands: {
					bands: 'Test Data'
				},
				capabilities: {
					capabilities: 'Test Data'
				},
				disciplines: {
					disciplines: 'Test Data'
				}
			});
		});
	});

	describe('GET /add-job-band testing', () => {
		test('GET /add-job-band', () => {
			expect(mockApp.get).toHaveBeenCalledWith('/add-job-band', expect.any(Function), expect.any(Function), expect.any(Function));
		});
		test('GET /add-job-band renders add-job-band.html page', async () => {
			// grabs the fith call in the app file, i.e. app.get('/add-job-band')
			const behaviour = mockApp.get.mock.calls[7][3];
			const res = {
				render: jest.fn()
			};
			// call function used by get handler
			await behaviour(mockRequest, res);
			await expect(res.render).toHaveBeenCalledWith('add-job-band');
		});
	});

	describe('GET /add-job-capability testing', () => {
		test('GET /add-job-capability', () => {
			expect(mockApp.get).toHaveBeenCalledWith('/add-job-capability', expect.any(Function), expect.any(Function), expect.any(Function));
		});
		test('GET /add-job-capability renders add-job-capability.html page', async () => {
			// grabs the sixth call in the app file, i.e. app.get('/add-job-capability')
			const behaviour = mockApp.get.mock.calls[8][3];
			const res = {
				render: jest.fn()
			};
			// call function used by get handler
			await behaviour(mockRequest, res);
			await expect(res.render).toHaveBeenCalledWith('add-job-capability');
		});
	});

	describe('POST /add-job-role testing', () => {
		// Happy path - good Job Role
		test('POST /add-job-role correct job role renders add-job-role complete', async () => {
			// grabs the second call in the app file, i.e. app.post('/add-job-role')
			const behaviour = mockApp.post.mock.calls[3][2];
			const res = {
				render: jest.fn()
			};
			const req = {
				body: jest.fn({
					jobTitle: 'test',
					jobBand: 'test',
					jobCapability: 'test',
					jobDiscipline: 'test',
					jobCompetencies: 'test'
				}),
				session: {
					email: 'admin@test.com',
					role: 1
				},
			};
			// call function used by get handler
			await behaviour(req, res);
			await expect(res.render).toHaveBeenCalledWith('add-job-role-complete');
		});
	});

	describe('POST /add-job-band testing', () => {
		// Happy path - good Job Band
		test('POST /add-job-band correct job band renders add-job-band-complete', async () => {
			// grabs the zero call in the app file, i.e. app.post('/add-job-band')
			const behaviour = mockApp.post.mock.calls[1][2];
			const res = {
				render: jest.fn()
			};
			const req = {
				body: jest.fn({
					jobBand: 'test',
					jobBandTraining: 'test'
				}),
				session: {
					email: 'admin@test.com',
					role: 1
				},
			};
			// call function used by get handles
			await behaviour(req, res);
			await expect(res.render).toHaveBeenCalledWith('add-job-band-complete');
		});
	});

	describe('POST /add-job-capability testing', () => {
		// Happy path - good Job Capability
		test('POST /add-job-capability correct job capability renders add-job-capability-complete', async () => {
			// grabs the zero call in the app file, i.e. app.post('/add-job-capability')
			const behaviour = mockApp.post.mock.calls[2][2];
			const res = {
				render: jest.fn()
			};
			const req = {
				body: jest.fn({
					jobCapability: 'test'
				}),
				session: {
					email: 'admin@test.com',
					role: 1
				},
				params: jest.fn(1)
			};
			// call function used by get handler
			await behaviour(req, res);
			await expect(res.render).toHaveBeenCalledWith('add-job-capability-complete');
		});
	});
});