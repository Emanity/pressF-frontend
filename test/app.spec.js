var supertest = require('supertest');
const assert = require('assert');
const app = require('../app');
const fetch = require('node-fetch')


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

    describe('job-roles', function() {

        var request
        
        beforeEach(function () {

            request = supertest(app)

        })

    describe('GET /job-roles', function() {
        
        it('should return OK status', function(){
        return request
            .get('/')
            .then(function(response){
                assert.equal(response.statusCode, 200)
                
            })

        })

    })

})
