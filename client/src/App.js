import React, { useEffect, useState } from "react";
import FormField from "./components/FormField";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Alert from "./components/Alert";




const App = () => {


  const [alert,setAlert]=useState(false);
  const[success,setSuccess]=useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    state: "",
    district: "",
    village: "",
    panNumber: "",
  });
  const [formErrors, setFormErrors] = useState({
    firstNameErr: null,
    lastNameErr: null,
    stateErr: null,
    districtErr: null,
    villageErr: null,
    panNumberErr: null,
  });
  const {
    firstNameErr,
    lastNameErr,
    stateErr,
    districtErr,
    villageErr,
    panNumberErr,
  } = formErrors;


  const { firstName, lastName, state, district, village, panNumber } = formData;

  // ----------------------------------------- CHECK BROWSER SUPPORT -------------------------------------
  const { listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  // --------------------------------------- FUNCTIONS -------------------------------------------------

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // validate the form

  const handleValidate = () => {
    let errors = {};

    if (!firstName) {
      errors.firstNameErr = "First name is required";
    }

    if (!lastName) {
      errors.lastNameErr = "Last name is required";
    }

    if (!state) {
      errors.stateErr = "State is required";
    }

    if (!district) {
      errors.districtErr = "District is required";
    }

    if (!village) {
      errors.villageErr = "Village is required";
    }

    if (!panNumber) {
      errors.panNumberErr = "PAN Number is required";
    }

    setFormErrors(errors);
  };

  // submit the form
  const handleSubmit = async () => {
    handleValidate();

    try {
      const response = await fetch("http://localhost:4000/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        setSuccess(false)
      }else{
        setSuccess(true)
        setFormData({
          firstName: "",
          lastName: "",
          state: "",
          district: "",
          village: "",
          panNumber: "",
        });
      }
     
    } catch (error) {
      setSuccess(false)
    }
    setAlert(true);
  };

  //---------------------------------------------------------------------------------------------------

  return (
    <div className="form-container">
      <h3>Address Details</h3>
      {!listening && <span className="message"> Tap to Start Recording</span>}

{/* --------------------------------FORM STARTS----------------------------------------- */}

      <div className="form-container-inner">

{/* ________________________ FIRST NAME __________________________  */}

        <FormField
          placeHolder="First Name"
          label="First Name"
          name="firstName"
          value={firstName}
          handleChange={handleInputChange}
          error={firstNameErr}
        />
        <span className="error">{firstNameErr}</span> 

{/* ______________________ LAST NAME ____________________________  */}

        <FormField
          placeHolder="Last Name"
          label="Last Name"
          name="lastName"
          value={lastName}
          handleChange={handleInputChange}
          error={lastNameErr}
        />
        <span className="error">{lastNameErr}</span>

        <div className="dotted-line"></div>

{/* ______________________ STATE ____________________________  */}

        <FormField
          placeHolder="State"
          label="State"
          name="state"
          value={state}
          handleChange={handleInputChange}
          error={stateErr}
        />
        <span className="error">{stateErr}</span>

{/* ______________________DISTRICT ____________________________  */}    

        <FormField
          placeHolder="District"
          label="District"
          name="district"
          value={district}
          handleChange={handleInputChange}
          error={districtErr}
        />
        <span className="error">{districtErr}</span>

{/* ______________________VILLAGE ____________________________  */}

        <FormField
          placeHolder="Village"
          label="Village"
          name="village"
          value={village}
          handleChange={handleInputChange}
          error={villageErr}
        />
        <span className="error">{villageErr}</span>

        <div className="dotted-line"></div>

{/* ______________________ PAN NUMBER ____________________________  */}        
        <FormField
          placeHolder="PAN Number"
          label="PAN Number"
          name="panNumber"
          value={panNumber}
          handleChange={handleInputChange}
          error={panNumberErr}
        />
        <span className="error">{panNumberErr}</span>

{/* ______________________ SUBMIT FORM BTN ____________________________  */}

        <button onClick={() => handleSubmit()}>Submit</button>


      </div>
{/* -------------------------FORM ENDS-------------------------------- */}

     {alert &&  <Alert success={success} setAlert={setAlert} />}
    </div>
  );
};

export default App;
