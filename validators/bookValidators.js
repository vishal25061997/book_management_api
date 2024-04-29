const { body, validationResult } = require("express-validator");

exports.validateBookCreation = [
  body("title").notEmpty().withMessage("Title is required"),
  body("author").notEmpty().withMessage("Author is required"),
  body("publicationYear")
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage("Invalid publication year"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

exports.validateBookUpdate = [
  body("title").optional().notEmpty().withMessage("Title is required"),
  body("author").optional().notEmpty().withMessage("Author is required"),
  body("publicationYear")
    .optional()
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage("Invalid publication year"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
