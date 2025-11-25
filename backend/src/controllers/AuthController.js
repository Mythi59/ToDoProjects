import UserModel from "../models/UserModel.js";
import { ERROR_MESSAGES } from "../config/Constants.js";

class AuthController {
  // Registrar usuario
  async register(request, response) {
    try {
      const { name, email, password, companyId } = request.body;

      // Verificar si el usuario ya existe
      const existingUser = await UserModel.findByEmail(email);
      if (existingUser) {
        return response.status(400).json({
          error: ERROR_MESSAGES.USER_EXISTS,
        });
      }

      // Crear usuario
      const result = await UserModel.createUser({
        name,
        email,
        password,
        companyId,
      });

      return response.status(201).json({
        message: "Usuario registrado exitosamente",
        user: {
          id: result.insertedId,
          name,
          email,
        },
      });
    } catch (error) {
      return response.status(500).json({
        error: "Error al registrar usuario",
        details: error.message,
      });
    }
  }

  // Login
  async login(request, response) {
    try {
      const { email, password } = request.body;

      // Buscar usuario
      const user = await UserModel.findByEmail(email);
      if (!user) {
        return response.status(401).json({
          error: ERROR_MESSAGES.INVALID_CREDENTIALS,
        });
      }

      // Verificar contraseña
      const isValidPassword = await UserModel.comparePassword(
        password,
        user.password
      );

      if (!isValidPassword) {
        return response.status(401).json({
          error: ERROR_MESSAGES.INVALID_CREDENTIALS,
        });
      }

      return response.status(200).json({
        message: "Login exitoso",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          company: user.company,
        },
      });
    } catch (error) {
      return response.status(500).json({
        error: "Error al iniciar sesión",
        details: error.message,
      });
    }
  }
}

export default new AuthController();
