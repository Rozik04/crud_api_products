import { useState } from 'react';
import CreateProduct from './components/createProduct/CreateProduct';
import Home from './components/home/Home';
import UpdateProduct from './components/updateProduct/UpdateProduct';

const App = () => {
  const [createWindow, setCreateWindow] = useState(false);
  const [createCategory, setCreateCategory] = useState(null);
  const [createProduct, setCreateProduct] = useState(null);
  const [updateWindow, setUpdateWindow] = useState(false);
  const [updateProduct, setUpdateProduct] = useState(null);

  return (
    <>
      <Home 
        setCreateWindow={setCreateWindow} 
        setCreateCategory={setCreateCategory} 
        createProduct={createProduct}
        setUpdateProduct={setUpdateProduct} 
        setUpdateWindow={setUpdateWindow}   
      />
      <CreateProduct 
        setCreateWindow={setCreateWindow} 
        createWindow={createWindow} 
        setCreateCategory={setCreateCategory} 
        createCategory={createCategory} 
        setCreateProduct={setCreateProduct}
      />
      <UpdateProduct 
        setUpdateWindow={setUpdateWindow} 
        updateWindow={updateWindow} 
        setUpdateProduct={setUpdateProduct} 
        updateProduct={updateProduct} 
        createCategory={createCategory}
      />    
    </>
  );
}

export default App;
