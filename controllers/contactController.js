const asyncHandler = require("express-async-handler");
//@desc Get all contacts
//@route get /api/contacts
//@access public

const getContacts = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "all contacts" });
});

//@desc create all contacts
//@route post /api/contacts
//@access public

const createContacts = asyncHandler(async (req, res) => {
  console.log("The request body is: ", req.body);
  const { name, email } = req.body;
  if (!name || !email) {
    res.status(404);
    throw new Error("all fields are required");
  }
  res.status(201).json({ message: "create contacts" });
});

//@desc get all contacts
//@route get /api/contacts/:id
//@access public

const getContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `get contact for ${req.params.id}` });
});

//@desc Update contacts
//@route put /api/contacts
//@access public

const updateContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `update contact for ${req.params.id}` });
});

//@desc Delete contacts
//@route delete /api/contacts
//@access public

const deleteContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `delete contact for ${req.params.id}` });
});

module.exports = {
  getContacts,
  createContacts,
  getContact,
  updateContact,
  deleteContact,
};
