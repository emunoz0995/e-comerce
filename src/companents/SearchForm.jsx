import axios from 'axios';

import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useDispatch } from 'react-redux';
import { filterPrice, filterProductsThunk, filterThunk, getProductsThunk } from '../store/slices/products.slice';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const SearchForm = () => {
    const [categoriesList, setCategoriesList] = useState([]);
    const [imputSearch, setimputSearch] = useState("");


    useEffect(() => {
        dispatch(getProductsThunk());
        axios.get('https://e-commerce-api.academlo.tech/api/v1/products/categories/')
            .then(res => setCategoriesList(res.data.data.categories))
    }, [])

    const dispatch = useDispatch();

    const [fromPrice, setFromPrice] = useState("");
    const [toPrice, setToPrice] = useState("");



    return (
        <>
            <InputGroup className="mb-3 searching">
                <Form.Control
                    placeholder="Search.."
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    value={imputSearch} onChange={e => setimputSearch(e.target.value)}
                />
                <Button onClick={() => dispatch(filterThunk(imputSearch))} variant="outline-secondary" id="button-addon2">
                    <i className="fa-solid fa-magnifying-glass"></i>
                </Button>
            </InputGroup>
            <Accordion defaultActiveKey={['1']} alwaysOpen>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Category</Accordion.Header>
                    <Accordion.Body>
                        <ul>
                            {categoriesList.map(category => (
                                <Link className='filter' key={category.id} onClick={() => dispatch(filterProductsThunk(category.id))}>
                                    {category.name}
                                </Link>
                            ))}
                        </ul>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <br />
            <Accordion defaultActiveKey={['1']} alwaysOpen>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Price</Accordion.Header>
                    <Accordion.Body>
                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-sm">From</InputGroup.Text>
                            <Form.Control
                                aria-label="Small"
                                aria-describedby="inputGroup-sizing-sm"
                                value={fromPrice} 
                                onChange={e => setFromPrice(e.target.value)}
                            />
                        </InputGroup>
                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-sm">To</InputGroup.Text>
                            <Form.Control
                                aria-label="Small"
                                aria-describedby="inputGroup-sizing-sm"
                                value={toPrice} 
                                onChange={e => setToPrice(e.target.value)}
                            />
                        </InputGroup>
                        <button onClick={() => dispatch(filterPrice({fromPrice, toPrice}))} className="btn btn-primary button-login">Search</button>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>


        </>
    );
};

export default SearchForm;