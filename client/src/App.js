import React, { useEffect, useState } from "react";
import FormField from "./components/FormField";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const App = () => {
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
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      alert("Form data submitted successfully");
      setFormData({
        firstName: "",
        lastName: "",
        state: "",
        district: "",
        village: "",
        panNumber: "",
      });
    } catch (error) {
      alert("Error submitting form data:", error.message);
    }
  };

  //---------------------------------------------------------------------------------------------------

  return (
    <div className="form-container">
      <h3>Address Details</h3>
      {!listening && <span className="message"> Tap to Start Recording</span>}
      <div className="form-container-inner">
        <FormField
          placeHolder="First Name"
          label="First Name"
          name="firstName"
          value={firstName}
          handleChange={handleInputChange}
          error={firstNameErr}
        />
        <span className="error">{firstNameErr}</span>
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
        <FormField
          placeHolder="State"
          label="State"
          name="state"
          value={state}
          handleChange={handleInputChange}
          error={stateErr}
        />
        <span className="error">{stateErr}</span>
        <FormField
          placeHolder="District"
          label="District"
          name="district"
          value={district}
          handleChange={handleInputChange}
          error={districtErr}
        />
        <span className="error">{districtErr}</span>

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
        <FormField
          placeHolder="PAN Number"
          label="PAN Number"
          name="panNumber"
          value={panNumber}
          handleChange={handleInputChange}
          error={panNumberErr}
        />
        <span className="error">{panNumberErr}</span>
        <button onClick={() => handleSubmit()}>Submit</button>
      </div>
    </div>
  );
};

export default App;
