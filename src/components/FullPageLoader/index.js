import React from "react";
import Spinner from "../../resources/images/loaderrube.gif";

const FullPageLoader = () => {
    return (
        <div style={{align: 'center'}}>
            <img src={Spinner} style={{align: 'center', width: "80vw"}} className="fp-loader" alt="loading" />
        </div>
    );
};

export default FullPageLoader;
