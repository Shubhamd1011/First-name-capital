import express from "express";

const app = express();
const port = 3000;

// Middleware
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(express.static("public")); // Serve static files if needed

// Set the view engine to EJS
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
  res.render("index", { fullName: null }); // Render the page without any name initially
});

app.post("/submit", (req, res) => {
  const name = req.body.name; // Get the name from the POST request

  if (!name || name.trim() === "") {
    return res.render("index", { fullName: "Invalid Input" }); // Handle empty or invalid input
  }

  // Capitalize the first letter of the name
  const upperCase = name.slice(0, 1).toUpperCase();
  const lowerCase = name.slice(1).toLowerCase();
  const fullName = upperCase + lowerCase;

  console.log(`Processed Name: ${fullName}`); // Log the processed name
  res.render("index", { fullName }); // Pass the processed name to the EJS template
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
