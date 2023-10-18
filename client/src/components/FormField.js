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
  setActiveFields,
  activeFields,

  handleSpeechRecognition,
  listening
}) => {


  // const [listening, setListening] = useState(false);

  const { transcript, resetTranscript } = useSpeechRecognition();

  const handleSpeech=()=>{
    handleSpeechRecognition({name,value : transcript})
  }

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
      <button className="mic-btn" disabled={activeFields===name}>
      
        <img
          src={microphoneSvg}
          width={15}
          className={`microphone ${listening ? "microphone-active" : ""}`}
          onClick={handleSpeech}
          alt="microphone"
        />
      </button>
    </div>
  );
};

export default FormField;
