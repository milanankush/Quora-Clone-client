import React from "react";
import "./Login.css";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase";
function Login() {
  const handleSubmit = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // firebase.auth().signInWithPopup(provider).then(function(result) {
  //   // code which runs on success
  // }).catch(function(error) {
  //   // Handle Errors here.
  //   var errorCode = error.code;
  //   console.log(errorCode);
  //   alert(errorCode);
  
  //   var errorMessage = error.message;
  //   console.log(errorMessage);
  //   alert(errorMessage);
  // });
  return (
    <div className="login-container">
      <div className="login-content">
        <img
          src="https://video-public.canva.com/VAD8lt3jPyI/v/ec7205f25c.gif"
          alt="logo"
        />
        <button onClick={handleSubmit} className="btn-login">
          Login to continue
        </button>
      </div>
    </div>
  );
}

export default Login;
