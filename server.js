require('dotenv').config()

const app = require("./app")

const PORT = process.env.PORT || 1476


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});