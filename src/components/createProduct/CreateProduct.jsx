import React, { useState } from 'react';

const CreateProduct = ({ setCreateProduct, setCreateWindow, createWindow, createCategory }) => {
  if (!createWindow) return null;

  const [productName, setProductName] = useState("");
  const [productImage, setProductImage] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const handleSave = () => {
    const newProduct = {
      name: productName,
      img: productImage,
      price: productPrice,
      description: productDescription,
      categoryId: categoryId,
    };
    setCreateProduct(newProduct);
    setCreateWindow(false);
  };

  return (
    <div className="fixed inset-0 bg-blue-100 flex items-center justify-center">
      <div className="bg-blue-200 p-6 rounded-lg shadow-lg w-[400px] text-center">
        <h2 className="text-xl font-bold mb-4">New Product</h2>
        <input
          className="border p-2 w-full mb-4"
          placeholder="Product Name"
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-4"
          placeholder="Product Image URL"
          type="text"
          value={productImage}
          onChange={(e) => setProductImage(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-4"
          placeholder="Product Price"
          type="text"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-4"
          placeholder="Product Description"
          type="text"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
        />
        <select
          className="border p-2 w-full mb-4"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="" disabled>
            Product Category
          </option>
          {createCategory?.data?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setCreateWindow(false)}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;
