import React, { useEffect, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { chekOutCartThunk, getCartThunk } from '../store/slices/cart.slice';
import '../assets/css/cart.css';


const Cart = ({ show, handleClose }) => {

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart)

    useEffect(() => {
        dispatch(getCartThunk());
    }, [])

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        let total = 0;
        cart.forEach(product => {
            total += product.price * product.productsInCart.quantity;
        });
        setTotalPrice(total);
    }, [cart])



    return (
        <div>
            <>
                <Offcanvas placement='end'
                    show={show} onHide={handleClose} >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <ul>
                            {cart.map(item => (
                                <li key={item.id} className='cart-container'>
                                    <Link >
                                        <div className="button-brand">
                                            <p><b>{item.brand} </b> </p>
                                            <button><i className="fa-solid fa-trash-can"></i></button>
                                        </div>
                                        <p><b>{item.title} </b></p>
                                        <div className="price-quiantity">
                                            <p>{item.productsInCart.quantity}</p>
                                            <p><b>Total:</b> ${item.price}</p>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </Offcanvas.Body>
                    <div className='canvas-footer'>
                        <div className="total-cart">
                            <p>Total:</p>
                            <p>$ {totalPrice}</p>
                        </div>
                        <button onClick={() => dispatch(chekOutCartThunk())} className="btn btn-primary">Checkout</button>
                    </div>
                </Offcanvas>
            </>
        </div>
    );
};

export default Cart; 