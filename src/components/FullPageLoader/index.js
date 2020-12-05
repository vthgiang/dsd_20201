import React from "react";
import Spinner from "../../resources/images/setting-loader.gif";

const FullPageLoader = () => {
    return (
        <div className="fp-container" style={{align: 'center'}}>
            <img src={Spinner} className="fp-loader" alt="loading" />
        </div>
    );
};

export default FullPageLoader;
