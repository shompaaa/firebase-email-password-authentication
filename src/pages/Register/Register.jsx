import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase/firebase.init";
import { IoEyeOffSharp } from "react-icons/io5";
import { IoEyeSharp } from "react-icons/io5";
import { Link } from "react-router";

const Register = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleRegister = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const photo = event.target.photo.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const terms = event.target.terms.checked;


    //Password Validation RegEx:

    const passwordLength = /^.{6,}$/;
    const passwordUpperCase = /^(?=.*[A-Z])/;
    const passwordLowerCase = /^(?=.*[a-z])/;
    const passwordSpecialCharacter = /^(?=.*[!@#$%^&*])/;

    if (!passwordLength.test(password)) {
      setError("Password must be at least 6 characters long.");
      return;
    } else if (!passwordUpperCase.test(password)) {
      setError("Password must include at least one uppercase letter.");
      return;
    } else if (!passwordLowerCase.test(password)) {
      setError("Password must include at least one lowercase letter.");
      return;
    } else if (!passwordSpecialCharacter.test(password)) {
      setError(
        "Password must include at least one special character (!@#$%^&*).",
      );
      return;
    }

    if(!terms){
      setError('Please accept our Terms & Conditions')
      return
    }

    //Reset Status: Success or Error
    setSuccess(false);
    setError("");

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);
        event.target.reset();

        //Update user profile
        const profile = {
          displayName: name,
          photoURL: photo
        }
        updateProfile(result.user,profile).then(()=>{}).catch()

        // Send Verification Mail:
        sendEmailVerification(result.user).then(() =>{
          alert('Please login your email & verify')
        })
      })
      .catch((error) => setError(error.message));
  };

  return (
      <div className="hero-content flex-col m-auto mt-5">
        <div className="text-center lg:text-left">
          <h1 className="text-3xl font-bold">Register Now</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleRegister}>
              <fieldset className="fieldset">
                {/* User Name */}
                <label className="label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="input"
                  placeholder="Name Here"
                />
                {/* User Photo URL */}
                <label className="label">Photo</label>
                <input
                  type="text"
                  name="photo"
                  className="input"
                  placeholder="Photo URL"
                />
                {/* User Email */}
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input"
                  placeholder="Email"
                />
                <label className="label">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="input"
                    placeholder="Password"
                  />
                  <button
                    onClick={handleTogglePassword}
                    className="absolute top-2.5 right-6"
                  >
                    {showPassword ? (
                      <IoEyeSharp size={20} />
                    ) : (
                      <IoEyeOffSharp size={20} />
                    )}
                  </button>
                </div>
                <div>
                  <label className="label">
                    <input
                      type="checkbox"
                      name="terms"
                      className="checkbox"
                    />
                    Accept Our Terms & Conditions 
                  </label>
                </div>
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn btn-neutral mt-4">Register</button>
              </fieldset>
              {success && (
                <p className="text-green-500">Account Created Successfully!</p>
              )}
              {error && <p className="text-red-500">{error}</p>}
            </form>
            <p>Already have an account? Please <Link className="text-blue-500" to='/login'>Login</Link></p>
          </div>
        </div>
      </div>
  );
};

export default Register;
