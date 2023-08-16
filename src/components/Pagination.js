import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { Button, Pagination } from "react-daisyui";


function PaginateList() {

    const[page, setPage] = useState(1);
    const navigate = useNavigate();

    function handleClick() {
        console.log('pagination button clicked');
        
    }

    useEffect ( () => {
        console.log('page useeffect callback');
        // if page === 2, {page} in url should be 2 
    },[page]);

    return (
        <>
        <div className="p-4 flex justify-center">
            {/* <Button 
            disabled={page === 1}
            onClick={ () => setPage( (prevState) => prevState -1)}
            >
                ← Previous
            </Button>
            <div className="p-4">Page {page}</div>
            <Button
            onClick={() => setPage( (prevState) => prevState + 1)}
            >
                Next →
            </Button> */}
            <Pagination >
                <Button 
                disabled={page === 1} 
                onClick={ () => setPage( (prevState) => prevState - 1)}
                className="join-item">
                    ←
                </Button>

                <Button 
                className="join-item">
                    Page {page}
                </Button>

                <Button 
                className="join-item"
                onClick={ () => setPage( (prevState) => prevState + 1)}>
                    →
                </Button>
            </Pagination>
    </div>
    </>
    )
}

export default PaginateList;