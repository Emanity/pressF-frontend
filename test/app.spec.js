var supertest = require('supertest');
const assert = require('assert');
const app = require('../app');
const fetch = require('node-fetch')
const JobRoles = require('../JobRoles')

jest.mock('axios');
jest.mock('node-fetch', ()=> jest.fn())

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

    // describe('GET /job-roles', function() {
        
    //     it('should get job roles', async() => {

    //         axios.get.mockResolvedValue({
    //             data: [
    //                 {
    //                     jobid:1,
    //                     jobTitle: '(CTO) Chief Technology Officer'
    //                 },
    //                 {
    //                     jobid:2,
    //                     jobTitle: 'Innovation Lead'
    //                 }
    //             ]
    //         })

    //         const title = await getFirstJobTitle()
    //         expect(title).toEqual('(CTO) Chief Technology Officer')
    //     })
    // })




})


const unmockedFetch = global.fetch

beforeAll(() => {
  global.fetch = () =>
    Promise.resolve({
      json: () => Promise.resolve([]),
    })
})

afterAll(() => {
  global.fetch = unmockedFetch
})

// This is actual testing suite
describe('getJobRoles', () => {
  it('works', async () => {
    const json = await JobRoles.getJobRoles()
    expect(Array.isArray(json)).toEqual(true)
    expect(json.length).toEqual(0)
  })
})