const users = [
  { id: 1, firstName: "Subhasmita", lastName: "Khamari", active: true },
  { id: 2, firstName: "Akankshya", lastName: "", active: true },
  { id: 3, firstName: "Swati", lastName: "Sucharita", active: false },
];

// CRUD
// View : GET /users
// view one user : GET /user/:id
// Add : POST /user
// Delete : DELETE /user/:id
// Update : PUT/PATCH /user/:id

class UserUtil {
  getUsers() {
    return users;
  }

  addUser(user) {
    user = { ...user, id: users.length + 1 };
    users.push(user);
    return user;
  }

  updateUser(id, updates) {
    const user = users.find(function (u) {
      return u.id === id;
    });
    user = { ...user, ...updates };
    return user;
  }
  deleteUser(id) {}
}

module.exports = new UserUtil();
