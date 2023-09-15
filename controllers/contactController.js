//@desc Get all contacts
//@route get /api/contacts
//@access public

const getContacts = (req, res) => {
  res.status(200).json({ message: "all contacts" });
};

//@desc create all contacts
//@route post /api/contacts
//@access public

const createContacts = (req, res) => {
  console.log(req.body);
  res.status(201).json({ message: "create contacts" });
};

//@desc get all contacts
//@route get /api/contacts/:id
//@access public

const getContact = (req, res) => {
  res.status(200).json({ message: `get contact for ${req.params.id}` });
};

//@desc Update contacts
//@route put /api/contacts
//@access public

const updateContact = (req, res) => {
  res.status(200).json({ message: `update contact for ${req.params.id}` });
};

//@desc Delete contacts
//@route delete /api/contacts
//@access public

const deleteContact = (req, res) => {
  res.status(200).json({ message: `delete contact for ${req.params.id}` });
};

module.exports = {
  getContacts,
  createContacts,
  getContact,
  updateContact,
  deleteContact,
};
