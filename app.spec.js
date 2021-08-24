var proxyquire = require('proxyquire')
var supertest = require('supertest');

var express = require('express')
var path = require('path')
var nunjucks = require('nunjucks')
var expect = require('chai').expect;
require('./app')

describe('index', function() {
    var request

    beforeEach(function () {
        var app = express()
    
        app.set('view engine', 'html')
        
        nunjucks.configure('views')

        request = supertest(app)
    })

    describe('GET /', function() {
        it('should respond with 200 and render index', function(done){
        const mockRes = { render: jest.fn() }
        
        request
            .get('/')
            .expect(mockRes.render('index'))
            .expect(200, function () {
                done()
            })
        })
    })

})