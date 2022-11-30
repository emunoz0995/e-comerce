import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getProductsThunk } from '../store/slices/products.slice';
import { getCartThunk } from '../store/slices/cart.slice';
import '../assets/css/product.css';
import Carousel from 'react-bootstrap/Carousel';
import axios from 'axios';



const ProductsDetail = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsThunk());
    }, [])

    const { id } = useParams();

    const productList = useSelector(state => state.products);

    const product = productList.find(productItem => productItem.id === Number(id))

    const relatedProducts = productList.filter(productsItem => productsItem.category.id === product.category.id)


    const [quantity, setQuantity] = useState ({})

    const addToCart = () =>{
        const item = { 
            id: product.id,
            quantity: quantity
        }
        axios.post('https://e-commerce-api.academlo.tech/api/v1/cart', item)
        .then(res => dispatch(getCartThunk()));

    }


    return (
        <div className='content'>
            <div className="produc-home">
                <Link to={'/'} >Home</Link>
                <li>{product?.title}</li>
            </div>
            <br />
            <div className='product-container'>
                <div className="col">
                    <div className="img-slide">
                        <Carousel>
                            {product?.productImgs.map(image => (
                                <Carousel.Item interval={10000}>
                                    <img src={image} style={{
                                        width:
                                            "200px"
                                    }} alt="" />
                                </Carousel.Item>
                            ))}
                        </Carousel>
                    </div>
                    <div className="img-preview">
                        {product?.productImgs.map(image => (
                            <img src={image} />
                        ))}
                    </div>

                </div>
                <div className="col-info">
                    <h3>{product?.title}</h3>
                    <p>{product?.description}</p>
                    <div className="price">
                        <div className="item">
                            <p>Price</p>
                            <h3>${product?.price}</h3>
                        </div>
                        <div className="item">
                            <p>Quantity</p>
                            <div className="button-quantity">
                                <button>-</button>
                                <input type="text" name="" id="" value={quantity} onChange={e => setQuantity(e.target.value)} />
                                <button>+</button>
                            </div>
                        </div>
                    </div>
                    <div className="add-cart">
                        <button onClick={addToCart} className='btn btn-lg btn-primary'>Add to cart <i className="fa-solid fa-cart-shopping"></i></button>
                    </div>
                </div>
            </div>
            <div className='related-product'>
                <h3>Discover similar items</h3>
                <ul className="products-list">
                    {relatedProducts.map(related => (
                        <li key={related.id}>
                            <div className="product-card">
                                <Link to={`/product/${related.id}`} >
                                    <div className="image">
                                        <img src={related.productImgs[0]} />
                                        <img className='over' src={related.productImgs[1]} />
                                    </div>
                                    <div className="info">
                                        <h3>{related.title}</h3>
                                        <p className='price'>Price</p>
                                        <h3 className='amount'>${related.price}</h3>
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

        </div>
    );
};

export default ProductsDetail;