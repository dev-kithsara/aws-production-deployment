require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 CloudTask API server running on http://localhost:${PORT}`);
  console.log(
    `❤️ Health check available at http://localhost:${PORT}/api/health`,
  );
});
