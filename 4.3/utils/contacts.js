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

//menimpa gile contacts.json dengan data yang baru
const saveContacts = (contacts) => {
  fs.writeFileSync("data/contacts.json", JSON.stringify(contacts))
}

//menambahkan data contact baru
const addContact = (contact) => {
  const contacts = loadContact();
  contacts.push(contact);

  saveContacts(contacts);
}

//cek nama duplikat
const cekDuplikat = (nama) => {
  const contacts = loadContact();
  return contacts.find((contact) => contact.nama === nama);
}

//hapus contact
const deleteContact = (nama) => {
  const contacts = loadContact();

  const filteredContacts = contacts.filter((contact) => contact.nama !== nama);
  saveContacts(filteredContacts);
}

const updateContact = (contactBaru) => {
  const contacts = loadContact();

  //hialngkan kontak nama yang namanya sama dengan oldNama
  const filteredContacts = contacts.filter((contact) => contact.nama !== contactBaru.oldNama);

  delete contactBaru.oldNama;
  filteredContacts.push(contactBaru);
  saveContacts(filteredContacts);
}


module.exports = { loadContact, findContact, addContact, cekDuplikat, deleteContact, updateContact };
