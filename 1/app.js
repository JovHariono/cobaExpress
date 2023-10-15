const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  // res.send("Hello World!");
  // res.json({
  //   nama: "Jovan",
  //   email: "jovanhariono@gmail.com",
  //   nomor: "0812310823",
  // });

  res.sendFile('./index.html', { root: __dirname })
});

app.get("/about", (req, res) => {
  // res.send("Ini adalah halaman about");
  res.sendFile('./about.html', { root: __dirname })
});

app.get("/contact", (req, res) => {
  // res.send("Ini adalah halaman contact");
  res.sendFile('./contact.html', { root: __dirname })
});

app.get(`/produk/:id`, (req, res) => {
  res.send(`Produk ID : ${req.params.id} <br/> Category : ${req.query.category}`)
})

app.use("/", (req, res) => {
  res.status(404);
  res.send("Tes");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// const http = require("http");
// const fs = require("fs");

// http
//   .createServer((req, res) => {
//     res.writeHead(200, {
//       "Content-Type": "text/html",
//     });

//     const url = req.url;
//     if (url === "/about") {
//       res.write("Halaman about");
//       res.end();
//     } else if (url === "/contact") {
//       res.write("Halaman contact");
//       res.end();
//     } else {
//       fs.readFile("./index.html", (err, data) => {
//         if(err) {
//           res.writeHead(404);
//           res.write("Error: file not found");
//         }else{
//             res.write(data)
//         }
//         res.end()
//       });
//     }
//   })
//   .listen(3000, () => {
//     console.log("Server is listening on port 3000...");
//   });
