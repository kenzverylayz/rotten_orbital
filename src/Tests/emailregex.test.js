const emailregex = require('./emailregex');

test('email address validation', () => {
  const testCases = [
    // Valid email addresses
    { email: 'brendansoh1@gmail.com', isValid: true },
    { email: 'john.doe@example.com', isValid: true },
    { email: 'info@domain.net', isValid: true },

    // Invalid email addresses
    { email: 'invalid_email', isValid: false },
    { email: 'missing@domain', isValid: false },
    { email: '@domain.com', isValid: false },
    { email: 'user@.com', isValid: false },
    { email: 'user@domain.', isValid: false },
    { email: 'user@domain..com', isValid: false },
  ];

  testCases.forEach(({ email, isValid }) => {
    const result = emailregex(email);
    console.log(`${email} => Expected: ${isValid}, Received: ${result}`);
    expect(result).toEqual(isValid);
  });
});
