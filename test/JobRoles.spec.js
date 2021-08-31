/* eslint-disable jest/valid-expect */
const nock = require('nock');
const getJobRoles = require('../app/JobRoles').getJobRoles;
const getJobRoleDetails = require('../app/JobRoles').getJobRoleDetails;
const expect = require('chai').expect;

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

/* Test Unit: testing JobRoles.js 
- does each method fetch when api can be found
- does it return null if it can't reach api */
describe('JobRoles.js method testing', () => {
	describe('getJobRoles()', () => {
		describe('getJobRoles() return null when api is not available', () => {
			// pass in status code 404
			beforeEach(() => {
				nock('http://localhost:8080/')
					.get('/api/getjobroles')
					.reply(404, null);
			});
			it('Get a response', () => {
				return getJobRoles()
					.then(response => {
						// should return null
						expect(response).to.equal(null);
					});
			});
		});
		describe('getJobRoles() return json when api is available(status 200)', () => {
			// pass in status code 200
			beforeEach(() => {
				nock('http://localhost:8080/')
					.get('/api/getjobroles')
					.reply(200, { results: [{id:1},{id:2}] });
			});
			it('Get a response', () => {
				return getJobRoles()
					.then(response => {
						// should return json object
						expect(typeof response).to.equal('object');
					});
			});
		});
	});

	describe('getJobRoleDetails()', () => {
		describe('getJobRoleDetails() return null when api is not available', () => {
			// pass in status code 404
			beforeEach(() => {
				nock('http://localhost:8080/')
					.get('/api/getjobroledetails/1000')
					.reply(404, null);
			});
			it('Get a response', () => {
				return getJobRoleDetails(1000)
					.then(response => {
						// should return null
						expect(response).to.equal(null);
					});
			});
		});

		describe('getJobRoleDetails() return json when api is available(status 200)', () => {
			// pass in status code 404
			beforeEach(() => {
				nock('http://localhost:8080/')
					.get('/api/getjobroledetails/1')
					.reply(200, {id:1});
			});
			it('Get a response', () => {
				return getJobRoleDetails(1)
					.then(response => {
						// should return json object
						expect(typeof response).to.equal('object');
					});
			});
		});
	});
});