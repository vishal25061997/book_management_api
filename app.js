const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const sequelize = require("./db/db");
const User = require("./models/User");
const Book = require("./models/Book");
const swaggerJSdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

dotenv.config();
const app = express();

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Book Management API",
    description: "API Documentation",
    version: "1.0.0",
    contact: {
      email: "hksalaudeen@gmail.com",
    },
  },
  servers: [
    {
      url: "http://localhost:4500",
      description: "Local server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};
if (true) {
  const swaggerSpec = swaggerJSdoc({
    swaggerDefinition,
    apis: ["./controllers/*.js"],
  });

  app.get("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);

User.hasMany(Book);
Book.belongsTo(User);

const PORT = process.env.PORT || 4500;
sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database synchronization failed:", err);
  });
