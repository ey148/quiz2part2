const mongoose = require("mongoose");
const express = require("express");
const app = express();
app.use(express.json());

//create and/or connect to a db

const uri = "mongodb+srv://tempuser:123@cluster0.f9d6o.gcp.mongodb.net/Exams23002";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }
    );
    const connection = mongoose.connection;
    connection.once('open', () => {
      console.log("MongoDB Atlas database connection established successfully");
    })

//creating schema
const studentSchema = new mongoose.Schema({
  name: String,
  sid: String,
}, {
    collection: "examrecords" // Specify the collection name here
});


app.get('/', async (req, res)=>{

// defining model
const Student = mongoose.model("Student", studentSchema);
//User has to be with capital first letter. mongo will make that small and pluralize
// the model name: "User" => "users"

// creating
const mylibrary = [
    {
        name: "Eric Yam",
        sid: "300356477",
    }    
]


// Student.deleteMany({}).then(function() {
//     console.log("successfully deleted all documents");
// });

Student.insertMany(mylibrary).then(function () {
    console.log("successfully created db");
    const responseStrings = [
        "Created a new one.",
        "OK",
      ];
      res.json(responseStrings);
    //res.json(mylibrary);
    //mongoose.connection.close();
}).catch(function (err) {
    console.log(err);
    const responseStrings = [
        "Not created a new one.",
        "error!.",
      ];
      res.json(responseStrings);
//    res.json(mylibrary);
});

});


app.listen(3000, () => console.log('User API listening on port 3000!'));