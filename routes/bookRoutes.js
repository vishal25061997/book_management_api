const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const userAuthentication = require("../middlewares/auth");
const {
  validateBookCreation,
  validateBookUpdate,
} = require("../validators/bookValidators");

router.post(
  "/",
  validateBookCreation,
  userAuthentication.authenticate,
  bookController.createBook
);
router.get("/", bookController.getAllBooks);
router.patch(
  "/:id",
  validateBookUpdate,
  userAuthentication.authenticate,
  bookController.updateBook
);
router.delete(
  "/:id",
  userAuthentication.authenticate,
  bookController.deleteBook
);

module.exports = router;
