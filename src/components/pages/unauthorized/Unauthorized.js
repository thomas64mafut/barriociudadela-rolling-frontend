import "./unauthorized.css";
import { useNavigate } from "react-router-dom";

import logo from '../../../assets/img/401-unauthorized.png';

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <div className="main-container">
            <div className="title-container">
                <h1>Unauthorized</h1>
            </div>
            
            <div className="img-container">
                <img src={logo} alt="error 401" className="img-fluid"/>
                
            </div>
            <p>You do not have access to the requested page.</p>
            <div className='button-container'>
                <button className='btn-custom my-3'onClick={goBack}>
                    <span className='btn-custom_top'>
                        go back
                    </span>
                </button>
            </div>
        </div>
    )
};

export default Unauthorized;
