const ContactsRepository = require('../repositories/ContactsRepository');

class ContactController {
  async index(req, res) {
    const contacts = await ContactsRepository.findAll();
    res.status(200).json(contacts);
  }

  async show(req, res) {
    try {
      const contact = await ContactsRepository.findById(req.params.id);
      if (!contact) throw new Error('Contact not found');
      res.status(200).json(contact);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }

  async store(req, res) {
    try {
      const contact = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        category_id: req.body.category_id,
      };
      if (!contact.name) throw new Error('Name is required');
      if (!contact.email) throw new Error('Email is required');
      if (!contact.phone) throw new Error('Phone is required');
      const contactExists = await ContactsRepository.findByEmail(contact.email);
      if (contactExists) throw new Error('This e-mail is already in use');
      const savedContact = await ContactsRepository.create(contact);
      res.status(201).json(savedContact);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const contact = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        category_id: req.body.category_id,
      };
      if (!id) throw new Error('ID is required');
      if (!contact.name) throw new Error('Name is required');
      if (!contact.email) throw new Error('Email is required');
      if (!contact.phone) throw new Error('Phone is required');
      if (!contact.category_id) throw new Error('Category is required');
      const contactExists = await ContactsRepository.findById(req.params.id);
      if (!contactExists) throw new Error('Contact not found');
      if (contactExists.email !== contact.email) {
        const contactExistsWithEmail = await ContactsRepository.findByEmail(contact.email);
        if (contactExistsWithEmail) throw new Error('This e-mail is already in use');
      }
      const updatedContact = await ContactsRepository.update(req.params.id, contact);
      res.status(200).json(updatedContact);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) throw new Error('ID is required');
      await ContactsRepository.delete(req.params.id);
      res.sendStatus(204);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = new ContactController();
