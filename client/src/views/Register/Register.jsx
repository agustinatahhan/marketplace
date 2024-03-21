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
    img: null,
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar campos antes de enviar el formulario
    const errors = {};
    if (!form.firstName) {
      errors.firstName = "Por favor, ingresa tu nombre.";
    }
    if (!form.lastName) {
      errors.lastName = "Por favor, ingresa tu apellido.";
    }
    if (!form.email) {
      errors.email = "Por favor, ingresa tu correo electrónico.";
    }
    if (!form.password) {
      errors.password = "Por favor, ingresa tu contraseña.";
    }
    // Validar otros campos según sea necesario

    // Si hay errores, actualizar el estado y detener el envío del formulario
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("firstName", form.firstName);
      formData.append("lastName", form.lastName);
      formData.append("email", form.email);
      formData.append("password", form.password);
      formData.append("img", form.img);
      await axios.post(`http://localhost:3000/users/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
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
          />
          {errors.firstName && <p className={style.errorMsg}>{errors.firstName}</p>}
          <input
            className={style.ctrl}
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Apellido"
            onChange={(event) => handleChange(event)}
          />
          {errors.lastName && <p className={style.errorMsg}>{errors.lastName}</p>}
          <input
            className={style.ctrl}
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            onChange={(event) => handleChange(event)}
          />
          {errors.email && <p className={style.errorMsg}>{errors.email}</p>}
          <input
            className={style.ctrl}
            type="password"
            id="password"
            name="password"
            placeholder="Contraseña"
            onChange={(event) => handleChange(event)}
          />
          {errors.password && <p className={style.errorMsg}>{errors.password}</p>}
          <div>
            <p>Imagen:</p>
            <input type="file" name="img" id="img" onChange={handleChange} />
          </div>
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

