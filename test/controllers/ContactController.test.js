const test = require('node:test');
const assert = require('node:assert');

test('should return 200 when getting all contacts', async () => {
  // Arrange
  const expectedStatusCode = 200;
  const expectedBody = [
    {
      name: 'João',
      email: 'joao@mail.com',
      phone: '11987654321',
      category_id: '123',
    },
  ];
  const expectedHeaders = {
    'Content-Type': 'application/json',
  };
  // Act
  const response = await global.testRequest.get('/contacts');
  const responseBody = {
    name: response.body[0].name,
    email: response.body[0].email,
    phone: response.body[0].phone,
    category_id: response.body[0].category_id,
  };
  // Assert
  assert(response.statusCode).toBe(expectedStatusCode);
  assert(responseBody).toEqual(expectedBody);
  assert(response.headers).toEqual(expectedHeaders);
});
