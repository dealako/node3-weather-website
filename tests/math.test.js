const { calculateTip, fahrenheitToCelsius, celsiusToFahrenheit, add } = require('../src/utils/math.js');

// test() function is provided by Jest
// test('Hello, world', () => {});

// test('This should fail', () => {
//     throw new Error('Failure');
// });

test('Should calculate total with tip', () => {
    const total = calculateTip(10, 0.3);

    // Traditional way
    // if (total !== 13) {
    //     throw new Error('Total tip should be 13. Got ' + total);
    // }

    expect(total).toBe(13);
});

test('Should calculate total with default tip', () => {
    const total = calculateTip(10);
    expect(total).toBe(12.5);
});

test('Should convert 32F to 0C', () => {
    const celsius = fahrenheitToCelsius(32);
    expect(celsius).toBe(0);
});

test('Should convert 0C to 32F', () => {
    const fahrenheit = celsiusToFahrenheit(0);
    expect(fahrenheit).toBe(32);
});

// Async tests requires us to call the 'done' (could be called anything) parameter
test('Async test demo', (done) => {
    setTimeout(() => {
        expect(1).toBe(1);
        done();
    }, 2000);
});

// Using promises with done
test('Async add 2 and 3', (done) => {
    add(2, 3).then((sum) => {
        expect(sum).toBe(5);
        done();
    });
});

// Promises using Async and await
test('Async add 3 and 5', async () => {
  const sum = await add(3, 5);
  expect(sum).toBe(8);
});
