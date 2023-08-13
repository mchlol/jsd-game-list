import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchForm() {

    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    function handleSubmit(ev) {
        ev.preventDefault();
        console.log('Form submitted',ev.target.value);
        navigate(`/search/${query}`);
    }

    return (
        <form id="searchForm" onSubmit={handleSubmit}>
            <input type="text" onChange={ev => setQuery(ev.target.value)} />
            <button>Search</button>
        </form>
    );
}

export default SearchForm;