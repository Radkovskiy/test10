import { useEffect, useState } from "react";

import { get_products_all } from "../api/api";
import Cards from "./Cards/Cards";
import SearchBar from "./SearchBar/SearchBar";
import SelectedProductsModal from "./SelectedProductsModal/SelectedProductsModal";




function App() {
  const [products, setProducts] = useState([]);
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

  const getVisibleProducts = () => products.filter(product =>
    product.name.toLowerCase().includes(filter.toLowerCase())
  )
  const visibleProducts = getVisibleProducts()

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
        cardsArr={visibleProducts} />
      {openModal &&
        <SelectedProductsModal
          onCloseModal={toggleModal}
          onChange={changeFilter} />}
    </div>
  );
}

export default App;






/* 
🔴 DELETE запрос
🔴 Количество по дабл клику. 
*/
