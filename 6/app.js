const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const Contact = require("./model/contact");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
require("./utils/db");

const app = express();
const port = 3000;

//menggunakan EJS
app.set("view engine", "ejs");

//konfirgurasi flash
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

//third-party middleware
app.use(expressLayouts);

//build-in middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

//halaman home
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

//halaman about
app.get("/about", (req, res) => {
  res.render("about", {
    title: "Halaman About",
    layout: "layouts/main-layouts",
  });
});

//halaman kontak
app.get("/contact", async(req, res) => {
    
  const contacts = await Contact.find();

  res.render("contact", {
    title: "Halaman Contact",
    layout: "layouts/main-layouts",
    contacts,
    msg: req.flash("msg"),
  });
});

//halaman detail kontak
app.get("/contact/:nama", async(req, res) => {
    const contact = await Contact.findOne({ nama: req.params.nama });
  
    res.render("detail", {
      title: "Halaman Detail",
      layout: "layouts/main-layouts",
      contact,
    });
  });

app.listen(port, () => {
  console.log(`Mongo Contact App | Listening at http://localhost:${port}`);
});
