import { useState } from "react";
import ErrorMsg from "../ErrorMsg/ErrorMsg";
import "./Register.css";

const Register = ({ onRouteChange, loadUser }) => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerErrorMsg, setRegisterErrorMsg] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const onFnameChange = (e) => {
    setFname(e.target.value);
  };

  const onLnameChange = (e) => {
    setLname(e.target.value);
  };

  const onEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    // Regex test returns true if valid
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setEmailValid(regex.test(value));
  };

  const onPasswordChange = (e) => {
    const pw = e.target.value;
    setPassword(e.target.value);

    // Regex test returns true if valid
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setPasswordValid(regex.test(pw));
  };

  const onSubmitRegister = async () => {
    try {
      if (
        fname.length &&
        lname.length &&
        email.length &&
        emailValid &&
        password.length &&
        passwordValid
      ) {
        const registerData = await fetch(
          "https://face-detection-scanner-api.onrender.com/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              firstName: fname,
              lastName: lname,
              email: email,
              password: password,
            }),
          },
        );
        const data = await registerData.json();

        if (data != "Error: unable to register") {
          loadUser(data);
          onRouteChange("home");
        } else {
          console.log("Failed to register");
          setRegisterErrorMsg(
            "Someone with that email already exists. Please use a different email.",
          );
        }
      } else if (!emailValid) {
        setRegisterErrorMsg("The email entered is invalid");
      } else if (!passwordValid) {
        setRegisterErrorMsg(
          "Password must be at least 8 characters long. Includes at least one uppercase letter, one lowercase letter, one number and one special character. ",
        );
      } else {
        setRegisterErrorMsg("Please fill out each field");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form-container">
        <div className="register-form-title">
          <h2>Register</h2>
        </div>

        {registerErrorMsg.length ? <ErrorMsg error={registerErrorMsg} /> : null}

        <div className="register-form">
          <div className="register-form-group">
            <label htmlFor="fname">First Name</label>
            <input type="text" name="fname" onChange={onFnameChange} />
          </div>

          <div className="register-form-group">
            <label htmlFor="lname">Last Name</label>
            <input type="text" name="lname" onChange={onLnameChange} />
          </div>

          <div className="register-form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" onChange={onEmailChange} />
          </div>

          <div className="register-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              onChange={onPasswordChange}
            />
          </div>

          <button className="register-btn" onClick={onSubmitRegister}>
            Register
          </button>
        </div>

        <div className="register-sign-in">
          <p
            onClick={() => {
              onRouteChange("signin");
            }}
          >
            Back to Sign In
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
