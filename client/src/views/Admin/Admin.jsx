import style from "./Admin.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import UpdateProduct from "../../components/UpdateProduct/UpdateProduct";
import CreateProduct from "../../components/CreateProduct/CreateProduct";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showBackdropCreate, setShowBackdropCreate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getUsers();
    getProducts();
    fetchCategories();
  }, []);

  const productsQuantity = products.length;
  const usersQuantity = users.length;
  const categoriesQuantity = categories.length;

  const [productsPerPage] = useState(5);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products?.length / productsPerPage);
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/");
      setProducts(response.data);
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3000/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const deleted = await axios.delete(`http://localhost:3000/delete/${id}`);
      if (deleted.status === 200) {
        getProducts();
      }
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  };

  const getProductDetail = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/products/detail/${id}`
      );
      setSelectedProduct(response.data);
    } catch (error) {
      console.error("Error al obtener los detalles del producto:", error);
    }
  };

  const handleCreate = (event) => {
    event.preventDefault();
    setShowCreate(true);
    setShowBackdropCreate(true);
  };

  const handleUpdate = (event, id) => {
    event.preventDefault();
    setShowUpdate(true);
    setShowBackdrop(true);
    getProductDetail(id);
  };

  const handleClose = () => {
    setShowUpdate(false);
    setShowBackdrop(false);
    setShowCreate(false);
    setShowBackdropCreate(false);
  };
  const getLastUser = () => {
    if (users.length > 0) {
      return users[users.length - 1];
    }
    return null;
  };

  const getLastProduct = () => {
    if (products.length > 0) {
      return products[products.length - 1];
    }
    return null;
  };

  const getLastCategory = () => {
    if (categories.length > 0) {
      return categories[categories.length - 1];
    }
    return null;
  };

  const contarProductosPorCategoria = (categoria) => {
    return products.filter(producto =>
      producto.categories.some(cat => cat.name === categoria)
    ).length;
  };
  return (
    <>
      <div className={style.view}>
        <div className={style.content}>
          <button
            className={style.buttonCreate}
            onClick={(event) => {
              handleCreate(event);
            }}
          >
            <i className="fa-solid fa-plus fa-sm"></i> Crear Producto
          </button>
          <h3>Productos:</h3>
          <h4>
            Cantidad de productos: <span>{productsQuantity}</span>
          </h4>
          <h4>Cantidad de productos por categoría:</h4>
          <ul>
            <li>Blusas: {contarProductosPorCategoria('Blusas')}</li>
            <li>Abrigos: {contarProductosPorCategoria('Abrigos')}</li>
            <li>Pantalones: {contarProductosPorCategoria('Pantalones')}</li>
            <li>Vestidos: {contarProductosPorCategoria('Vestidos')}</li>
          </ul>
          <h4>
            Último producto registrado:{" "}
            <span>{getLastProduct() ? getLastProduct().name : "N/A"}</span>
          </h4>

          <table className={style.productTable}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Talles</th>
                <th>Descripción</th>
                <th>Editar</th>
                <th>Borrar</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(products) && products.length > 0 ? (
                currentProducts?.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.sizes}</td>
                    <td>{product.description}</td>
                    <td>
                      <button
                        className={style.buttons}
                        onClick={(event) => handleUpdate(event, product?.id)}
                      >
                        <i className="fa-solid fa-pen fa-lg"></i>
                      </button>
                    </td>
                    <td>
                      <button
                        className={style.buttons}
                        onClick={() => deleteProduct(product.id)}
                      >
                        <i className="fa-solid fa-trash fa-lg"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">No hay productos disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
          {totalPages < 2 ? (
            <div style={{ height: "5rem" }}></div>
          ) : (
            <div className={style.pagination}>
              <button
                className={style.paginationButton}
                disabled={currentPage === 1}
                onClick={() => paginate(currentPage - 1)}
              >
                <h1>{"<"}</h1>
              </button>

              <h3 className={style.pag}>{`${currentPage}/${totalPages}`}</h3>

              <button
                className={style.paginationButton}
                disabled={currentPage === totalPages}
                onClick={() => paginate(currentPage + 1)}
              >
                <h1>{">"}</h1>
              </button>
            </div>
          )}
        </div>
        <div className={style.content}>
          <h3>Usuarios:</h3>
          <h4>
            Cantidad de usuarios registrados: <span>{usersQuantity}</span>
          </h4>
          <h4>
            Último usuario registrado:{" "}
            <span>
              {getLastUser()
                ? `${getLastUser().firstName} ${getLastUser().lastName}`
                : "N/A"}
            </span>
          </h4>
          <table className={style.productTable}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(users) ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No hay usuarios disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className={style.content}>
          <h3>Categorías:</h3>
          <h4>
            Cantidad de categorías registradas:{" "}
            <span>{categoriesQuantity}</span>
          </h4>
          <h4>
            Último categoría registrado:{" "}
            <span>
              {getLastCategory() ? `${getLastCategory().name}` : "N/A"}
            </span>
          </h4>
          <table className={style.productTable}>
            <thead>
              <tr>
                <th>Nombre</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(categories) ? (
                categories.map((category) => (
                  <tr key={category.id}>
                    <td>{category.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3">No hay categorías disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {showUpdate && (
        <div className={style.popup}>
          <div className={style.containerBtn}>
            <UpdateProduct
              setShowBackdrop={setShowBackdrop}
              setShowUpdate={setShowUpdate}
              handleClose={handleClose}
              product={selectedProduct}
            />
          </div>
        </div>
      )}
      {showBackdrop && <div className={style.backdrop} />}
      {showCreate && (
        <div className={style.popup}>
          <div className={style.containerBtn}>
            <CreateProduct
              setShowBackdropCreate={setShowBackdropCreate}
              setShowCreate={setShowCreate}
              handleClose={handleClose}
            />
          </div>
        </div>
      )}
      {showBackdropCreate && <div className={style.backdrop} />}
    </>
  );
};

export default Admin;
