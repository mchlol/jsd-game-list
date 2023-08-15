import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Input } from "react-daisyui";

function SearchForm() {

    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    function handleSubmit(ev) {
        ev.preventDefault();
        console.log('Form submitted',ev.target.value);
        // if query was blank return search for popular games
        if (query) {
            navigate(`/search/${query}`);
        } else {
            navigate('/search/popular');
        }
        
    }

    return (
        <div id="searchForm">
            <Form className="join" id="searchForm" onSubmit={handleSubmit}>
                <Input bordered type="text" placeholder="Search games" className="join-item" onChange={ev => setQuery(ev.target.value)} /> 
                <Button className="btn btn-secondary join-item">Search</Button>
            </Form>
        </div>
    );
}

export default SearchForm;