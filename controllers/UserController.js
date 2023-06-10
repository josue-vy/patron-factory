const { UserRepository } = require('../models/User');

class UserController {
  static async createUser(req, res) {
    try {
      const { username, email } = req.body;
      const user = await UserRepository.createUser(username, email);
      return res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error en el servidor' });
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedUser = await UserRepository.updateUser(id, updates);
      return res.status(200).json({ user: updatedUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error en el servidor' });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await UserRepository.deleteUser(id);
      return res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error en el servidor' });
    }
  }

  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await UserRepository.getUserById(id);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      return res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error en el servidor' });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await UserRepository.getAllUsers();
      return res.status(200).json({ users });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error en el servidor' });
    }
  }
}

module.exports = UserController;
