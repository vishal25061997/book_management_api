const Book = require("../models/Book");

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: Book management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *          title:
 *            type: string
 *            description: The title of the book.
 *          author:
 *            type: string
 *            description: The author of the book.
 *          publicationYear:
 *            type: integer
 *            description: The year of publication of the book.
 *       required:
 *        - title
 *        - author
 *        - publicationYear
 *      securitySchemes:
 *          Bearer:
 *              type:http
 *              scheme:bearer
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: Filter books by author name
 *       - in: query
 *         name: publicationYear
 *         schema:
 *           type: integer
 *         description: Filter books by publication year
 *     responses:
 *       '200':
 *         description: Successfully retrieved books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Book"
 *       '401':
 *         description: Unauthorized - Missing or invalid authentication token
 *       '500':
 *         description: Internal server error
 */

exports.getAllBooks = async (req, res) => {
  const { author, publicationYear } = req.query;
  let query = {};

  if (author) query.author = author;
  if (publicationYear) query.publicationYear = publicationYear;

  try {
    const books = await Book.findAll({ where: query });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch books." });
  }
};

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book
 *     tags:
 *       - Books
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the book
 *               author:
 *                 type: string
 *                 description: The author of the book
 *               publicationYear:
 *                 type: integer
 *                 description: The publication year of the book
 *     responses:
 *       '201':
 *         description: Created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Book"
 *       '500':
 *         description: Internal server error
 */

exports.createBook = async (req, res) => {
  try {
    const { title, author, publicationYear } = req.body;
    userId = req.user.id;
    const book = await Book.create({
      title,
      author,
      publicationYear,
      userId,
    });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: "Failed to create book." });
  }
};

/**
 * @swagger
 * /api/books/:id:
 *   put:
 *     summary: Update a book by ID
 *     tags: [Books]
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the book to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The updated title of the book
 *               author:
 *                 type: string
 *                 description: The updated author of the book
 *               publicationYear:
 *                 type: integer
 *                 description: The updated publication year of the book
 *     responses:
 *       '200':
 *         description: Book updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message confirming the book was updated successfully
 *                 book:
 *                   $ref: "#/components/schemas/Book"
 *       '403':
 *         description: Not authorized to update this book
 *       '404':
 *         description: Book not found
 *       '500':
 *         description: Internal server error
 */

exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, publicationYear } = req.body;
  const userId = req.user.id;

  try {
    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }
    if (book.id !== userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this book." });
    }
    await book.update({ title, author, publicationYear });
    res.status(200).json({ message: "Book updated successfully.", book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update book." });
  }
};
/**
 * @swagger
 * /api/books/:id:
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the book to delete
 *     responses:
 *       '200':
 *         description: Book deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message confirming the book was deleted successfully
 *       '403':
 *         description: You are not authorized to delete this book
 *       '404':
 *         description: Book not found
 *       '500':
 *         description: Internal server error
 */

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found." });
    }
    if (book.id !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this book." });
    }
    await book.destroy();
    return res.status(200).json({ message: "Book deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete book." });
  }
};
