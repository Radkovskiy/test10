import { useEffect, useState } from "react";
import styled from "styled-components"
import SearchBar from "../SearchBar/SearchBar";
import { get_selected_products, patch_product } from "../../api/api";

const BackDrop = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  padding-bottom: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
`
const Modal = styled.div`
  max-width: 80%;
  min-width: 40%;
  height: 90vh;
  padding: 50px;
  border-radius: 8px;

  background-color: var(--background-color);
  color: var(--primary-color);
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
const ProductList = styled.ul`
    display: flex;
    flex-wrap:wrap;
    justify-content: center;
    gap: 10px;
`
const ProductItem = styled.li`
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    width: 300px;
    min-height: 493px;
    border: 1px solid darkgray;
    border-radius: 10px;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
`
const ImgWrapp = styled.div`
    min-height: 63%;
    display: flex;
    align-items: center;
`
const ProductImg = styled.img`
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    border-radius: 10px;
    margin-bottom: 10px;
`
const DescAndBtnContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    width: 100%;
    height: 37%;
`
const ProductDescription = styled.div`
    width: 85%;
    margin-top: auto;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
`
const DelBtn = styled.button`
    margin-right: auto;
    margin-left: auto;
    width: 60%;
    transition: var(--cubic-animation);
    
    &:hover,
    &:focus {
        box-shadow: 0px 3px 1px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.08), 0px 2px 2px rgba(0, 0, 0, 0.12);
        scale: 1.04;
}
`

const SelectedProductsModal = ({ onCloseModal }) => {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [filter, setFilter] = useState('')
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

    useEffect(() => {
        getSelectedProducts()
    }, []);

    const getSelectedProducts = async () => {
        try {
            const { data } = await get_selected_products()
            setSelectedProducts(data)
        } catch (error) {
            console.log(error);
        }
    }

    const handleClick = (e) => {
        if (e.currentTarget === e.target) {
            onCloseModal()
        }
    }

    const deleteProduct = async (model) => {
        fetch('https://api.xpro.com.ua/product', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                test_id: '10',
                model
            }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                getSelectedProducts()
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    const toggleEditingQuantity = (id) => {
        setEditingItem((prevEditingItem) =>
            prevEditingItem === id ? null : id
        );
    };
    const changeQuantity = async (e, model) => {
        const quantity = e.currentTarget.value
        if (quantity <= 0) return

        try {
            await patch_product({
                quantity, model
            });
            getSelectedProducts()
        } catch (error) {
            console.log(error);
        }

    }

    const changeFilter = e => {
        setFilter(e.currentTarget.value)
    }

    const getVisibleProducts = () => selectedProducts?.filter(product =>
        product.product_info.name.toLowerCase().includes(filter.toLowerCase())
    )
    const visibleProducts = getVisibleProducts()

    return (
        <BackDrop onClick={handleClick}>
            <Modal>
                <SearchBar
                    value={filter}
                    onChange={changeFilter} />
                {selectedProducts.length === 0 && <h3>Кошик порожній</h3>}
                <ProductList>
                    {visibleProducts?.map(({ selected_product_id, quantity, product_info: { name, model, sell_price, original_price, photo } }) =>
                        <ProductItem key={selected_product_id}>
                            <ImgWrapp>
                                <ProductImg src={photo} alt={name} width={'200'} />
                            </ImgWrapp>
                            <DescAndBtnContainer>
                                <ProductDescription>
                                    <h3>{name}</h3>
                                    <p>Модель: {model}</p>
                                    <p>Ціна покупки: {original_price}€</p>
                                    <p>Ціна продажу: {sell_price}€</p>
                                    <p onDoubleClick={() => toggleEditingQuantity(selected_product_id)}>
                                        Кількість: {editingItem === selected_product_id ?
                                            <input
                                                pattern="[0-9]*"
                                                type="number"
                                                placeholder={`${quantity}`}
                                                onBlur={(e) => {
                                                    toggleEditingQuantity(selected_product_id)
                                                    changeQuantity(e, model)
                                                }}
                                            /> : quantity}
                                    </p>
                                </ProductDescription>
                                <DelBtn className="button" onClick={() => deleteProduct(model)}>Видалити</DelBtn>
                            </DescAndBtnContainer>
                        </ProductItem>)}
                </ProductList>
            </Modal>
        </BackDrop>
    )
}

export default SelectedProductsModal