import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <h1 className="flex flex-col items-center justify-center italic  text-2xl">
        Hello world!
      </h1>
      <div className="flex flex-col items-center justify-center">
        <p className="text-xl">Welcome to your new app!</p>
        <p className="text-xl">Get started by editing this file.</p>
        <div>
          {isLoggedIn ? (
            <div>
              <h1 className="flex flex-col items-center justify-center">Welcome {}! You are logged in</h1>
              <button
                className="flex flex-col items-center justify-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={() => setIsLoggedIn(false)}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Login setIsLoggedIn={setIsLoggedIn} />
            </>
          )}
        </div>
          <Register />
      </div>
    </>
  );
}
