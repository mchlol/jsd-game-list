import { Button } from "react-daisyui";
import { useNavigate } from "react-router-dom";

function BackButton() {

    const navigate = useNavigate();

    return (

            <div className="p-2">
            <Button
            onClick={ () => navigate(-1)} 
            >
                Back
            </Button>
            </div>

        );
}

export default BackButton;