const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const createUser = (name, email) => {
  const users = loadUsers();
  const id = uuidv4();
  users.push({ id, name, email });
  savedUsers(users);
};
const loadUsers = () => {
  try {
    const dataBuffer = fs.readFileSync("users.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

const savedUsers = (users) => {
  const dataJSON = JSON.stringify(users);
  fs.writeFileSync("users.json", dataJSON);
};

const updateUser = (id, name, email) => {
  const users = loadUsers();

  const selectedUser = users.find((user) => user.id === id);
  if (selectedUser) {
    selectedUser.name = name;
    selectedUser.email = email;
    savedUsers(users);
  } else {
    console.log("not found");
  }
};

const getUser = (id) => {
  const users = loadUsers();
  const selectedUser = users.find((user) => user.id === id);
  savedUsers(selectedUser);
  console.log(selectedUser);
};

const deleteUser = (id) => {
  const users = loadUsers();
  const newUsers = users.filter((user) => user.id !== id);
  savedUsers(newUsers);
};

module.exports = { createUser, updateUser, deleteUser, savedUsers, getUser };
