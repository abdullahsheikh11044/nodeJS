const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const { default: mongoose } = require("mongoose");
//@desc Get all contacts
//@route get /api/contacts
//@access public

const getContacts = asyncHandler(async (req, res) => {
  const contact = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contact);
  // if (contact === null) {
  //   res.status(404).json({ message: "Contact not found" });
  // }
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

  const contact = await Contact.create({
    name,
    email,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

//@desc get all contacts
//@route get /api/contacts/:id
//@access public

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("no contact found");
  }
  res.status(200).json(contact);
});

//@desc Update contacts
//@route put /api/contacts
//@access public

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("no contact found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Unauthenticated user");
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedContact);
});

//@desc Delete contacts
//@route delete /api/contacts
//@access public

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("No contact found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("Unauthenticated user");
  }
  await Contact.deleteOne({ _id: req.params.id });

  res.status(200).json({ message: "Contact deleted successfully" });
});

module.exports = {
  getContacts,
  createContacts,
  getContact,
  updateContact,
  deleteContact,
};
