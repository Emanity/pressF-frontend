/* eslint-disable jest/valid-expect */
/* imports */
const nock = require('nock');
const getJobRoles = require('../app/jobRoles').getJobRoles;
const getJobRoleDetails = require('../app/jobRoles').getJobRoleDetails;
const expect = require('chai').expect;

/* Test Suite: testing jobRoles.js 
- does each method fetch when api can be found
- does it return null if it can't reach api */
describe('jobRoles.js method testing', () => {
	// getJobRoles() testing 
	describe('getJobRoles()', () => {
		// unhappy path
		describe('getJobRoles() returns null when api endpoint is not available', () => {
			// pass in status code 404
			beforeEach(() => {
				nock('http://localhost:8080/')
					.get('/api/getjobroles')
					.reply(404, null);
			});
			it('should return a null response', () => {
				return getJobRoles()
					.then(response => {
						expect(response).to.equal(null);
					});
			});
		});
		// happy path
		describe('getJobRoles() returns json when api endpoint is available (status 200)', () => {
			// pass in status code 200
			beforeEach(() => {
				nock('http://localhost:8080/')
					.get('/api/getjobroles')
					.reply(200, { results: [{id:1},{id:2}] });
			});
			it('should return a json object', () => {
				return getJobRoles()
					.then(response => {
						expect(typeof response).to.equal('object');
					});
			});
		});
	});
	// getJobRoleDetails() testing
	describe('getJobRoleDetails()', () => {
		// unhappy path
		describe('getJobRoleDetails() returns null when api endpoint is not available', () => {
			// pass in status code 404
			beforeEach(() => {
				nock('http://localhost:8080/')
					.get('/api/getjobroledetails/1000')
					.reply(404, null);
			});
			it('should return a null response', () => {
				return getJobRoleDetails(1000)
					.then(response => {
						expect(response).to.equal(null);
					});
			});
		});
		// happy path
		describe('getJobRoleDetails() returns json when api endpoint is available (status 200)', () => {
			// pass in status code 200
			beforeEach(() => {
				nock('http://localhost:8080/')
					.get('/api/getjobroledetails/1')
					.reply(200, {id:1});
			});
			it('should return a json object', () => {
				return getJobRoleDetails(1)
					.then(response => {
						expect(typeof response).to.equal('object');
					});
			});
		});
	});
});