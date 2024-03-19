import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./CreateProduct.module.css";
import axios from "axios";

const CreateProduct = ({ handleClose, setShowCreate, setShowBackdropCreate }) => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
      name: "",
      description: "",
      price: 0, 
      quantity: 0, 
      sizes: [], 
      img: null, // Nuevo estado para la imagen
    });
  
    const handleChange = (event) => {
      const { name, value, type, checked, files } = event.target;
      const newValue = type === "checkbox" ? (checked ? [...form.sizes, value] : form.sizes.filter(size => size !== value)) : (type === "file" ? files[0] : value);
      setForm((prevForm) => ({
        ...prevForm,
        [name]: newValue,
      }));
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("price", form.price);
        formData.append("quantity", form.quantity);
        formData.append("sizes", JSON.stringify(form.sizes));
        formData.append("img", form.img);
  
        await axios.post(`http://localhost:3000/create`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
  
        setShowBackdropCreate(false);
        setShowCreate(false);
        navigate("/admin");
      } catch (error) {
        console.error("Error al crear el producto:", error);
      }
    };

  return (
    <div>
      <form className={style.formContainer} onSubmit={handleSubmit}>
        <div className={style.formBox}>
          <h2>Crear Producto</h2>
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
            {['S', 'M', 'L', 'XL'].map((size) => (
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
            <input type="file" name="img" id="img" onChange={handleChange} />
          </div>
        </div>
        <div className={style.btnContainer}>
          <button className={style.btn} onClick={handleClose}>
            Cancelar
          </button>
          <button className={style.btn} type="submit">
            Crear
          </button> 
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;
