require("dotenv").config(); // importing dotenv module and calling its config() method, dotenv module is used to load environment variables from a .env file into the Node.js environment.

const express = require("express"); //importing express module a framework of nodejs
const bodyParser = require("body-parser"); //importing body-parser to parse incoming request bodies in middleware, making it easier to work with data submitted via HTTP POST requests.
const pdf = require("html-pdf"); //importing the html-pdf module. enables the creation of PDF files from HTML content. It's useful when we want to generate PDF documents programmatically.
const cors = require("cors"); //importing cors, cors module helps in configuring CORS settings for Express.js applications
const { MongoClient } = require("mongodb"); //imports the MongoClient class from the mongodb module
const { OAuth2Client } = require("google-auth-library"); //imports the OAuth2Client class from the google-auth-library module
const jwt = require("jsonwebtoken"); //imports the jsonwebtoken module

const GOOGLE_CLIENT_ID = "794968404021-vr1ps70ib6lm90c3oa2o1jrd79v94u3d.apps.googleusercontent.com"; //defining a constant named GOOGLE_CLIENT_ID and assigns it a string value
const URI = "mongodb://127.0.0.1:27017/" //process.env.MONGO_URI; //seting up a constant named URI and assigning it the value of an environment variable named MONGO_URI
console.log("db url", URI)
const googleclient = new OAuth2Client(GOOGLE_CLIENT_ID); //creating an instance of the OAuth2Client class from the google-auth-library module
const mongoclient = new MongoClient(URI);  //creating an instance of the MongoClient class from the mongodb module

let DB;  //declaring variable DB
try {               //try block to handle potential error that might occur in execution
  // Connect to the MongoDB cluster
  mongoclient.connect();
  console.log("Connected to MongoDB !");
  DB = mongoclient.db("resumebuilder");
} catch (e) {
  console.error(e);
}

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

const pdfTemplate = require("./documents");

const options = {
  height: "42cm",
  width: "35.7cm",
  timeout: "12000",
};

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const verifyGoogleToken = async (token) => {
  try {
    const ticket = await googleclient.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    return { payload: ticket.getPayload() };
  } catch (error) {
    return { error: "Invalid user detected. Please try again", e: error };
  }
};

app.post("/verifyToken", (req, res) => {
  const token = req.body.token;
  jwt.verify(token, process.env.GOOGLE_CLIENT_SECRET, (err, decodedToken) => {
    if (err && (err.name === "TokenExpiredError" || err.name === "JsonWebTokenError")) {
      res.status(401).json({
        message: err,
      });
    }

    const email = decodedToken?.email;

    DB.collection("users")
      .findOne({ email: email })
      .then((user) => {
        if (!user) {
          return res.status(400).json({
            message: "You are not registered. Please sign up",
          });
        } else {
          if (Date.now() < decodedToken.exp * 1000) {
            return res.status(200).json({ status: "Success" });
          }
        }
      });
  });
});

app.post("/signup", async (req, res) => {
  try {
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);

      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;
      const user = {
        firstName: profile?.given_name,
        lastName: profile?.family_name,
        picture: profile?.picture,
        email: profile?.email,
        token: jwt.sign(
          { email: profile?.email },
          process.env.GOOGLE_CLIENT_SECRET,
          {
            expiresIn: "1d",
          }
        ),
      };

      DB.collection("users")
        .insertOne(user)
        .then((resp) => {
          res.status(201).json({
            message: "Signup was successful",
            user: user,
          });
        });
    }
  } catch (error) {
    res.status(500).json({
      message: "An error occurred. Registration failed. " + error,
    });
  }
});


app.post("/login", async (req, res) => {
  try {
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);
      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;
      DB.collection("users")
        .findOne({ email: profile?.email })
        .then((user) => {
          if (!user) {
            return res.status(400).json({
              message: "You are not registered. Please sign up",
            });
          }
          DB.collection("resume")
            .findOne({ userid: user?._id.toString() })
            .then((resumeDoc) => {
              res.status(201).json({
                message: "Login was successful",
                resume: resumeDoc,
                user: {
                  firstName: profile?.given_name,
                  lastName: profile?.family_name,
                  picture: profile?.picture,
                  email: profile?.email,
                  token: jwt.sign(
                    { email: profile?.email },
                    process.env.GOOGLE_CLIENT_SECRET,
                    {
                      expiresIn: "1d",
                    }
                  ),
                },
              });
            });
        });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err?.message || err,
    });
  }
});

app.post("/save", (req, res) => {
  const { user, resume } = req.body;
  delete resume.step;

  DB.collection("users")
    .findOne({ email: user.email })
    .then((userDoc) => {
      const USERID = userDoc._id.toString();
      const data = {
        userid: USERID,
        ...resume,
      };
      DB.collection("resume")
        .findOne({ userid: USERID })
        .then((resumeDoc) => {
          if (resumeDoc) {
            DB.collection("resume")
              .deleteOne({ userid: USERID })
              .then(() => {
                DB.collection("resume")
                  .insertOne(data)
                  .then(() => res.sendStatus(200))
                  .catch((err) => res.send(err));
              })
              .catch((err) => console.log(err));
          } else {
            DB.collection("resume")
              .insertOne(data)
              .then(() => res.sendStatus(200))
              .catch((err) => res.send(err));
          }
        });
    });
});

app.post("/get-resume", (req, res) => {
  const { email } = req.body;
  DB.collection("users")
    .findOne({ email: email })
    .then((userDoc) => {
      const USERID = userDoc._id.toString();
      DB.collection("resume")
        .findOne({ userid: USERID })
        .then((resumeDoc) => {
          if (resumeDoc) {
            delete resumeDoc._id;
            delete resumeDoc.userid;
            res.send(resumeDoc);
          }
        });
    });
});

// POST route for PDF generation....
app.post("/create-pdf", (req, res) => {
  pdf.create(pdfTemplate(req.body), options).toFile("Resume.pdf", (err) => {
    if (err) {
      console.log(err);
      res.send(Promise.reject());
    } else res.send(Promise.resolve());
  });
});

// GET route -> send generated PDF to client...
app.get("/fetch-pdf", (req, res) => {
  const file = `${__dirname}/Resume.pdf`;
  res.download(file);
});

app.post("/fetchcandidateinfo",(req,res)=>{
  console.log("query for user details")
  let querydata=req.body.userid.split("_")
  DB.collection("resume")
  .findOne({
    "firstname":querydata[0],
    "userid":querydata[1]
          })
  .then(docs=>{
    console.log("userdata",docs);

      res.status(200).send({message:"candidate data",result:docs}) 
  }).catch(
    err=>{
     res.status(404).send("data not found") 
    }
  )
})

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server started on port ${port}`));
