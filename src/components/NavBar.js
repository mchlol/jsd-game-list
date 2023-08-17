import { useNavigate } from "react-router-dom";
import { Button, Navbar } from "react-daisyui";

function NavBar() {
    const navigate = useNavigate();

    const navigateHome = () => {
        navigate('/');
    }

    const navigateToLists = () => {
        navigate('/my-lists')
    }

    return (
        <Navbar id="app-nav" className="p-4 flex justify-between bg-base-100">
        <div className="flex-1">
            <Button tag="a" className="text-xl btn btn-secondary"
            onClick={navigateHome}
            >
              Search
            </Button>
        </div>

        <div className="flex-none">
            <h1 onClick={navigateHome}>GameList</h1>
        </div>

        <div className="flex-1">
            <Button tag="a" className="text-xl btn btn-primary"
            onClick={navigateToLists}
            >
              My Lists
            </Button>
        </div>

      </Navbar>

      
    );
}

export default NavBar;