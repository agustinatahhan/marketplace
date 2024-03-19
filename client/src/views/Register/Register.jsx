import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import style from "../Login/Login.module.css";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
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
        await axios.post(`http://localhost:3000/users/register`, form);
        navigate("/login");

    } catch (error) {
        console.log(error);
    }
  };

  return (
    <div className={style.mainContent}>
      <section className={style.formRegister}>
        <p>REGISTRATE</p>

        <form onSubmit={handleSubmit}>
          <input
            className={style.ctrl}
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Nombre"
            onChange={(event) => handleChange(event)}
            required
          />
          <input
            className={style.ctrl}
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Apellido"
            onChange={(event) => handleChange(event)}
            required
          />
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
          <button className={style.btn} type="submit">
            Registrate
          </button>
          <p>
            Ya tienes una cuenta? <NavLink to="/login">Ingresá aquí</NavLink>
          </p>
        </form>
      </section>
    </div>
  );
};

export default Register;
