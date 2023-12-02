import { useState } from 'react';
import styled from 'styled-components';
import { post_products } from '../../api/api';

const ProductList = styled.ul`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;
const ProductItem = styled.li`
    display: flex;
    flex-wrap: wrap;
    /* justify-content: flex-end; */
    align-content: space-between;
    width: 300px;
    min-height: 493px;
    border: 1px solid darkgray;
    border-radius: 10px;
    padding: 10px;
    margin-top: 10px;
    margin-bottom: 10px;
    transition: 250ms cubic-bezier(0.4, 0, 0.2, 1);

   &:hover,
   &:focus {
     box-shadow: 0px 3px 1px rgba(0, 0, 0, 0.1), 0px 1px 2px rgba(0, 0, 0, 0.08), 0px 2px 2px rgba(0, 0, 0, 0.12);
     scale: 1.04;
   }
`;
const ImgWrapp = styled.div`
    min-height: 63%;
    display: flex;
    align-items: center;
`
// REA-U6678 самый высокий
const ProductImg = styled.img`
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    border-radius: 10px;
    margin-bottom: 10px;

`
const DescAndBtnContainer = styled.div`
    width: 100%;
`
const ProductDescription = styled.div`
    width: 85%;
    margin-top: auto;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
`
const BtnAdd = styled.button`
    width: 100%;
    /* margin-top: auto; */
`


const Cards = ({ cardsArr }) => {
    const [visibleCards, setVisibleCards] = useState(20);


    const postProducts = async (model) => {
        try {
            await post_products({ model })
        } catch (error) {
            console.log(error);
        }
    }

    const showMoreCards = () => {
        setVisibleCards((prevVisibleCards) => prevVisibleCards + 20);
    };
    console.log('visibleCards % 20 :>> ', visibleCards % 20);
    console.log('cardsArr.length :>> ', cardsArr.length);

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
                            <ImgWrapp>
                                <ProductImg src={photo} alt={name} width={'200'} />
                            </ImgWrapp>
                            <DescAndBtnContainer>
                                <ProductDescription>
                                    <h3>{name}</h3>
                                    <p>Модель: {model}</p>
                                    <p>Ціна покупки: {original_price}€</p>
                                    <p>Ціна продажу: {sell_price}€</p>
                                    <p>Кількість на складі: {quantity_total}</p>
                                </ProductDescription>
                                <BtnAdd className='button card_button' onClick={() => postProducts(model)}>
                                    Додати до кошика
                                </BtnAdd>
                            </DescAndBtnContainer>
                        </ProductItem>
                    )
                )}
            </ProductList>
            {<button className='button paginal_btn' onClick={showMoreCards}>Показати ще 20</button>}
        </>
    );
};

export default Cards;
