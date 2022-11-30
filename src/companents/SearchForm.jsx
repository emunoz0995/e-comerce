import axios from 'axios';

import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useDispatch } from 'react-redux';
import { filterProductsThunk, filterThunk, getProductsThunk } from '../store/slices/products.slice';
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



    return (
        <>
            <Accordion defaultActiveKey={['1']} alwaysOpen>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Search by Category</Accordion.Header>
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
        </>
    );
};

export default SearchForm;