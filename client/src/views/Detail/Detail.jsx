import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import style from "./Detail.module.css";

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/products/detail/${id}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error al obtener los detalles del producto:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const sizesArray = product ? JSON.parse(product.sizes) : [];

  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={style.mainContent}>
      <div className={style.columnas}>
        <div className={style.columna}>
          <img className={style.imgDetalle} src={`/img/${product.img}`} />
        </div>
        <div className={style.columna}>
          <div className={style.contenedorOpciones}>
            <div className={style.formOpciones}>
              <h4 className={style.tituloProducto}>{product.name}</h4>
              <h4 className={style.price}>{product.price}</h4>
              <div className={style.cant}>
                <h4>Cantidad:</h4>
                <input
                  type="number"
                  min="1"
                  max={product.quantity}
                  placeholder="1"
                />
              </div>
              <div className="tallesContenedor">
                {Array.isArray(sizesArray) && sizesArray.length > 0 && (
                  <>
                    <h4>Talles:</h4>
                    {sizesArray.map((size, index) => (
                      <div className="talleBox" key={index}>
                        <h4>{size}</h4>
                      </div>
                    ))}
                  </>
                )}
              </div>
              <div className={style.promocionesBancarias}>
                <h4>
                  Promociones Bancarias{" "}
                  <i className="fa-solid fa-credit-card"></i>
                </h4>
                <h5>3 cuotas fijas de $16.700</h5>
                <h5>6 cuotas fijas de $8350</h5>
                <h5>12 cuotas fijas de $4200</h5>
              </div>
              <button className={style.btnDetail} type="submit">
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
