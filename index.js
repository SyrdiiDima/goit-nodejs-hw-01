// const argv = require("yargs").argv;
const contacts = require("./contacts.js");
const { Command } = require("commander");
const program = new Command();

// TODO: рефакторить
const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.table(allContacts);
      break;
    case "get":
      const oneContact = await contacts.getContactById(id);
      console.log(oneContact);
      break;
    case "add":
      // ... name email phone
      const addContact = await contacts.addContact({ name, email, phone });
      console.log(addContact);
      break;

    case "remove":
      const removeContact = await contacts.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();
invokeAction(argv);

// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "2" });
// invokeAction({
//   action: "add",
//   name: "Alex",
//   email: "alex@mail.com",
//   phone: "0638207455",
// });

// invokeAction({
//   action: "remove",
//   id: "7PM4dKEs-I7NdpYIbZHQM",
// });
// invokeAction(argv);
