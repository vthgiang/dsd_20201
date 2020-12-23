import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown, DropdownButton, FormControl, InputGroup } from 'react-bootstrap';
import './Search.css';

SearchComponent.propTypes = {
    searchTypes: PropTypes.array
};

SearchComponent.defaultProps = {
    searchTypes: []
}

function SearchComponent(props) {

    const {
        searchTypes, typeSelected, handleSelectChange,
        searchValue, setSearchValue,
        handleSearch
    } = props;

    return (
        <InputGroup className="mb-3">
            <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-sm">
                    <select className='search__select' value={typeSelected} onChange={handleSelectChange}>
                        {searchTypes.map(item => <option value={item.value}>{item.label}</option>)}
                    </select>
                </InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl value={searchValue} 
                onChange={(e) => setSearchValue(e.target.value)} 
                placeholder="Search" 
                aria-describedby="basic-addon1"
                onKeyDown={handleSearch}
            />
        </InputGroup>

    );
}

export default SearchComponent;