const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const {
  loadContact,
  findContact,
  addContact,
  cekDuplikat,
  deleteContact,
  updateContact,
} = require("./utils/contacts");
const { body, validationResult, check } = require("express-validator");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const app = express();
const port = 3000;

//menggunakan EJS
app.set("view engine", "ejs");

//third-party middleware
app.use(expressLayouts);

//build-in middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

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
    msg: req.flash("msg"),
  });
});

//halaman form tambah kontak
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    title: "Form tambah data kontak",
    layout: "layouts/main-layouts",
  });
});

//proses form data kontak
app.post(
  "/contact",
  [
    body("nama").custom((value) => {
      const duplikat = cekDuplikat(value);

      if (duplikat) {
        throw new Error("Nama kontak sudah terdaftar!");
      }
      return true;
    }),
    check("email", "Email tidak valid").isEmail(),
    check("nomor", "Nomor Hp tidak valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("add-contact", {
        title: "Form tambah data kontak",
        layout: "layouts/main-layouts",
        errors: errors.array(),
      });
    } else {
      addContact(req.body);
      //kirim flash msg
      req.flash("msg", "Data Kontak Berhasil Ditambahkan!");

      res.redirect("/contact");
    }
  }
);

//form ubah data kontak
app.get("/contact/edit/:nama", (req, res) => {
  const contact = findContact(req.params.nama)

  res.render("edit-contact", {
    title: "Form ubah data kontak",
    layout: "layouts/main-layouts",
    contact,
  }); 
});

//proses edit
app.post(
  "/contact/update",
  [
    body("nama").custom((value, { req }) => {
      const duplikat = cekDuplikat(value);

      if (value !== req.body.oldNama && duplikat) {
        throw new Error("Nama kontak sudah terdaftar!");
      }
      return true;
    }),
    check("email", "Email tidak valid").isEmail(),
    check("nomor", "Nomor Hp tidak valid").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("edit-contact", {
        title: "Form ubah data kontak",
        layout: "layouts/main-layouts",
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      updateContact(req.body)
      req.flash("msg", "Data Kontak Berhasil Diubah!");

      res.redirect("/contact");
    }
  }
);

//proses delete kontak
app.get("/contact/delete/:nama", (req, res) => {
  const contact = findContact(req.params.nama);

  //jika kontak tidak ada
  if (!contact) {
    res.status(404);
    res.send("<h1>404</h1>");
  } else {
    deleteContact(req.params.nama);

    req.flash("msg", "Data Kontak Berhasil Dihapus!");

    res.redirect("/contact");
  }
});

//halaman detail kontak
app.get("/contact/:nama", (req, res) => {
  const contact = findContact(req.params.nama);

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
  console.log(`Example app listening at http://localhost:${port}`);
});
