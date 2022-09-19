const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

// const contactPath = `${__dirname}/contacts.json`;
const contactPath = path.join(__dirname, "db/contacts.json");

const updateContacts = async (contacts) =>
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  const data = await fs.readFile(contactPath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  // ...твой код
  const data = await listContacts();
  const res = data.find((item) => item.id === contactId);
  return res || null;
};

const removeContact = async (contactId) => {
  // ...твой код
  const data = await listContacts();
  //   const newContacts = data.filter((item) => item.id !== contactId);
  const index = data.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [res] = data.splice(index, 1);
  await updateContacts(data);
  return res;
};

const addContact = async ({ name, email, phone }) => {
  // ...твой код
  const data = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  data.push(newContact);
  // await fs.writeFile(contactPath, JSON.stringify(data));
  await fs.writeFile(contactPath, JSON.stringify(data, null, 2));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
