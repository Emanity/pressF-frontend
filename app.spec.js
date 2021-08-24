// const request = require('supertest');
// const app = require('./app')

const mockApp = {
    use: jest.fn(),
    set: jest.fn(),
    get: jest.fn(),
    listen: jest.fn(),
    address: jest.fn()
}

jest.mock('express', () => {
    const mockApp = () => {
        // return jest.fn(() => {
        //     return mockApp
        // })
        return {
            use: jest.fn(),
            set: jest.fn(),
            get: jest.fn(),
            listen: jest.fn(),
            address: jest.fn()
        }
    }
    Object.defineProperty(mockApp, "static", { value: jest.fn() });
    return mockApp;
})

// jest.mock('express', () => {
//     return jest.fn(() => {
//         return mockApp
//     })
// })

require('./app')




// test('status code should be 200 on root', async() => {
//     const response = await request(app).get('/');
//     expect(response.statusCode).toBe(200);
    
//     //expect(mockApp.listen).toHaveBeenCalledWith(7999, expect.any(Function))
// })


test('should register root route to respond with first message', () => {
    // pre-check
    expect(mockApp.get).toHaveBeenCalledWith('/', expect.any(Function))

    // arrange
    const behaviour = mockApp.get.mock.calls[0][1] // grab the second [1] param of the first [0] call
    const mockRes = { render: jest.fn() }

    // act
    behaviour(null, mockRes)

    // assert
    expect(mockRes.render).toHaveBeenCalledWith('index')
    
})