const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

// ✅ Route to deliver protected script
app.post("/get-script", (req, res) => {
    const { key } = req.body;

    app.get("/", (req, res) => {
  res.send("✅ CPM Garage backend is up.");
});

app.get("/get-script", (req, res) => {
  res.send("Use POST to access this endpoint securely.");
});

    // You can replace this with real key auth later
    if (key !== "test-123") {
        return res.status(403).send("Invalid key");
    }

    const filePath = path.join(__dirname, "scripts", "protected.bundle.js");

    if (!fs.existsSync(filePath)) {
        return res.status(404).send("Script not found");
    }

    res.sendFile(filePath);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
