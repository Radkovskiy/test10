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
          allProducts={products}
          onCloseModal={toggleModal}
          onChange={changeFilter} />}
    </div>
  );
}

export default App;






/* 
🔴 Запросы не работают, по ходу, из-за бека, из-за этого я попытался 
    имитировать корзину через куки;
      При пост запросе, мне возвращается тот объект, который и должен, 
    то есть, пост запросы работают, но при гет запросе на корзину, 
    всегда возвращает пустой массив, при том, что адрес запроса я 
    указываю, как в тз и статус ответа ок200
🔴 Поскольку корзина работает на куках, то при удалении товара, нужно 
    обновлять страничку, что бы отрендеривался массив без удаленного 
    объекта. А если удалить все продукты из корзины, то в корзину 
    рендерятся объекты, что они не имеют модели. То есть поскольку 
    куки есть, но пустые, то программа думает, что нужно отрендерить 
    все объекты, в свойстве model которых пусто. 
🔴 Количество по дабл клику. 
*/
