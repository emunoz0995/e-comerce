import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';
import '../assets/css/home.css'
import SearchForm from '../companents/SearchForm';

const Home = () => {

    const dispatch = useDispatch();
    const products = useSelector(state => state.products);

    useEffect(() => {

        dispatch(getProductsThunk());
    }, [])
    return (
        <div className="products-container">
            <div className="search-form">
                <SearchForm />
            </div>
            <ul className="products-list">
                {products.map(product => (
                    <li key={product.id}>
                        <div className="product-card">
                            <Link to={`/product/${product.id}`} >
                                <div className="image">
                                    <img src={product.productImgs[0]} />
                                    <img className='over' src={product.productImgs[1]} />
                                </div>
                                <div className="info">
                                    <h3>{product.title}</h3>
                                    <p className='price'>Price</p>
                                    <h3 className='amount'>${product.price}</h3>
                                    <button className='cart-button btn btn-lg btn-primary'>
                                        <i className="fa-solid fa-cart-plus"></i>
                                    </button>
                                </div>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;