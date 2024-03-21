import style from "./Login.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setForm({
        ...form,
        [event.target.name] : event.target.value
    })    

  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/users/login`, form);
      const { success, userId } = response.data;
      if (success) {
        navigate(`/users/${userId}`);
      } else {
        console.log("No puedes entrar");
      }
    } catch (error) {
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
            onChange={(event) => handleChange(event)}
            required
          />
          <input
            className={style.ctrl}
            type="password"
            id="password"
            name="password"
            placeholder="Contraseña"
            onChange={(event) => handleChange(event)}
            required
          />
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
