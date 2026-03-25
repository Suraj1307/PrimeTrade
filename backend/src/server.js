const dotenv = require("dotenv");
const app = require("./app");
const connectDb = require("./config/db");

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
