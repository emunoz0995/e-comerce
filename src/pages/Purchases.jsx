import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slice';
import '../assets/css/purchases.css';

const Purchases = () => {

    const dispatch = useDispatch();

    const purchases = useSelector(state => state.purchases)

    useEffect(() => {
        dispatch(getPurchasesThunk());
    }, [])

    const getFormateDate = (dateString) =>{
        const date = new Date(dateString);
        const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
        return date.toLocaleDateString(undefined, options);
    }


    console.log(purchases)
    return (
        <div className='purchases'>
            <div className="produc-home">
                <Link to={'/'} >Home</Link>
                <li> <b>Purchases</b> </li>
            </div>


            <ul >
                {purchases.map(purchase => (
                    <li className='purchases-container' key={purchase.id}>
                        <div className="shopping-day">
                                    <p>{getFormateDate(purchase.createdAt)}</p>
                                </div>
                        {purchase.cart?.products.map(product => (
                            <Link className='item-purchase' key={product.id} to={`/product/${product.id}`}>
                                <div className="details-purchases">
                                    <div className="purchase-title">
                                        <p>{product.title}</p>
                                    </div>

                                    <div className="purchase-quantity">
                                        <p>{product.productsInCart.quantity}</p>
                                    </div>
                                    <div className="purchase-price">
                                        <p>{product.price}</p>
                                    </div>
                                </div>

                            </Link>
                        ))}
                    </li>
                ))
                }
            </ul>

        </div>
    );
};

export default Purchases;