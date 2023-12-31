const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, '../my-app/build')));

// Handle other routes and send the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
