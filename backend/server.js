let express = require("express")
let bodyParser = require("body-parser")
const dotenv = require('dotenv');
let cors = require("cors")
const connectDB = require('./config/db');
const multer = require("multer")
const path = require('path');
let registerUsers = require("./models/RegisterUsers")
let employeeRegister = require("./models/EmployeeRegister")

// Load environment variables
dotenv.config();

// Connect to database
connectDB();


const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


let storage = multer.diskStorage({
    destination: function (req, image, cb) {
      // Store files in the 'Images' folder
      return cb(null, './Images');
    },
    filename: function (req, image, cb) {
      // Use the original name of the image as the filename
      return cb(null, `${image.originalname}`);
    }
  });
  
  // Initialize multer with storage configuration
  let upload = multer({ storage });
  
  // Serve static files from the 'Images' folder
  app.use('/images', express.static(path.join(__dirname, 'Images')));
  
  // Your file upload route (for example, uploading profile pictures)
  app.post('/upload', upload.single('image'), (req, res) => {
    res.send('Image uploaded successfully');
  });
  
  // Sample route for fetching uploaded images (for testing)
  app.get('/images/:filename', (req, res) => {
    res.sendFile(path.join(__dirname, 'Images', req.params.filename));
  });



// registration form data handle
app.post("/register", (req, res) => {
    registerUsers.findOne({ email: req.body.email })
        .then((user) => {
            if (user !== null) {
                res.json("email already registered..")
            }
            else {
                let dataForDB = new registerUsers(req.body)
                dataForDB.save()
                    .then((data) => { res.json("input stored in DB successfully..."); })
                    .catch((error) => (res.json("data can not be saved , problem at saving time....")))
            }
        })
        .catch(() => {
            res.json("registration problem...")
        })


})


app.post("/login", (req, res) => {
    registerUsers.findOne({ email: req.body.email })
      .then((user) => {
        if (user && user.cnfPassword === req.body.password) {
          res.json({ "status": "success", "id": user._id, "name": user.name });
        } else {
          res.json({ "status": "fail" });
        }
      })
      .catch(() => {
        res.json({ "status": "noUser" });
      });
  });
  

// respond data to the Dashbord component
app.get("/user/:ID", (req, res) => {
  let ID = req.params.ID
  registerUsers.findOne({ _id: ID })
      .then((e) => { res.json(e.name) })
      .catch(() => { console.log("problem at param get users Express.."); })
})

// storing create employee form data

app.post("/employees", upload.single("image"), (req, res) => {
  console.log(req.body);
  employeeRegister.findOne({ email: req.body.email })
      .then((user) => {
          if (user !== null) {
              res.json("email already registered..")
          }
          else {
              let dataForDB = new employeeRegister({
                  name: req.body.name,
                  email: req.body.email,
                  phone: req.body.phone,
                  designation: req.body.designation,
                  gender: req.body.gender,
                  course: req.body.course,
                  image: req.file.filename
              })
              dataForDB.save()
                  .then((data) => { res.json("input stored in DB successfully..."); })
                  .catch((error) => (res.json("data can not be saved , problem at saving time....")))
          }
      })
      .catch(() => {
          res.json("registration problem...")
      })
})

// respnding employee-list

app.get("/employee-list", (req, res) => {
    employeeRegister.find()
        .then((e) => {
            res.send(e)
        })
})

// edit-employee send data
app.get("/employee-list/:ID", (req, res) => {
    let ID = req.params.ID
    employeeRegister.findOne({ _id: ID })
        .then((e) => {
            res.send(e)
        })
        .catch(() => {
            res.send("employee not find")
        })
})

// edit-employee update values
app.put("/employee-list/:ID",upload.single('image'), (req, res) => {
    let ID = req.params.ID
    employeeRegister.updateOne({ _id: ID }, req.body)
        .then((e) => { res.send("successfully updated data") })
        .catch(() => { res.send("error at Delete API"); })
})


// delete employee
app.delete("/employee-list/:ID", (req, res) => {
    let ID = req.params.ID
    employeeRegister.deleteOne({ _id: ID }, req.body)
        .then(() => { res.send("user deleted.."); })
        .catch(() => { res.send("problem at deletion.."); })
})


app.listen(4001, () => {
    console.log("server runing at 4001....");
})