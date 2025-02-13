const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const router = express.Router();
router.use(bodyParser.json());

const pool = new Pool({
  user: "monika",
  host: "localhost",
  database: "school",
  password: "monika@24",
  port: 5432,
});

router.post("/", async (req, res) => {
  const { name, age, email } = req.body;
  try {
    const query = "INSERT INTO students (name, age, email) VALUES ($1, $2, $3) RETURNING *";
    const result = await pool.query(query, [name, age, email]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
  
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const offset = (pageNumber - 1) * limitNumber;
  
    try {
      const countQuery = "SELECT COUNT(*) AS total FROM students";
      const countResult = await pool.query(countQuery);
      const total = parseInt(countResult.rows[0].total, 10);
  
      const query = "SELECT * FROM students ORDER BY id LIMIT $1 OFFSET $2 ";
      const result = await pool.query(query, [limitNumber, offset]);
      
  
      const metadata = {
        totalRecords: total,
        currentPage: pageNumber,
        totalPages: Math.ceil(total / limitNumber),
        pageSize: limitNumber,
      };
  
      res.json({ metadata, students: result.rows });
    } catch (error) {
      console.error("Error retrieving students with pagination:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

router.get("/:id", async (req, res) => {
  const studentId = parseInt(req.params.id);
  try {
    const studentQuery = "SELECT * FROM students WHERE id = $1";
    const studentResult = await pool.query(studentQuery, [studentId]);

    if (studentResult.rows.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    const student = studentResult.rows[0];
    const marksQuery = "SELECT subject, marks FROM marks WHERE student_id = $1";
    const marksResult = await pool.query(marksQuery, [studentId]);

    student.marks = marksResult.rows;
    res.json(student);
  } catch (error) {
    console.error("Error retrieving student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  const studentId = parseInt(req.params.id);
  const { name, age, email } = req.body;
  try {
    const query = "UPDATE students SET name = $1, age = $2, email = $3 WHERE id = $4 RETURNING *";
    const result = await pool.query(query, [name, age, email, studentId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const studentId = parseInt(req.params.id);
  try {
    const query = "DELETE FROM students WHERE id = $1 RETURNING *";
    const result = await pool.query(query, [studentId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router