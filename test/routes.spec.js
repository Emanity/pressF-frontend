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

/* importing app.js file to test */
require('../app/routes.js');

/* Test Suite: route testing app.js 
- does each route get called
- does it then render the appropriate view (with data if required */
describe('app.js route testing', () => {
	/*  GET / testing */
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

	/* GET /job-roles */
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

	/* GET /job-role-details/:JobRoleID */
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

	/* GET /add-job-role */
	describe('GET /add-job-role testing', () => {
		test('GET /add-job-role', () => {
			expect(mockApp.get).toHaveBeenCalledWith('/add-job-role', expect.any(Function));
		});
		test('GET /add-job-role renders add-job-roles.html page', async() => {
			mockNodeFetch.mockImplementationOnce(() => Promise.resolve(
				{ status: 200, json: () => Promise.resolve(
					{ bands: 'Test Data' }
				)}));
			
			mockNodeFetch.mockImplementationOnce(() => Promise.resolve(
				{ status: 200, json: () => Promise.resolve(
					{ capabilities: 'Test Data' }
				)}));

			mockNodeFetch.mockImplementationOnce(() => Promise.resolve(
				{ status: 200, json: () => Promise.resolve(
					{ disciplines: 'Test Data' }
				)}));
			// grabs the seventh call in the app file, i.e. app.get('/add-job-role')
			const behaviour = mockApp.get.mock.calls[7][1];
			const res = { render: jest.fn() };
			// call function used by get handler
			await behaviour(null, res);
			await expect(res.render).toHaveBeenCalledWith('add-job-role', {bands: {bands: 'Test Data'}, capabilities: {capabilities: 'Test Data'}, disciplines : {disciplines: 'Test Data'}});
		});
	});

	/* GET /add-job-band */
	describe('GET /add-job-band testing', () => {
		test('GET /add-job-band', () => {
			expect(mockApp.get).toHaveBeenCalledWith('/add-job-band', expect.any(Function));
		});
		test('GET /add-job-band renders add-job-band.html page', async() => {
			// grabs the fith call in the app file, i.e. app.get('/add-job-band')
			const behaviour = mockApp.get.mock.calls[5][1];
			const res = { render: jest.fn() };
			// call function used by get handler
			await behaviour(null, res);
			await expect(res.render).toHaveBeenCalledWith('add-job-band');
		});
	});

	/* GET /add-job-capability */
	describe('GET /add-job-capability testing', () => {
		test('GET /add-job-capability', () => {
			expect(mockApp.get).toHaveBeenCalledWith('/add-job-capability', expect.any(Function));
		});
		test('GET /add-job-capability renders add-job-capability.html page', async() => {
			// grabs the sixth call in the app file, i.e. app.get('/add-job-capability')
			const behaviour = mockApp.get.mock.calls[6][1];
			const res = { render: jest.fn() };
			// call function used by get handler
			await behaviour(null, res);
			await expect(res.render).toHaveBeenCalledWith('add-job-capability');
		});
	});

	/* POST /add-job-role */
	describe('POST /add-job-role testing', () => {
		// Happy path - good Job Role
	 	test('POST /add-job-role correct job role renders add-job-role complete', async () => {
	 		// grabs the second call in the app file, i.e. app.post('/add-job-role')
	 		const behaviour = mockApp.post.mock.calls[2][2];
	 		const res = { render: jest.fn() };
	 		const req = { body: jest.fn({jobTitle: 'test', jobBand: 'test', jobCapability: 'test', jobDiscipline: 'test', jobCompetencies: 'test'})};
	 		// call function used by get handler
	 		await behaviour(req, res);
	 		await expect(res.render).toHaveBeenCalledWith('add-job-role-complete');
	 	});

		// Unhappy path - good Job Role
		test('POST /add-job-role correct job role renders add-job-role complete', async () => {
			// grabs the second call in the app file, i.e. app.post('/add-job-role')
			const behaviour = mockApp.post.mock.calls[2][2];
			const res = { render: jest.fn() };
			const req = { body: jest.fn({jobTitle: '', jobBand: '', jobCapability: '', jobDiscipline: '', jobCompetencies: ''})};
			// call function used by get handler
			await behaviour(req, res);
			await expect(res.render).toHaveBeenCalledWith('add-job-role');
		});
	});

		describe('POST /add-job-band testing', () => {
			// Happy path - good Job Role
			 test('POST /add-job-band correct job role renders add-job-band-complete', async () => {
				 // grabs the zero call in the app file, i.e. app.post('/add-job-band')
				 const behaviour = mockApp.post.mock.calls[0][2];
				 const res = { render: jest.fn() };
				 const req = { body: jest.fn({jobBand: 'test', jobBandTraining: 'test'})};
				 // call function used by get handler
				
				 const errors = [
					{
					  value: '',
					  msg: 'Job Title: Must be longer than 0 characters and shorter than 200 characters',
					  param: 'jobTitle',
					  location: 'body'
					},
					{
					  value: '',
					  msg: 'Job Specification: Must be longer than 0 characters and shorter than 5000 characters',
					  param: 'jobSpecification',
					  location: 'body'
					},
					{
					  value: '',
					  msg: 'Job Competencies: Must be longer than 0 characters and shorter than 500 characters',
					  param: 'jobCompetencies',
					  location: 'body'
					}
				  ];

				 await behaviour(req, res);
				 await expect(res.render).toHaveBeenCalledWith('add-job-band-complete');
			 });
		});

		describe('POST /add-job-capability testing', () => {
			// Happy path - good Job Role
			 test('POST /add-job-capability correct job role renders add-job-capability-complete', async () => {
				 // grabs the zero call in the app file, i.e. app.post('/add-job-capability')
				 const behaviour = mockApp.post.mock.calls[1][2];
				 const res = { render: jest.fn() };
				 const req = { body: jest.fn({jobCapability: 'test'})};
				 // call function used by get handler
				 await behaviour(req, res);
				 await expect(res.render).toHaveBeenCalledWith('add-job-capability-complete');
			 });
		});
});