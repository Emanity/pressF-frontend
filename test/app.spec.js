const nock = require('nock');
const response = require('./response');
const getJobRoles = require('../JobRoles').getJobRoles;
const getJobRoleDetails = require('../JobRoles').getJobRoleDetails;
const expect = require('chai').expect;

var supertest = require('supertest');
const assert = require('assert');
const app = require('../app');

// Index (Home Page) Test
describe('index', function() {
    
    var request
    
    beforeEach(function () {

        request = supertest(app)

    })

    describe('Checks that gets / returns 200 response', function() {
        
        it('should return OK status', function(){
        return request
            .get('/')
            .then(function(response){
                assert.equal(response.statusCode, 200)
                
            })

        })

    })

})

describe('Job Roles With Fetch - All Records', () => {
    beforeEach(() => {
        nock('http://localhost:8080/')
          .get('/api/getjobroles')
          .reply(200, response);
      })

      it('Get a db response', () => {
          console.log(response)
        return getJobRoles()
          .then(response => {
            //expect an object back
            expect(typeof response).to.equal('object');
            //Test result of name, company and location for the response
            expect(response.jobRoleID).to.equal(1)

          })
      })
    
})

describe('Job Roles Details with Fetch - Record Exists', () => {
  beforeEach(() => {
      nock('http://localhost:8080/')
        .get('/api/getjobroledetails/1')
        .reply(200, response);
    })

    it('Get a db response', () => {
        console.log(response)
      return getJobRoleDetails(1)
        .then(response => {
          //expect an object back
          expect(typeof response).to.equal('object');
          //Test result of name, company and location for the response
          expect(response.jobRoleID).to.equal(1)

        })
    })
  
})

describe('Job Roles Details with Fetch - Does Not Exist', () => {
  beforeEach(() => {
      nock('http://localhost:8080/')
        .get('/api/getjobroledetails/1000')
        .reply(404, null);
    })

    it('Get a db response', () => {
        console.log(response)
      return getJobRoleDetails(1000)
        .then(response => {
          //expect an object back
          expect(response).to.equal(null);

        })
    })
  
})

describe('Job Roles Details with Fetch - Does Not Exist (String)', () => {
  beforeEach(() => {
      nock('http://localhost:8080/')
        .get('/api/getjobroledetails/hi')
        .reply(404, null);
    })

    it('Get a db response', () => {
        console.log(response)
      return getJobRoleDetails('hi')
        .then(response => {
          //expect an object back
          expect(response).to.equal(null);
          
        })
    })
  
})