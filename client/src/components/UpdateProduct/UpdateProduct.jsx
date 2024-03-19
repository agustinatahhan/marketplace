import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./UpdateProduct.module.css";
import axios from "axios";
const UpdateProduct = ({
  product,
  setShowBackdrop,
  setShowUpdate,
  handleClose,
}) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: product?.name || "",
    price: product?.price || 0,
    sizes: product?.sizes || [],
    description: product?.description || "",
    quantity: product?.quantity || 0,
  });

  useEffect(() => {
    setForm({
      name: product?.name || "",
      price: product?.price || 0,
      sizes: product?.sizes || [],
      description: product?.description || "",
      quantity: product?.quantity || 0,
    });
  }, [product]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]:
        type === "checkbox"
          ? checked
            ? [...prevForm.sizes, value]
            : prevForm.sizes.filter((size) => size !== value)
          : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:3000/edit/${product.id}`, form);
      setShowBackdrop(false);
      setShowUpdate(false);
      navigate("/admin");
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  return (
    <div>
      <form className={style.formContainer} onSubmit={handleSubmit}>
        <div className={style.formBox}>
          <h2>Editar Producto</h2>
          <div>
            <input
              className={style.ctrl}
              type="text"
              name="name"
              placeholder="Nombre del producto"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              type="text"
              className={style.ctrl}
              name="description"
              placeholder="Descripción del producto"
              value={form.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              className={style.ctrl}
              type="number"
              name="price"
              placeholder="Precio"
              value={form.price}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <input
              className={style.ctrl}
              type="number"
              name="quantity"
              min="1"
              max="10"
              placeholder="Cantidad"
              value={form.quantity}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            {["S", "M", "L", "XL"].map((size) => (
              <label key={size}>
                <input
                  type="checkbox"
                  name="sizes"
                  value={size}
                  checked={form.sizes.includes(size)}
                  onChange={handleChange}
                />{" "}
                {size}
              </label>
            ))}
          </div>
          <div>
            <p>Imagen:</p>
            {/* <img
              alt="Imagen actual del producto"
              width="100px"
              src={`/img/${product.img}`}
            /> */}
            <input type="file" name="img" id="img" />
          </div>
          <div className={style.btnContainer}>
            <button className={style.btn} onClick={handleClose}>
              Cancelar
            </button>
            <button className={style.btn} type="submit">
              Editar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
