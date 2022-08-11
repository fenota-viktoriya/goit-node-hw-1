const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");
const crypto = require("crypto");

async function updateContacts(arr) {
  await fs.writeFile(contactsPath, JSON.stringify(arr, null, 2));
}

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (err) {
    console.error(err);
  }
}

async function getContactById(contactId) {
  try {
    const allContacts = await listContacts();
    const contact = allContacts.find(({ id }) => id === contactId);

    return contact || null;
  } catch (error) {
    console.error(err);
  }
}

async function removeContact(contactId) {
  try {
    const allContacts = await listContacts();
    const contact = allContacts.findIndex(({ id }) => id === contactId);
    if (contact === -1) {
      return null;
    }
    const [result] = allContacts.splice(contact, 1);
    await updateContacts(allContacts);
    return result;
  } catch (error) {
    console.error(err);
  }
}

async function addContact(name, email, phone) {
  try {
    const allContacts = await listContacts();
    const newContact = [
      ...allContacts,
      {
        id: crypto.randomUUID(),
        name,
        email,
        phone,
      },
    ];
    await updateContacts(newContact);
  } catch (error) {
    console.error(err);
  }
}
module.exports = { listContacts, getContactById, removeContact, addContact };
