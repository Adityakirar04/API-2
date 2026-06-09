 const express = require("express");
const fs = require("fs");

const users = require("./MOCK_DATA.json");

const app = express();
const PORT = 8000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Get all users
app.get("/api/users", (req, res) => {
  return res.json(users);
});

// Get user by ID
app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  return res.json(user);
});

// Create user
app.post("/api/users", (req, res) => {
  const body = req.body;

  console.log("BODY =", body);

  if (!body) {
    return res.status(400).json({
      message: "Request body missing",
    });
  }

  const newUser = {
    id: users.length + 1,
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    job_title: body.job_title,
  };

  users.push(newUser);

  fs.writeFile(
    "./MOCK_DATA.json",
    JSON.stringify(users, null, 2),
    (err) => {
      if (err) {
        return res.status(500).json({
          message: "Error saving user",
        });
      }

      return res.status(201).json({
        status: "success",
        data: newUser,
      });
    }
  );
});

// Update user
app.patch("/api/users/:id", (req, res) => {
  return res.json({
    status: "pending",
  });
});

// Delete user
app.delete("/api/users/:id", (req, res) => {
  return res.json({
    status: "pending",
  });
});

app.listen(PORT, () => {
  console.log(`Server Started at PORT ${PORT}`);
});