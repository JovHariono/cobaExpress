const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { loadContact, findContact } = require("./utils/contacts")
const app = express();
const port = 3000;

//menggunakan EJS
app.set("view engine", "ejs");

//third-party middleware
app.use(expressLayouts);

//build-in middleware
app.use(express.static("public"));

app.get("/", (req, res) => {
  const mahasiswa = [
    {
      nama: "Jovan",
      email: "jovanhariono@gmail.com",
    },
    {
      nama: "Budi",
      email: "budi@gmail.com",
    },
    {
      nama: "Joko",
      email: "joko@gmail.com",
    },
  ];

  res.render("index", {
    layout: "layouts/main-layouts",
    nama: "Jovan Hariono",
    title: "Halaman Home",
    mahasiswa,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "Halaman About",
    layout: "layouts/main-layouts",
  });
});

app.get("/contact", (req, res) => {
  const contacts = loadContact();
  res.render("contact", {
    title: "Halaman Contact",
    layout: "layouts/main-layouts",
    contacts,
  });
});

app.get("/contact/:nama", (req, res) => {
  const contact = findContact(req.params.nama)

  res.render("detail", {
    title: "Halaman Detail",
    layout: "layouts/main-layouts",
    contact,
  });
});

app.get(`/produk/:id`, (req, res) => {
  res.send(
    `Produk ID : ${req.params.id} <br/> Category : ${req.query.category}`
  );
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("404");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
