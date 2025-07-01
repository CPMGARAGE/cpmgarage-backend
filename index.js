const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const VALID_KEYS = {
  "test-123": "paid",
  "free-456": "trial"
};

// Route to serve JS if key is valid
app.post('/get-script', (req, res) => {
  const { key } = req.body;

  if (!VALID_KEYS[key]) {
    return res.status(403).json({ error: 'Invalid or expired key' });
  }

  const jsPath = path.join(__dirname, 'scripts', 'protected.bundle.js');

  if (fs.existsSync(jsPath)) {
    return res.sendFile(jsPath);
  } else {
    return res.status(404).json({ error: 'Script not found' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ CPM Garage backend live on ${PORT}`);
});
