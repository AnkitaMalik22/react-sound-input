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
}) => {
  useEffect(() => {
    console.log("error", error);
  }, [error]);

  const [listening, setListening] = useState(false);

  const { transcript, resetTranscript } = useSpeechRecognition();

  const handleSpeechRecognition = (e) => {
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
        onClick={handleSpeechRecognition}
        alt="microphone"
      />
    </div>
  );
};

export default FormField;
