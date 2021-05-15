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

  getUser(id) {
    if (typeof id !== "number") {
      id = parseInt(id, 10);
    }
    const user = users.find(function (u) {
      return u.id === id;
    });

    return user || {};
  }

  addUser(user) {
    user = { ...user, id: users.length + 1 };
    users.push(user);
    return user;
  }

  updateUser(id, updates) {
    if (typeof id !== "number") {
      id = parseInt(id, 10);
    }
    let userIndex = -1;
    let user = users.find(function (u, i) {
      if (u.id === id) {
        userIndex = i;
        return true;
      }
    });
    users[userIndex] = { ...user, ...updates };
    return users[userIndex];
  }
  deleteUser(id) {
    if (typeof id !== "number") {
      id = parseInt(id, 10);
    }
    let userIndex = -1;
    let user = users.find(function (u, i) {
      if (u.id === id) {
        userIndex = i;
        return true;
      }
    });
    users.splice(userIndex, 1);
  }
}

module.exports = new UserUtil();
