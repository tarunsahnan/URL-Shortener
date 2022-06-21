import React, { useEffect } from "react";
import styles from "./input.module.css";
import { useState } from "react";
import Modal from "../Modal";

const Input = () => {
  const [url, setUrl] = useState("");
  const [output, setOutput] = useState(null);
  const [action, setAction] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(false);
  let counter = -1;
  let recentItems = {};
  if (showModal || error) {
    setTimeout(() => {
      setShowModal(false);
      setError(false);
    }, 2000);
  }
  useEffect(() => {
    if (action !== null) {
      localStorage.setItem("counter", counter + 1);
      localStorage.setItem(`item${counter + 1}`, {
        url: url,
        timeStamp: new Date(),
      });
    }
  }, [counter]);
  const shortenUrl = () => {
    fetch(`https://api.shrtco.de/v2/shorten?url=${url}`)
      .then((response) => response.json())
      .then((data) => {
        setAction("Shorten URL:");

        if (data.ok) {
          setOutput(data.result.full_short_link);
          counter++;
        } else {
          setError(true);
        }
      });
  };
  const infoOfUrl = () => {
    console.log(`https://api.shrtco.de/v2/info?code=${url.split("/").at(-1)}`);
    fetch(`https://api.shrtco.de/v2/info?code=${url.split("/").at(-1)}`)
      .then((response) => response.json())
      .then((data) => {
        setAction("Original Url:");

        if (data.ok) {
          console.log(data);
          setOutput(data.result.url);
          counter++;
        } else {
          setError(true);
        }
      });
  };

  return (
    <div className={styles.mainComponent}>
      <div>
        <h2 className={styles.mainHeading}>URL Shortener</h2>
        <div className={styles.inputDiv}>
          <input
            type="text"
            className={styles.urlInput}
            placeholder="please enter url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
        </div>

        <div className={styles.buttonDiv}>
          <button className={styles.button} onClick={shortenUrl}>
            Shorten
          </button>
          <button className={styles.button} onClick={infoOfUrl}>
            Info
          </button>
        </div>
        {output !== null && (
          <div className={styles.outputMajorDiv}>
            {action}
            <div
              className={styles.output}
              onClick={() => {
                navigator.clipboard.writeText(output);
                setShowModal(true);
              }}
            >
              {output}
            </div>
          </div>
        )}
        {showModal && <Modal link={output} note=" copied to clipboard" />}
        {error && (
          <Modal
            note={
              action !== "Original Url:"
                ? "Invalid Link: Please Enter a valid Link to shorten it"
                : "Invalid Link: Please Enter a valid shorten link to extract original url from it"
            }
          />
        )}
      </div>
    </div>
  );
};

export default Input;
