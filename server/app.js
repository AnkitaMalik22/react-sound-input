const express = require("express");
const cors = require("cors");
const connectDB = require("./db.js");
const FormDataModel = require("./FormSchema.js");

const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Route For Saving The Form Data

app.post("/save", async (req, res) => {
  try {
    const { firstName, lastName, state, district, village, panNumber } =
      req.body;

    if (
      !firstName ||
      !lastName ||
      !state ||
      !district ||
      !village ||
      !panNumber
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newFormData = new FormDataModel(req.body);

    // Save the form data to the database
    await newFormData.save();

    res.status(201).json({ message: "Form data saved successfully" });
  } catch (error) {
    console.error("Error saving form data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get All Data - Route

app.get("/data", async (req, res) => {
  try {
    const data = await FormDataModel.find();
    res.status(201).json(data);
  } catch (error) {
    console.log("Error Fetching Data : ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});