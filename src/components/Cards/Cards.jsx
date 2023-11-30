import { useState } from 'react';
import styled from 'styled-components';

const ProductList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;
const ProductItem = styled.li`
    width: 500px;
    border: 1px solid darkgray;
    border-radius: 10px;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
`;

const Cards = ({ cardsArr, addProduct }) => {
    const [visibleCards, setVisibleCards] = useState(20);


    const showMoreCards = () => {
        setVisibleCards((prevVisibleCards) => prevVisibleCards + 20);
    };

    const findProduct = (id, model) => {
        addProduct(id, model);
    };

    return (
        <>
            <ProductList>
                {cardsArr.slice(0, visibleCards).map(
                    ({
                        product_id,
                        name,
                        model,
                        sell_price,
                        original_price,
                        quantity_total,
                        photo,
                    }) => (
                        <ProductItem key={product_id}>
                            <img src={photo} alt={name} width={'200'} />
                            <div>
                                <h3>{name}</h3>
                                <p>Модель: {model}</p>
                                <p>Ціна покупки: {original_price}€</p>
                                <p>Ціна продажу: {sell_price}€</p>
                                <p>Кількість на складі: {quantity_total}</p></div>
                            <button className='button card_button' onClick={() => findProduct(`${product_id}`, model)}>
                                Додати
                            </button>
                        </ProductItem>
                    )
                )}
            </ProductList>
            <button className='button' onClick={showMoreCards}>Показать еще 20</button>
        </>
    );
};

export default Cards;
