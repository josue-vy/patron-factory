const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
});

const User = mongoose.model('User', userSchema);

class UserRepository {
  static async createUser(username, email) {
    const user = new User({ username, email });
    return user.save();
  }

  static async updateUser(id, updates) {
    return User.findByIdAndUpdate(id, updates, { new: true });
  }

  static async deleteUser(id) {
    return User.findByIdAndDelete(id);
  }

  static async getUserById(id) {
    return User.findById(id);
  }

  static async getAllUsers() {
    return User.find();
  }
}

module.exports = { User, UserRepository };