import React, { useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCartThunk } from '../store/slices/cart.slice';
import '../assets/css/cart.css';
const Cart = ({ show, handleClose }) => {

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart)

    useEffect(() => {
        dispatch(getCartThunk());
    }, [])

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
                                <li className='cart-container'>
                                    <Link  key={item.id}>
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
                            <p>$ 25000</p>
                        </div>
                        <button className="btn btn-primary">Checkout</button>
                    </div>
                </Offcanvas>
            </>
        </div>
    );
};

export default Cart;