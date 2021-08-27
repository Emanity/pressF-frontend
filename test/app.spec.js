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

// Job Roles Test
    describe('job-roles', function() {

        var request
        
        beforeEach(function () {

            request = supertest(app)

        })


    describe('GET /job-roles', function() {
        
        it('should return OK status', async () => {
        return await request

            .get('/job-roles')
            
            .then(function(response) {

                assert.equal(response.statusCode, 200)
                
            })

        })

    })

})

//Job Roles Details Test
describe('job-role-details', function() {

    var request
    
    beforeEach(function () {

        request = supertest(app)

    })

describe('GET /job-role-details', function() {
    
    it('should return OK status', async () => {

    return await request

        .get('/job-role-details/1')

        .then(function(response){

            assert.equal(response.statusCode, 200)
            
        })
        
    })

})

})
