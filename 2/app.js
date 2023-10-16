const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const port = 3000;

//menggunakan EJS
app.set("view engine", "ejs");
app.use(expressLayouts);

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
    layout: 'layouts/main-layouts',
    nama: "Jovan Hariono",
    title: "Halaman Home",
    mahasiswa,
  });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "Halaman About", layout: 'layouts/main-layouts' });
});

app.get("/contact", (req, res) => {
  res.render("contact", { title: "Halaman Contact", layout: 'layouts/main-layouts' });
});

app.get(`/produk/:id`, (req, res) => {
  res.send(
    `Produk ID : ${req.params.id} <br/> Category : ${req.query.category}`
  );
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("Tes");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
