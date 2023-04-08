import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import { Alert } from "./Alert";

const Login = () => {
  const cartContext = useContext(CartContext);
  const { cartList } = cartContext;

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const { login, loginWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState();

  const handleChange = ({ target: { name, value } }) => {
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(user.email, user.password);
      cartList.length === 0 ? navigate("/") : navigate("/cart");
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        setError("Error: El usuario no existe");
      } else if (error.code === "auth/wrong-password") {
        setError("Error: La contraseña es incorrecta");
      } else if (error.code === "auth/user-disabled") {
        setError(
          "Error: Esta cuenta fue inhabilitada. Intente ingresar con otra cuenta o envíe un correo a joaquin.elia@hotmail.com"
        );
      } else if (error.code === "auth/invalid-email") {
        setError("Error: Correo inválido o no especificado");
      } else if (error.code === "auth/internal-error") {
        setError("Error: Verifique haber escrito su correo y contraseña");
      } else if (error.code === "auth/too-many-requests") {
        setError(
          "Error: El acceso a esta cuenta fue temporalmente inhabilitado debido a muchos intentos fallidos para inciar sesión. Puedes habilitarla cambiando la contraseña o puedes intentarlo más tarde."
        );
      } else {
        setError(error.message);
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      cartList.length === 0 ? navigate("/") : navigate("/cart");
    } catch (error) {
      if (error.code === "auth/user-disabled") {
        setError(
          "Error: esta cuenta fue inhabilitada. Intente ingresar con otra cuenta o envíe un correo a: joaquin.elia@hotmail.com"
        );
      } else {
        setError(error.message);
      }
    }
  };

  const handleResetPassword = async () => {
    if (!user.email) return setError("Error : Por favor ingresa tu correo");

    try {
      await resetPassword(user.email);
      setError(
        "Te hemos enviado un correo con el link para restablecer tu contraseña"
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container-login">
      {error && <Alert message={error} />}

      <form onSubmit={handleSubmit} className="form-container">
        <h2>Iniciar Sesión</h2>
        <div className="inputs">
          <label htmlFor="email">Correo</label>
          <input
            type="email"
            name="email"
            autoComplete="username"
            placeholder="youremail@gmail.com"
            onChange={handleChange}
          />
        </div>
        <div className="inputs">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
            placeholder="******"
            onChange={handleChange}
          />
        </div>
        <div className="container-send">
          <button className="btn-send">Ingresar</button>
          <a
            href="#!"
            className="forgot-password"
            onClick={handleResetPassword}
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </form>
      <div>
        <p className="go-login-register">
          ¿No tienes una cuenta?<Link to="/register"><button className="btn-send">Regístrate</button></Link>
        </p>
      </div>
      <button onClick={handleGoogleSignIn} className="btn-google">
        <i className="bi bi-google google-icon "></i>
        Login with Google
      </button>
    </div>
  );
};

export default Login;
