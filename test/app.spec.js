var supertest = require('supertest');
const assert = require('assert');
const app = require('../app');

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