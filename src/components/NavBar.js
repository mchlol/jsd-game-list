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
        <Navbar className="p-4 flex justify-between">
        <div className="flex-1">
            <Button tag="a" className="text-xl normal-case" color="ghost"
            onClick={navigateHome}
            >
              GameList
            </Button>
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