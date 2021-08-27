const nock = require('nock');
const response = require('./response');
const getJobRoles = require('../JobRoles').getJobRoles;
const getJobRoleDetails = require('../JobRoles').getJobRoleDetails;
const expect = require('chai').expect;

var supertest = require('supertest');
const assert = require('assert');
const app = require('../app');
const fetch = require('node-fetch')


// Index Test
describe('index', function() {
    
    var request
    
    beforeEach(function () {

        request = supertest(app)

    })

    describe('GET /', function() {
        
        it('should return OK status', function(){
        return request
            .get('/')
            .then(function(response){
                assert.equal(response.statusCode, 200)
                
            })

        })

    })

})


describe('Job Roles With Fetch', () => {
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

describe('Job Roles Details with Fetch', () => {
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