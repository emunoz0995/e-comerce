import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { useDispatch } from 'react-redux';
import { filterProductsThunk, filterThunk, getProductsThunk } from '../store/slices/products.slice';

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
        <Accordion defaultActiveKey={['1']} alwaysOpen>
            <Accordion.Item eventKey="1">
                <Accordion.Header>Search by Category</Accordion.Header>
                <Accordion.Body>
                    <ul>
                        {categoriesList.map(category => (
                            <li key={category.id} onClick={() => dispatch(filterProductsThunk(category.id))}>
                                {category.name}
                            </li>
                        ))}
                    </ul>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};

export default SearchForm;