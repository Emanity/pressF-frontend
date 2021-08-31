/* eslint-disable jest/valid-expect */
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

const mockNodeFetch = jest.fn();
jest.mock('node-fetch', () => mockNodeFetch);
    
require('../app/app.js');

describe('app.js route testing', () => {
	describe('GET /index testing', () => {
		test('root route serves index html page', () => {
			// call get function here?
			expect(mockApp.get).toHaveBeenCalledWith('/', expect.any(Function));

			const behaviour = mockApp.get.mock.calls[0][1]; // grab the second [1] param of the first [0] call
			const res = { render: jest.fn() };
			// call function used by get handler
			behaviour(null, res);
			expect(res.render).toHaveBeenCalledWith('index');
		});
	});

	describe('GET /job-roles testing', () => {

        test("job-roles route get method set up in express", () => {
            expect(mockApp.get).toHaveBeenCalledWith('/job-roles', expect.any(Function))
        });
		test('/job-roles renders job-roles.html page', async() => {
			mockNodeFetch.mockImplementationOnce(() => Promise.resolve({ status: 200, json: () => Promise.resolve({ data: "Test Data" })}))

			const behaviour = mockApp.get.mock.calls[2][1]; // grab the second [1] param of the first [0] call
			const res = { render: jest.fn() };
			// call function used by get handler
			behaviour(null, res);
			await expect(res.render).toHaveBeenCalledWith('job-roles');
		});

	})
});