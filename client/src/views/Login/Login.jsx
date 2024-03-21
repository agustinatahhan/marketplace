import style from "./Login.module.css";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/users/login`, form);
      const { success, userId } = response.data;
      if (success) {
        // Almacenar los datos de la sesión en el estado o contexto de la aplicación
        setSession(sessionData);

        // Redireccionar a la página de perfil del usuario
        navigate(`/users/${userId}`);
      } else {
        // Manejar el mensaje de error general aquí si es necesario
      }
    } catch (error) {
      alert("Credenciales inválidas. Por favor, inténtalo de nuevo.");
      console.log(error);
    }
  };

  return (
    <div className={style.mainContent}>
      <section className={style.formRegister}>
        <p>INICIAR SESIÓN</p>

        <form onSubmit={handleSubmit}>
          <input
            className={style.ctrl}
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={(event) => handleChange(event)}
          />
          {emailError && <p className={style.errorMsg}>{emailError}</p>}
          <input
            className={style.ctrl}
            type="password"
            id="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={(event) => handleChange(event)}
          />
          {passwordError && <p className={style.errorMsg}>{passwordError}</p>}
          <div>
            <input type="checkbox" name="rememberme" id="rememberme" />
            <label>Recordar mi sesión</label>
          </div>
          <div>
            <button className={style.btn} type="submit">
              Ingresar
            </button>
          </div>
        </form>
        <p>ó inicia sesión con:</p>
        <a href="">
          <i className="fa-brands fa-google"></i>
        </a>
        <a href="">
          <i className="fa-brands fa-facebook"></i>
        </a>
        <p>
          Aún no tienes cuenta?{" "}
          <NavLink to="/register">Registrate Aquí</NavLink>
        </p>
      </section>
    </div>
  );
};

export default Login;

