import { useEffect, useState } from "react";

import { delete_product, get_products_all, post_products_all } from "../api/api";
import Cards from "./Cards/Cards";
import SearchBar from "./SearchBar/SearchBar";
import SelectedProductsModal from "./SelectedProductsModal/SelectedProductsModal";




function App() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [filter, setFilter] = useState('')
  const [openModal, setOpenModal] = useState(false);




  useEffect(() => {
    getProductsAll()
  }, []);

  const getProductsAll = async () => {
    try {
      const { data } = await get_products_all()
      setProducts(data)

    } catch (error) {
      console.log(error);
    }
  }

  const changeFilter = e => {
    setFilter(e.currentTarget.value)
  }

  console.log('products :>> ', products);

  const getVisibleProducts = () => products.filter(product =>
    product.name.toLowerCase().includes(filter.toLowerCase())
  )
  const visibleProducts = getVisibleProducts()


  // console.log('visibleSelectedProducts :>> ', visibleSelectedProducts);


  const getProductById = (id, model) => {
    const selectedProduct = products.find(({ product_id }) => product_id === id)
    const isProductAlreadyAdded = selectedProducts.find(({ product_id }) => product_id === id)

    if (isProductAlreadyAdded) {
      return
    }

    // cosnt { product_id, name, model, sell_price, photo } = selectedProduct;

    setSelectedProducts(prev => [...prev, {
      product_id: selectedProduct.product_id,
      name: selectedProduct.name,
      model: selectedProduct.model,
      sell_price: selectedProduct.sell_price,
      quantity: 0,
      photo: selectedProduct.photo
    }])
    post_products_all({ model })
  }

  const removeProduct = (id, model) => {
    setSelectedProducts(prev => prev.filter(({ product_id }) => product_id !== id))
    console.log('model :>> ', model);
    delete_product(10, model)
  }

  // const changeQuantity = (id, model, quantity) => {
  //   setSelectedProducts(prev => )
  // }


  const toggleModal = () => {
    setOpenModal(p => !p)
  }

  return (
    <div className="container">
      <SearchBar
        value={filter}
        onChange={changeFilter} />
      <button
        className="button"
        onClick={toggleModal}>Відкрити кошик
      </button>
      <Cards
        cardsArr={visibleProducts}
        addProduct={getProductById} />
      {openModal &&
        <SelectedProductsModal
          selectedProducts={selectedProducts}
          onCloseModal={toggleModal}
          onRemoveProduct={removeProduct}
          onChange={changeFilter} />}
    </div>
  );
}

export default App;






/* 
🔴POST
🔴PATH
🔴количество по дабл клику
🔴корзина
🔴цена евро/злотый
*/
