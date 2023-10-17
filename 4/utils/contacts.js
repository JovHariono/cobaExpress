const { rejects } = require("assert");
const fs = require("fs");
const { resolve } = require("path");


//membuat folder data
if (!fs.existsSync("./data")) {
  fs.mkdirSync("./data");
}

//membuat file contacs.json jiak blm ada
if (!fs.existsSync("./data/contacts.json")) {
  fs.writeFileSync("./data/contacts.json", "[]", "utf-8");
}

//ambil semua kontak
const loadContact = () => {
  const file = fs.readFileSync("./data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

//cari kontak berdasarkan nama
const findContact = (nama) => {
  const contacts = loadContact()

  const contact = contacts.find(contact => contact.nama === nama)
  return contact
}


module.exports = { loadContact, findContact };
