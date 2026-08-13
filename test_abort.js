const http = require('http');
const req = http.get('http://localhost:3000/download?format=mp4', (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  res.on('data', (chunk) => {
    console.log(`Received ${chunk.length} bytes`);
    req.destroy(); // Abort the request immediately after first chunk
  });
});
req.on('error', (e) => {
  console.log(`Problem with request: ${e.message}`);
});
