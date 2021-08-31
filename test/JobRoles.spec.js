// mocking app
const mockApp = {
	get: jest.fn(),
	listen: jest.fn(),
	set: jest.fn(),
	use: jest.fn(),
};

/* mocking express and express.static method */
const mockExpress = jest.fn(() => mockApp);
mockExpress.static = jest.fn();
jest.mock('express', () => mockExpress);

/* mocking node-fetch */
const mockNodeFetch = jest.fn();
jest.mock('node-fetch', () => mockNodeFetch);

/* importing JobRoles.js file to test */
require('../app/JobRoles.js');

/* Test Unit: testing JobRoles.js 
- does each method fetch when api can be found
- does it return null if it can't reach api */
describe('JobRoles.js method testing', () => {
    describe('getJobRoles()', () => {
        test('getJobRoles() return null when api is not available', () => {
            // pass in status code 404
            // should return null
        })
        test('getJobRoles() return json when api is available(status 200)', () => {
            // pass in status code 200
            // should return json object
        })
    });
    describe('getJobRoleDetails()', () => {
        test('getJobRoleDetails() return null when api is not available', () => {
            // pass in status code 404
            // should return null
        })
        test('getJobRoleDetails() return json when api is available(status 200)', () => {
            // pass in status code 200
            // should return json object
        })
    });
});