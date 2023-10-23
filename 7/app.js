const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const Contact = require("./model/contact");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
require("./utils/db");
const { body, validationResult, check } = require("express-validator");
const methodOverride = require("method-override");

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
app.use(methodOverride("_method"));

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
app.get("/contact", async (req, res) => {
  const contacts = await Contact.find();

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

//proses form tambah data kontak
app.post(
  "/contact",
  [
    body("nama").custom(async (value) => {
      const duplikat = await Contact.findOne({ nama: value });

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
      Contact.insertMany(req.body, (err, result) => {
        //kirim flash msg
        req.flash("msg", "Data Kontak Berhasil Ditambahkan!");
        res.redirect("/contact");
      });
    }
  }
);

//proses delete kontak
// app.get("/contact/delete/:nama", async(req, res) => {
//   const contact = await Contact.findOne({ nama: req.params.nama });

//   //jika kontak tidak ada
//   if (!contact) {
//     res.status(404);
//     res.send("<h1>404</h1>");
//   } else {
//     Contact.deleteOne({ _id: contact.id }).then((result) => {
//       req.flash("msg", "Data Kontak Berhasil Dihapus!");

//       res.redirect("/contact");
//     });
//   }
// });

//proses delete kontak(restful), menggunakan method override
app.delete("/contact", (req, res) => {
  Contact.deleteOne({ nama: req.body.nama }).then((result) => {
    req.flash("msg", "Data Kontak Berhasil Dihapus!");

    res.redirect("/contact");
  });
});

//form ubah data kontak
app.get("/contact/edit/:nama", async(req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama })

  res.render("edit-contact", {
    title: "Form ubah data kontak",
    layout: "layouts/main-layouts",
    contact,
  }); 
});

//proses edit
app.put(
  "/contact",
  [
    body("nama").custom(async(value, { req }) => {
      const duplikat = await Contact.findOne({ nama: value });

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
      Contact.updateOne(
        { _id: req.body._id },
        {
          $set:{
            nama: req.body.nama,
            email: req.body.email,
            nomor: req.body.nomor,
          }
        }
        ).then((result) => {
          req.flash("msg", "Data Kontak Berhasil Diubah!");
    
          res.redirect("/contact");
        })
    }
  }
);

//halaman detail kontak
app.get("/contact/:nama", async (req, res) => {
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
