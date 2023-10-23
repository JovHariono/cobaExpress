const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/wpu", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// //menambah 1 data
// const contact1 = new Contact({
//   nama: "Bobi",
//   nomor: "08121239816519",
//   email: "bobi@gmail.com",
// });

// //simpan ke collection
// contact1
//     .save()
//     .then((res) => console.log(res))
