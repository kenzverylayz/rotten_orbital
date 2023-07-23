const passwordregex = require('./passwordregex');

test('password validation', () => {
  const testCases = [
    // Valid passwords
    { password: 'Abc@1234', isValid: true },
    { password: 'Passw0rd!', isValid: true },
    { password: 'Strong$1', isValid: true },

    // Invalid passwords
    { password: 'weakpassword', isValid: false }, // Missing uppercase letter
    { password: 'NOLOWERCASE1!', isValid: false }, // Missing lowercase letter
    { password: 'short1@', isValid: false }, // Too short (less than 8 characters)
    { password: 'waytoolongpasswordhere1@', isValid: false }, // Too long (more than 24 characters)
    { password: 'no_specials1', isValid: false }, // Missing special character
  ];

  testCases.forEach(({ password, isValid }) => {
    const result = passwordregex(password);
    console.log(`${password} => Expected: ${isValid}, Received: ${result}`);
    expect(result).toEqual(isValid);
  });
});
