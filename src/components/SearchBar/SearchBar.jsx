import styled from "styled-components"

const SearchInput = styled.input`
    margin-left: 10px;
    margin-right: 10px;
    padding: 9px;
    /* width: 100px; */
    border: 1px solid #cb8634;
    border-radius: 4px;
`


const SearchBar = ({ value, onChange }) => {
    return (
        <label>
            Пошук товарів
            <SearchInput
                type="text"
                placeholder="Search"
                value={value}
                onChange={onChange} />
        </label>
    )
}

export default SearchBar