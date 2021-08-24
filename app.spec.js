const mockApp = {
    use: jest.fn(),
    set: jest.fn(),
    get: jest.fn(),
    listen: jest.fn()
}

jest.mock('express', () => {
    const mockedExpress = () => {
        // return jest.fn(() => {
        //     return mockApp
        // })
        return {
            use: jest.fn(),
            set: jest.fn(),
            get: jest.fn(),
            listen: jest.fn()
        }
    }
    Object.defineProperty(mockedExpress, "static", { value: jest.fn() });
    return mockedExpress;
})



// jest.mock('express', () => {
//     return jest.fn(() => {
//         Object.defineProperty(mockApp, "static", { value: jest.fn() });
//         return mockApp
        
//     })
// })

require('./app')



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

test('should listen on port 7999', () => {
    expect(mockApp.listen).toHaveBeenCalledWith(7999, expect.any(Function))
})
