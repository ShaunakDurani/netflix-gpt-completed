import React, { use, useEffect } from "react";
import { auth } from "../Utils/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { addUser, removeUser } from "../Utils/userSlice";
import { useDispatch } from "react-redux";
import { AVATAR, LOGO } from "../Utils/constants";
import { toggleGptSearchView } from "../Utils/gptSlice";
import { languageConstants } from "../Utils/constants";
import { changeLanguage } from "../Utils/languageSlice";

export const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const gptClicked = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  const handleGptChange = () => {
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
        // ...
      } else {
        // User is signed out
        // ...
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="absolute w-full max-w-full px-12 py-0 bg-gradient-to-b from-black z-30 flex flex-col md:flex-row justify-between">
      <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />

      {user && (
        <div className="flex mx-0">
          {gptClicked && (
            <select
              className="p-2 m-6 bg-gray-900 text-white rounded-lg"
              onChange={handleLanguageChange}
            >
              {languageConstants.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            onClick={handleGptChange}
            className="bg-green-500 my-6 mx-3 p-2
           rounded-lg hover:bg-green-600"
          >
            {gptClicked ? "Home Page" : "Gpt Search"}
          </button>
          <img className="hidden md:inline-block w-12 m-4" src={AVATAR} />
          <button
            onClick={handleSignOut}
            className="bg-red-500 my-6 px-2 text-white font-semibold rounded-lg hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};
