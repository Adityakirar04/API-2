const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  const allUsers = await User.find({});
  return res.json(allUsers);
}

async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      msg: "User not found",
    });
  }

  return res.json(user);
}

async function handleCreateNewUser(req, res) {
  const body = req.body;

  if (
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({
      msg: "All fields are required",
    });
  }

  const result = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    job_title: body.job_title,
  });

  return res.status(201).json({
    msg: "Success",
    data: result,
  });
}

async function handleUpdateUserById(req, res) {
  await User.findByIdAndUpdate(req.params.id, req.body);

  return res.json({
    status: "success",
  });
}

async function handleDeleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);

  return res.json({
    status: "success",
  });
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleCreateNewUser,
  handleUpdateUserById,
  handleDeleteUserById,
};