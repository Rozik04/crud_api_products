import React, { useEffect, useState } from "react";
import { api } from "../../api";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 

const Home = ({ setCreateWindow, setCreateCategory, createProduct, updateProduct, setUpdateWindow, setUpdateProduct}) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/products")
      .then((res) => {
        setProduct(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    api.get("/categories").then((res) => {
      setCreateCategory(res.data);
    });
  }, []);

  useEffect(() => {
    if (createProduct) {
      const formattedProduct = {
        name: createProduct.name,
        price: parseFloat(createProduct.price),
        description: createProduct.description,
        img: createProduct.img,
        categoryId: parseInt(createProduct.categoryId),
      };
      api.post("/products", formattedProduct)
        .then((res) => {
          setProduct((prev) => ({
            ...prev,
            data: [...prev.data, res.data],
          }));
        })
        .catch((err) => {
          console.error("Error:", err);
        });
    }
  }, [createProduct]);

  useEffect(() => {
    if (updateProduct) {
      const formattedProduct = {
        name: updateProduct.name,
        price: parseFloat(updateProduct.price),
        description: updateProduct.description,
        img: updateProduct.img,
        categoryId: parseInt(updateProduct.categoryId),
      };
      api.put(`/products/${updateProduct.id}`, formattedProduct)
        .then((res) => {
          setProduct((prev) => ({
            ...prev,
            data: prev.data.map(item =>
              item.id === res.data.id ? res.data : item),
          }));
        })
        .catch((err) => {
          console.error("Error:", err);
        });
    }
  }, [updateProduct]);

  const handleDelete = (id) => {
    confirmAlert({
      title: "🗑️ Delete",
      message: "Do you want to delete this product?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            api.delete(`/products/${id}`)
              .then((res) => {
                setProduct((prev) => ({
                  ...prev,
                  data: prev.data.filter((item) => item.id !== id),
                }));
              })
              .catch((err) => {
                console.error("Error:", err);
              });
          },
        },
        {
          label: "No",
        },
      ],
    });
  };

  return (
    <div className="container mx-auto text-center mt-6">
      <h1 className="text-3xl font-bold mt-4 mb-6">Products</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => setCreateWindow(true)}
          className="font-bold text-2xl bg-gray-300 text-white w-[50px] h-[50px] rounded-full flex items-center justify-center shadow-sm hover:bg-gray-400 transition"
        >
          ➕
        </button>
      </div>

      {loading ? (
        <div className="text-xl font-semibold text-gray-500">Loading...</div>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {product?.data?.map((product) => (
            <div
              className="flex flex-col items-center gap-2 justify-center text-center w-[400px] h-[400px] bg-gray-200 shadow-lg p-4 rounded-xl"
              key={product.id}
            >
              <img
                className="w-[200px] h-[200px] rounded-md object-cover"
                src={product.img}
                alt="No img"
              />
              <h1 className="text-lg font-semibold">{product.name}</h1>
              <h2 className="text-md text-gray-600">${product.price}</h2>
              <p className="text-sm text-gray-500">{product.description}</p>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => {
                    setUpdateWindow(true);
                    setUpdateProduct(product);
                  }}
                  className="bg-sky-500 hover:bg-sky-600 text-white font-semibold py-1 shadow-lg px-4 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 shadow-lg px-4 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
