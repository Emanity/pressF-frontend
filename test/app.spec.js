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

//Job Roles Details Test Job Role Exists
describe('job-role-details', function() {

    var request
    
    beforeEach(function () {

        request = supertest(app)

    })

describe('GET /job-role-details Role Exists', function() {
    
    it('should return OK status', async () => {

    return await request

        .get('/job-role-details/1')

        .then(function(response){

            assert.equal(response.statusCode, 200)
            
        })
        
    })

})

})

//Job Role Details Do Not Exist
describe('job-role-details', function() {

    var request
    
    beforeEach(function () {

        request = supertest(app)

    })

describe('GET /job-role-details Role Does Not Exist', function() {
    
    it('should return OK status', async () => {

    return await request

        .get('/job-role-details/2000')

        .then(function(response){

            assert.equal(response.statusCode, 200)
            
        })
        
    })

})

})

//Job Role Details Do Not Exist (Text passed in instead of number)
describe('job-role-details', function() {

    var request
    
    beforeEach(function () {

        request = supertest(app)

    })

describe('GET /job-role-details Role Does Not Exist (text)', function() {
    
    it('should return OK status', async () => {

    return await request

        .get('/job-role-details/hi')

        .then(function(response){

            assert.equal(response.statusCode, 200)
            
        })
        
    })

})

})