import { useEffect, useState } from "react";
import styled from "styled-components"
import SearchBar from "../SearchBar/SearchBar";

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 200px;
  padding-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1200;
  /* overflow-y: scroll; */
`

const Modal = styled.div`
  position: fixed;
  top: 10px;
  bottom: 10px;
  /* transform: translate(-50%, -50%); */
  max-width: calc(100vw - 48px);
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

const SelectedProductsModal = ({ selectedProducts, onCloseModal, onRemoveProduct }) => {
    const [editingItem, setEditingItem] = useState(null);

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

    const handleClick = (e) => {
        if (e.currentTarget === e.target) {
            onCloseModal()
        }
    }

    // const filterProducts = ()

    const removeProduct = (id, model) => {
        onRemoveProduct(id, model)
    }

    const toggleEditingQuantity = (id) => {
        setEditingItem((prevEditingItem) =>
            prevEditingItem === id ? null : id
        );
        console.log('id :>> ', id);
    };
    console.log('selectedProducts :>> ', selectedProducts);

    return (
        <BackDrop onClick={handleClick}>
            <Modal>
                <SearchBar />
                {selectedProducts.length === 0 && <h3>Кошик порожній</h3>}
                <ul>
                    {selectedProducts?.map(({ product_id, name, model, sell_price, original_price, photo, quantity }) =>
                        <li key={product_id}>
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
                            <button className="button" onClick={() => removeProduct(`${product_id}`, model)}>Видалити</button>
                        </li>)}
                </ul>
            </Modal>
        </BackDrop>
    )
}

export default SelectedProductsModal