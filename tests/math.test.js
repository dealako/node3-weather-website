const { calculateTip } = require('../src/utils/math.js');

test('Should calculate total with tip', () => {
    const total = calculateTip(10, 0.3);

    // Traditional way
    // if (total !== 13) {
    //     throw new Error('Total tip should be 13. Got ' + total);
    // }

    expect(total).toBe(13);
});
// test() function is provided by Jest
// test('Hello, world', () => {});

// test('This should fail', () => {
//     throw new Error('Failure');
// });
