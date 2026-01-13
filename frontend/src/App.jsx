import { useState, useEffect } from "react";
import "./App.css";
import Game from "./routes/Game";
import Layout from "./routes/Layout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserProfile from "./routes/UserProfile";
import Home from "./routes/Home";
import { AuthContext } from "./context/AuthContext";
import { WebSocketProvider } from "./context/WebSocketContext";
import Rules from "./routes/Rules";
import AuthModal from "./components/AuthModal";
import { generateUsername } from "unique-username-generator";

// Get user data from localStorage, guest ID from sessionStorage
const storedUser = JSON.parse(localStorage.getItem("auth")) || {};
const storedGuest = JSON.parse(sessionStorage.getItem("guestAuth")) || {};

const initialAuth =
  storedUser.isLoggedIn && storedUser.user
    ? { isLoggedIn: true, user: storedUser.user }
    : storedGuest.guestId
    ? { isLoggedIn: false, guestId: storedGuest.guestId }
    : { isLoggedIn: false };

function App() {
  const [auth, setAuth] = useState(initialAuth);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Generate a new guest ID on mount if not logged in and no guest ID exists
  useEffect(() => {
    if (!auth.isLoggedIn && !auth.guestId) {
      setRandomGuestId();
    }
  }, []);

  // Store user data in localStorage, guest data in sessionStorage
  useEffect(() => {
    if (auth.isLoggedIn && auth.user) {
      // User is logged in, save to localStorage and clear guest data

      localStorage.setItem(
        "auth",
        JSON.stringify({
          isLoggedIn: true,
          user: auth.user,
        })
      );
      sessionStorage.removeItem("guestAuth");
    } else if (auth.guestId) {
      // User is a guest - save to sessionStorage and cler user data
      sessionStorage.setItem(
        "guestAuth",
        JSON.stringify({
          guestId: auth.guestId,
        })
      );
      localStorage.removeItem("auth");
    } else {
      // No auth data - clear both
      localStorage.removeItem("auth");
      sessionStorage.removeItem("guestAuth");
    }
  }, [auth.isLoggedIn, auth.user, auth.guestId]);

  const setRandomGuestId = () => {
    const NameLength = 12;
    const guestId = generateUsername("", "", NameLength);
    setAuth({
      isLoggedIn: false,
      guestId: guestId,
    });
    console.log("Guest ID:", guestId);
  };

  // Create the router configuration
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <WebSocketProvider>
          <Layout setAuthModalOpen={setAuthModalOpen} />
        </WebSocketProvider>
      ),
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "user",
          element: <UserProfile />,
        },
        {
          path: "game/:gameId",
          element: <Game />,
        },
        {
          path: "rules",
          element: <Rules />,
        },
      ],
    },
  ]);

  return (
    <AuthContext value={{ auth, setAuth }}>
      <RouterProvider router={router} />
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
    </AuthContext>
  );
}

export default App;
