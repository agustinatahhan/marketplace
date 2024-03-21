import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import style from "./UserDashboard.module.css";
const UserDashboard = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const getUserDetail = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${id}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error al obtener los detalles del usuario:", error);
    }
  };

  useEffect(() => {
    getUserDetail(id);
  }, [id]);

  if (!user) {
    return <div>Cargando...</div>;
  }
  return (
    <main className={style.mainContent}>
      <h2>Bienvenido a Moda Mía</h2>
      <div className={style.profileBox}>
        <div className={style.imgContainer}>
          <img src={`http://localhost:3000/img/${user.img}`} alt="User image" />
        </div>
        <div>
          <p>
            Usuario:{" "}
            <span>
              {user.firstName} {user.lastName}
            </span>
          </p>
          <p>
            Email: <span className={style.email}>{user.email}</span>
          </p>
          <p>
            Tipo de Usuario: {user.client ? "Cliente" : "Administrador"}
          </p>
        </div>
      </div>
      <img src="" alt="" />
    </main>
  );
};

export default UserDashboard;
