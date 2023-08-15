import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Input } from "react-daisyui";

function SearchForm() {

    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    function handleSubmit(ev) {
        ev.preventDefault();
        console.log('Form submitted',ev.target.value);
        navigate(`/search/${query}`);
    }

    return (
        <div id="searchForm">
            <Form className="join" id="searchForm" onSubmit={handleSubmit}>
                <Input bordered type="text" placeholder="Search games" className="" onChange={ev => setQuery(ev.target.value)} />
                <Button className="btn searchBtn">Search</Button>
            </Form>
        </div>
    );
}

export default SearchForm;