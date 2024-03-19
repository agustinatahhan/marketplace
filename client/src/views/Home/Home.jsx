import style from "./Home.module.css";
import { useState, useEffect } from 'react';
import axios from "axios";
import slider1 from "../../../../server/src/public/img/slider1.jpg";
import slider2 from "../../../../server/src/public/img/slider2.jpg";
import slider3 from "../../../../server/src/public/img/slider3.jpg";
import slider4 from "../../../../server/src/public/img/slider4.jpg";
import { NavLink } from "react-router-dom";

const Home = () => {
    const [listProducts, setListProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/');
      setListProducts(response.data);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  };

  // const deleteProduct = async (id) => {
  //   try {
  //     const response = await axios.delete(`http://localhost:3000/delete/${id}`);
  //     if (response.status === 200 || response.status === 204) {
  //       console.log('Producto eliminado correctamente');
  //     } else {
  //       console.log('La eliminación del producto falló');
  //     }
  //   } catch (error) {
  //     console.log('Error al eliminar el producto:', error);
  //   }
  // };
  
  // // const editProduct = async (id) => {
  // //   try {
  // //     const updated = await axios.put(`http://localhost:3000/edit/${id}`);
  // //   } catch (error) {
  // //     console.log(error);
  // //   }
  // // };
  return (
    <div className={style.homeContainer}>
      <main>
        <div className={style.sliderContainer}>
          <div className={style.sliderFrame}>
            <ul>
              <li>
                <img src={slider1} alt="slider" />
              </li>
              <li>
                <img src={slider2} alt="slider" />
              </li>
              <li>
                <img src={slider3} alt="slider" />
              </li>
              <li>
                <img src={slider4} alt="slider" />
              </li>
            </ul>
          </div>
        </div>
        <div className={style.mainCarrousel}>
          <div className={style.carrouselList}>
            <div className={style.carrouselTrack}>
            {Array.isArray(listProducts) ? (
                listProducts.map(product => (
                  <div className={style.carrousel} key={product.id}>
                    <div>
                      <NavLink to={`/products/detail/${product.id}`}>
                        <img src={product.img} alt={product.name} />
                        <h4>{product.name}</h4>
                        <h6>${product.price}</h6>
                      </NavLink>
                    </div>
                  </div>
                ))
              ) : (
                <p>No hay productos disponibles</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
