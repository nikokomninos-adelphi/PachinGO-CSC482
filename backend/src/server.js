/**
 * server.js
 * 
 * Starts the server.
 */

import app from "./app.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Sever running on Port ${PORT}`));