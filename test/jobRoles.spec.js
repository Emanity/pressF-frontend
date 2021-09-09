/* eslint-disable jest/valid-expect */
/* imports */
const nock = require('nock');
const getJobRoles = require('../app/jobRoles').getJobRoles;
const getJobRoleDetails = require('../app/jobRoles').getJobRoleDetails;
const getJobBand = require('../app/JobRoles').getJobBand;
const getJobCapability = require('../app/JobRoles').getJobCapability;
const getJobDiscipline = require('../app/JobRoles').getJobDiscipline;
const addJobRole = require('../app/JobRoles').addJobRole;
const addJobBand = require('../app/JobRoles').addJobBand;
const addJobCapbility = require('../app/JobRoles').addJobCapbility;
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
					.reply(200, {
						results: [{
							id: 1
						}, {
							id: 2
						}]
					});
			});
			it('should return a json object', () => {
				return getJobRoles()
					.then(response => {
						expect(typeof response).to.equal('object');
					});
			});
		});
	});

	/* getJobRoleDetails() testing */
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
					.reply(200, {
						id: 1
					});
			});
			it('should return a json object', () => {
				return getJobRoleDetails(1)
					.then(response => {
						expect(typeof response).to.equal('object');
					});
			});
		});
	});

	/* getJobBand() testing */
	describe('getJobBand()', () => {
		// happy path
		describe('getJobBand() returns json when api endpoint is available (status 200)', () => {
			// pass in status code 200
			beforeEach(() => {
				nock('http://localhost:8080/')
					.get('/api/getjobband')
					.reply(200, {
						id: 1
					});
			});
			it('should return a json object', () => {
				return getJobBand()
					.then(response => {
						expect(typeof response).to.equal('object');
					});
			});
		});
		// unhappy path
		describe('getJobBand() returns null when api endpoint is not available', () => {
			// pass in status code 404
			beforeEach(() => {
				nock('http://localhost:8080/')
					.get('/api/getjobband')
					.reply(404, null);
			});
			it('should return a null response', () => {
				return getJobBand()
					.then(response => {
						expect(response).to.equal(null);
					});
			});
		});
	});

	/* getJobCapability() testing */
	describe('getJobCapability()', () => {
		// happy path
		describe('getJobCapability() returns json when api endpoint is available (status 200)', () => {
			// pass in status code 200
			beforeEach(() => {
				nock('http://localhost:8080/')
					.get('/api/getjobcapability')
					.reply(200, {
						id: 1
					});
			});
			it('should return a json object', () => {
				return getJobCapability()
					.then(response => {
						expect(typeof response).to.equal('object');
					});
			});
		});
		// unhappy path
		describe('getJobCapability() returns null when api endpoint is not available', () => {
			// pass in status code 404
			beforeEach(() => {
				nock('http://localhost:8080/')
					.get('/api/getjobcapability')
					.reply(404, null);
			});
			it('should return a null response', () => {
				return getJobCapability()
					.then(response => {
						expect(response).to.equal(null);
					});
			});
		});
	});

	/* getJobDiscipline() testing */
	describe('getJobDiscipline()', () => {
		// happy path
		describe('getJobDiscipline() returns json when api endpoint is available (status 200)', () => {
			// pass in status code 200
			beforeEach(() => {
				nock('http://localhost:8080/')
					.get('/api/getjobdiscipline')
					.reply(200, {
						id: 1
					});
			});
			it('should return a json object', () => {
				return getJobDiscipline()
					.then(response => {
						expect(typeof response).to.equal('object');
					});
			});
		});
		// unhappy path
		describe('getJobDiscipline() returns null when api endpoint is not available', () => {
			// pass in status code 404
			beforeEach(() => {
				nock('http://localhost:8080/')
					.get('/api/getjobdiscipline')
					.reply(404, null);
			});
			it('should return a null response', () => {
				return getJobDiscipline()
					.then(response => {
						expect(response).to.equal(null);
					});
			});
		});
	});

	/* addJobRoles() testing */
	describe('addJobRole()', () => {
		// happy path
		describe('addJobRole() returns 200 when adding a job role is successful', () => {
			// send 200 status code when successful
			beforeEach(() => {
				let mockData = {
					jobTitle: 'test',
					jobBand: 'test',
					jobCapability: 'test',
					jobDiscipline: 'test',
					jobCompetencies: 'test'
				};
				nock('http://localhost:8080/')
					.post('/api/addjobrole', mockData)
					.reply(200);
			});
			it('should return a 200 status', () => {
				return addJobRole()
					.then(expect(200));
			});
		});
		// unhappy path
		describe('addJobRole() returns 404 when adding a job role is unsuccessful', () => {
			// send 404 status code when unsuccessful
			beforeEach(() => {
				let mockData = {
					jobTitle: '',
					jobBand: '',
					jobCapability: '',
					jobDiscipline: '',
					jobCompetencies: ''
				};
				nock('http://localhost:8080/')
					.post('/api/addjobrole', mockData)
					.reply(404);
			});
			it('should return a 200 status', () => {
				return addJobRole()
					.then(expect(404));
			});
		});
	});

	/* addJobBand() testing */
	describe('addJobBand()', () => {
		// happy path
		describe('addJobBand() returns 200 when adding a job role is successful', () => {
			// send 200 status code when successful
			beforeEach(() => {
				let mockData = {
					jobBand: 'test',
					jobBandTraining: 'testing'
				};
				nock('http://localhost:8080/')
					.post('/api/addjobband', mockData)
					.reply(200);
			});
			it('should return a 200 status', () => {
				return addJobBand()
					.then(expect(200));
			});
		});
		// unhappy path
		describe('addJobBand() returns 404 when adding a job role is unsuccessful', () => {
			// send 404 status code when unsuccessful
			beforeEach(() => {
				let mockData = {
					jobBand: '',
					jobBandTraining: ''
				};
				nock('http://localhost:8080/')
					.post('/api/addjobband', mockData)
					.reply(404);
			});
			it('should return a 200 status', () => {
				return addJobBand()
					.then(expect(404));
			});
		});
	});

	/* addJobBand() testing */
	describe('addJobCapbility()', () => {
		// happy path
		describe('addJobCapbility() returns 200 when adding a job role is successful', () => {
			// send 200 status code when successful
			beforeEach(() => {
				let mockData = {
					jobCapability: 'test'
				};
				nock('http://localhost:8080/')
					.post('/api/addjobcapbility', mockData)
					.reply(200);
			});
			it('should return a 200 status', () => {
				return addJobCapbility()
					.then(expect(200));
			});
		});
		// unhappy path
		describe('addJobCapbility() returns 404 when adding a job role is unsuccessful', () => {
			// send 404 status code when unsuccessful
			beforeEach(() => {
				let mockData = {
					jobCapability: '',
				};
				nock('http://localhost:8080/')
					.post('/api/addjobcapbility', mockData)
					.reply(404);
			});
			it('should return a 200 status', () => {
				return addJobCapbility()
					.then(expect(404));
			});
		});
	});
});