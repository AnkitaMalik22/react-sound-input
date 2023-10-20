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
  onClick,
}) => {
  const [listening, setListening] = useState(false);

  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (!active && listening) {
      // remove the full stop from end
      const text = `${value + transcript}`.replace(/\./g, "");

      handleChange({ target: { name, value: text } });

      setListening(false);
    }
  }, [active, listening]);

  // ----------------------------FUNCTION STARTS ----------------------------------

  const handleSpeechRecognition = () => {
    onClick();

    if (listening) {
      SpeechRecognition.stopListening();

      // remove the full stop from end
      const text = `${value + transcript}`.replace(/\./g, "");

      handleChange({ target: { name, value: text } });
    } else {
      SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    }

    // Toggle the listening state
    setListening((prevListening) => !prevListening);

    // Reset the transcript after processing
    resetTranscript();
  };

  // ----------------------------------------------------------------------------

  return (
    <div className="form-field">
      <label className="form-label">
        {label}
        <span style={{ color: "red" }}>*</span>
      </label>
      <input
        type={"text"}
        name={name}
        disabled={listening}
        value={listening ? value + transcript : value}
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
