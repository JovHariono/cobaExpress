const { MongoClient, ObjectID } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const dbName = "wpu";

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((error, client) => {
  if (error) {
    return console.log("Koneksi gagal");
  }

  //pilih database
  const db = client.db(dbName);

  //create / insert data(menambahkan data ke collection mahasiswa)
  // db.collection('mahasiswa').insertOne({
  //     nama: 'Basuki',
  //     email: 'basuki@gmail.com'
  // },
  // (error, result) => {
  //     if(error){
  //         return console.log('Gagal menambahkan data')
  //     }

  //     console.log(result)
  // }
  //  )

  //menambahkan lebih dari 1 data
  // db.collection('mahasiswa').insertMany(
  //     [
  //         {
  //             nama: 'Jovan',
  //             email: 'jovanhariono5@gmail.com'
  //         },
  //         {
  //             nama: 'Avip',
  //             email: 'avip@gmail.com'
  //         }
  //     ],
  //     (error, result) => {
  //         if(error){
  //             return console.log('Data gagal ditambahkan')
  //         }

  //         console.log(result)
  //     }
  // )

  //menampilkan semua data yang ada di collection
  //   db
  //     .collection("mahasiswa")
  //     .find()
  //     .toArray((err, res) => {console.log(res)});

  //menampilkan data berdasarkan kriteria yang ada di collection
  //   db
  //     .collection("mahasiswa")
  //     .find({ _id: ObjectID('65326ba7476a543724bd9c6b') })
  //     .toArray((err, res) => {console.log(res)});

  //mengubah data berdasarkan id
  //   const updatePromise = db.collection("mahasiswa").updateOne(
  //     {
  //       _id: ObjectID("65326ba7476a543724bd9c6b"),
  //     },
  //     {
  //       $set: {
  //         email: "avip@yahoo.com",
  //       },
  //     }
  //   );

  //   updatePromise
  //   .then((res) => {
  //     console.log(res)
  //   })
  //   .catch((err) => {
  //     console.log(err)
  //   })

  //mengubah data lebih dari 1
  //   db
  //     .collection('mahasiswa')
  //     .updateMany(
  //         {
  //         nama: 'Jovan'
  //     },
  //     {
  //         $set: {
  //             nama: 'Jovan Aja'
  //         },
  //     }
  //     )

  //menghapus 1 data
//   db.collection("mahasiswa")
//     .deleteOne({
//       _id: ObjectID("65326ba7476a543724bd9c6b"),
//     })
//     .then((res) => console.log(res))
//     .catch((err) => console.log(err));


    //megnhapus lebih dari 1 data
  db.collection("mahasiswa")
    .deleteMany({
      nama: 'Jovan Aja',
    })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
});
