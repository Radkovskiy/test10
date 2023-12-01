import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { post_products } from '../../api/api';
import Cookies from 'js-cookie';

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

const Cards = ({ cardsArr }) => {
    const [visibleCards, setVisibleCards] = useState(20);


    const postProducts = async (model) => {
        const savedProducts = Cookies.get('selectedProducts') ? Cookies.get('selectedProducts').split(',') : []
        if (!savedProducts?.includes(model)) {
            Cookies.set('selectedProducts', [...savedProducts, model].join(','))
        }
        console.log('savedProducts :>> ', savedProducts);

        try {
            /* const { data } =  */await post_products({ model })

        } catch (error) {
            console.log(error);
        }
    }

    const showMoreCards = () => {
        setVisibleCards((prevVisibleCards) => prevVisibleCards + 20);
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
                            <button className='button card_button' onClick={() => postProducts(model)}>
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
