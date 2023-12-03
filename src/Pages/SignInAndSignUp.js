import React, { useState } from "react";
import { database } from "../firebaseAuth.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
function SignInAndSignUp() {
  const [login, setlogin] = useState(false);
  const history = useNavigate();

  const handleSubmit = (e, type) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (type === "SignUp") {
      createUserWithEmailAndPassword(database, email, password)
        .then((data) => {
          console.log(data, "AuthSuccessful");
          //   navigate("/home");
          //   setlogin(false);
          setlogin(true);
        })
        .catch((err) => {
          console.error(err, "Email is already being used.");
          setlogin(true);
        });
    } else if (type === "SignIn") {
      signInWithEmailAndPassword(database, email, password).then((data) => {
        console.log(data, "Auth");
        history("/home").catch((err) => {
          alert("Error", err);
        });
      });
    }
  };
  return (
    <div>
      <div className="btn">
        <button onClick={() => setlogin(true)}>SignIn</button>
        <button onClick={() => setlogin(false)}>SignUp</button>
      </div>
      <h1>{login ? "SignIn" : "SignUp"}</h1>
      <form onSubmit={(e) => handleSubmit(e, login ? "SignIn" : "SignUp")}>
        <input placeholder="Email" type="email" name="email" />
        <input placeholder="password" type="password" name="password" />
        <button type="submit">{login ? "SignIn" : "SignUp"}</button>
      </form>
    </div>
  );
}

export default SignInAndSignUp;
