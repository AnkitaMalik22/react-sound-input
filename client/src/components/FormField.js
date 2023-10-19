import React, { useState, useEffect } from "react";
import microphoneSvg from "../microphone.svg";
import "../App.css";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const FormField = ({
  label,
  name,
  value,
  handleChange,
  placeHolder,
  error,
  active,
  onClick, // renamed from handleActive for simplicity
}) => {
  const [listening, setListening] = useState(false);

  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (!active && listening) {
      setListening(false);
    }
  }, [active, listening]);


  const handleSpeechRecognition = () => {
onClick()

    if (listening) {
     
      SpeechRecognition.stopListening();
      handleChange({ target: { name, value: transcript } });
    } else {

      SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    }

    setListening((prevListening) => !prevListening);
    resetTranscript();
    SpeechRecognition.abortListening();
  
  };

  

  return (
    <div className="form-field">
      <label className="form-label">
        {label}
        <span style={{ color: "red" }}>*</span>
      </label>
      <input
        type="text"
        name={name}
        value={listening ? transcript : value}
        onChange={handleChange}
        className="form-input"
        style={{ borderColor: error && "red" }}
        placeholder={placeHolder}
      />
      
        {listening && <span className="span-recording">Recording...</span>}
        <img
          src={microphoneSvg}
          width={15}
          className={`microphone ${listening ? "microphone-active" : ""}`}
          alt="microphone"
          onClick={handleSpeechRecognition}
        />

    </div>
  );
};

export default FormField;
