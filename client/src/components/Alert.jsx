import React from "react";

const Alert = ({ setAlert, success }) => {
    const handleAlert=()=>{
        setAlert(false)
    }


  return (
    <div className="alert">
      {success ? (
        <div className="alert-container">
    
          <h2 className="alert-heading" style={{ color: "green" }}>
            SUCCESS!
          </h2>
          <p className="alert-des">Form data submitted successfully</p>
          <div className="close" onClick={handleAlert}>close</div>
        </div>
      ) : (
        <div className="alert-container">
     
          <h2 className="alert-heading" style={{ color: "red" }}>
            ERROR!
          </h2>
          <p className="alert-des">Error submitting form data</p>
          <div className="close" onClick={handleAlert}>retry</div>
        </div>
      )}
    </div>
  );
};

export default Alert;
