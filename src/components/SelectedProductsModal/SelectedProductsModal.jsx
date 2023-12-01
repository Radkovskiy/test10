import { useEffect, useState } from "react";
import styled from "styled-components"
import SearchBar from "../SearchBar/SearchBar";
import { delete_product, get_selected_products } from "../../api/api";
import Cookies from "js-cookie";

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  /* width: 100%; */
  /* height: 100%; */
  /* padding-top: 200px; */
  padding-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
`
const Modal = styled.div`
  /* position: fixed; */
  /* top: 10px; */
  /* bottom: 10px; */
  max-width: calc(100vw - 48px);
  height: 90vh;
  padding: 50px;
  border-radius: 8px;
  background-color: #fff;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 12px;
    background: rgba(5, 5, 5, 0.18);
  }
`
const ProductItem = styled.li`
    width: 500px;
    border: 1px solid darkgray;
    border-radius: 10px;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const SelectedProductsModal = ({ allProducts, onCloseModal }) => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [filter, setFilter] = useState('')
    const [editingItem, setEditingItem] = useState(null);
    const [toggleState, setToggleState] = useState(true);

    useEffect(() => {
        const handleKeyEsc = event => {
            if (event.code === 'Escape') {
                onCloseModal();
            }
        };

        window.addEventListener('keydown', handleKeyEsc);
        document.body.style.overflow = 'hidden';

        return () => {
            window.removeEventListener('keydown', handleKeyEsc);
            document.body.style.overflow = 'auto';
        };
    }, [onCloseModal]);

    useEffect(() => {
        getSelectedProductsFromCookies()
        // getSelectedProducts()


    }, [toggleState]);

    const getSelectedProductsFromCookies = () => {
        const modelsProducts = Cookies.get('selectedProducts')?.split(',');
        const isArrayHasValues = modelsProducts && modelsProducts.some(model => model !== '');
        /* 
        проверить на пустой массив не выйдет, ибо там постоянно есть хотя 
        бы один элемент — [""], а массив сравнивается не по значению, а по ссылке. 
        */
        if (isArrayHasValues) {
            const trueProducts = allProducts.filter(product =>
                modelsProducts.includes(product.model));

            setSelectedProducts(trueProducts);
        }
    }

    const getSelectedProducts = async () => {
        try {
            const { data } = await get_selected_products()
            // console.log('GET selected :>> ', data);
            // setSelectedProducts(data)
        } catch (error) {
            console.log(error);
        }
    }

    const removeProduct = (deleteModel) => {
        const modelsProducts = Cookies.get('selectedProducts');
        if (!modelsProducts) {
            return;
        }

        const updatedModelsProducts = modelsProducts
            .split(',')
            .filter(model => model !== deleteModel)
            .join(',');

        Cookies.set('selectedProducts', updatedModelsProducts);

        setToggleState(p => !p) // тоглю стейт, что бы срабатывал юзефект
    }



    const handleClick = (e) => {
        if (e.currentTarget === e.target) {
            onCloseModal()
        }
    }

    // const filterProducts = ()



    const deleteProduct = (model) => {
        delete_product(model)
    }

    const toggleEditingQuantity = (id) => {
        setEditingItem((prevEditingItem) =>
            prevEditingItem === id ? null : id
        );
        console.log('id :>> ', id);
    };
    // console.log('selectedProducts :>> ', selectedProducts);

    const changeFilter = e => {
        setFilter(e.currentTarget.value)
    }

    const getVisibleProducts = () => selectedProducts.filter(product =>
        product.name.toLowerCase().includes(filter.toLowerCase())
    )
    const visibleProducts = getVisibleProducts()

    return (
        <BackDrop onClick={handleClick}>
            <Modal>
                <SearchBar
                    value={filter}
                    onChange={changeFilter} />
                {selectedProducts.length === 0 && <h3>Кошик порожній</h3>}
                <ul>
                    {visibleProducts?.map(({ product_id, name, model, sell_price, original_price, photo, quantity }) =>
                        <ProductItem key={product_id}>
                            <img src={photo} alt={name} width={'200'} />
                            <h3>{name}</h3>
                            <p>Модель: {model}</p>
                            <p>Ціна покупки: {original_price}€</p>
                            <p>Ціна продажу: {sell_price}€</p>
                            <p onDoubleClick={() => toggleEditingQuantity(product_id)}>
                                Кількість: {editingItem === product_id ?
                                    <input
                                        pattern="[0-9]*"
                                        type="number"
                                        placeholder={`${quantity}`}
                                        onBlur={() => toggleEditingQuantity(product_id)}
                                    /> : quantity}
                            </p>
                            <button className="button" onClick={() => removeProduct(model)}>Видалити</button>
                        </ProductItem>)}
                </ul>
            </Modal>
        </BackDrop>
    )
}

export default SelectedProductsModal