import { useState, useRef } from "react";
import { Header } from "./Header";
import checkValidData from "../Utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../Utils/firebase";
import { updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../Utils/userSlice";
import { BG_IMAGE, PROFILE_PIC } from "../Utils/constants";

const Login = () => {
  const [isSignedIn, setisSignedIn] = useState(null);
  const [errMessage, seterrMessage] = useState(null);
  const dispatch = useDispatch();
  const Email = useRef(null);
  const Password = useRef(null);
  const FullName = useRef(null);

  const handleSignIn = () => {
    setisSignedIn(!isSignedIn);
  };

  const handleClick = () => {
    console.log(Email.current.value);
    console.log(Password.current.value);
    const message = checkValidData(Email.current.value, Password.current.value);
    seterrMessage(message);
    if (message) return;

    //Sign-in / Sign-out
    if (!isSignedIn) {
      //Sign-up logic
      createUserWithEmailAndPassword(
        auth,
        Email.current.value,
        Password.current.value
      )
        .then((userCredential) => {
          // Signed ups
          const user = userCredential.user;
          updateProfile(user, {
            displayName: "Shaunak Durani",
            photoURL: PROFILE_PIC,
          })
            .then(() => {
              // Profile updated!
              // ...
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              // ...
              seterrMessage(error.message);
            });
          console.log(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrMessage(errorCode + " - " + errorMessage);
          // ..
        });
    } else {
      //Sign-in logic
      signInWithEmailAndPassword(
        auth,
        Email.current.value,
        Password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          seterrMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img className="h-screen object-cover" src={BG_IMAGE} alt="bg-image" />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute bg-black w-2/6 my-36 mx-auto right-0 left-0 p-12 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="text-3xl font-bold py-2 m-2">
          {isSignedIn ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignedIn && (
          <input
            ref={FullName}
            type="text"
            placeholder="Full Name"
            className="p-4 m-2 w-full rounded-lg bg-gray-600 bg-opacity-10 border-solid border-[1px] border-white"
          />
        )}
        <input
          ref={Email}
          type="text"
          placeholder="Email or mobile number"
          className="p-4 m-2 w-full rounded-lg bg-gray-600 bg-opacity-10 border-solid border-[1px] border-white"
        />
        <input
          ref={Password}
          type="password"
          placeholder="Password"
          className="p-4 m-2 w-full rounded-lg bg-gray-600 bg-opacity-10 border-solid border-[1px] border-white"
        />
        <p className="text-red-500 py-2 font-bold">{errMessage}</p>
        <button
          className=" bg-red-600 p-2 m-2 w-full rounded-lg font-bold"
          onClick={handleClick}
        >
          {isSignedIn ? "Sign In" : "Sign Up"}
        </button>
        <p className="p-2 m-2 cursor-pointer" onClick={handleSignIn}>
          {isSignedIn
            ? "New to Netflix? Sign up now."
            : "Already Registered Sign in now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
