const { describe } = require('node:test');
const assert = require('node:assert');

const ContactsRepository = require('../../src/repositories/ContactsRepository');

describe('Should return all contacts', async () => {
  // Arrange
  // mock contacts variable from repository
  const contacts = [{
    id: '71c2280e-bb7b-40bf-80d6-67b5b436267b',
    name: 'João',
    email: 'joao@mail.com',
    phone: '11987654321',
    category_id: '3c22b804-9102-471d-a1ae-33ded3d8c9d3',
  },
  ];
  global.contacts = contacts;
  // Act
  const repositoryContacts = ContactsRepository.findAll();
  // Assert
  assert.deepStrictEqual(repositoryContacts, contacts);
});

describe('Should return a contact by id', async () => {
  // Arrange
  // mock contacts variable from repository
  const contacts = [
    {
      id: '71c2280e-bb7b-40bf-80d6-67b5b436267b',
      name: 'João',
      email: 'joao@mail.com',
      phone: '11987654321',
      category_id: '3c22b804-9102-471d-a1ae-33ded3d8c9d3',
    },
  ];
  global.contacts = contacts;
  // Act
  const repositoryContacts = ContactsRepository.findById(contacts[0].id);
  // Assert
  assert.deepStrictEqual(repositoryContacts, contacts[0]);
});

describe('Should return a contact by email', async () => {
  // Arrange
  // mock contacts variable from repository
  const contacts = [
    {
      id: '71c2280e-bb7b-40bf-80d6-67b5b436267b',
      name: 'João',
      email: 'joao@mail.com',
      phone: '11987654321',
      category_id: '3c22b804-9102-471d-a1ae-33ded3d8c9d3',
    },
  ];
  global.contacts = contacts;
  // Act
  const repositoryContacts = ContactsRepository.findByEmail(contacts[0].email);
  // Assert
  assert.deepStrictEqual(repositoryContacts, contacts[0]);
});
