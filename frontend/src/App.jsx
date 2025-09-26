import { useState, useEffect } from "react";
import "./App.css";
import Game from "./routes/Game";
import Layout from "./routes/Layout";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserProfile from "./routes/UserProfile";
import Home from "./routes/Home";
import { AuthContext } from "./context/AuthContext";
import { WebSocketProvider } from "./context/WebSocketContext";
import Rules from "./routes/Rules";
import AuthModal from "./components/AuthModal";

const initialAuth = JSON.parse(localStorage.getItem("auth")) || {
  isAuthenticated: false,
};

function App() {
  const [auth, setAuth] = useState(initialAuth);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  useEffect(() => {
    // if logged in or guestid saved , save it to browser
    if (auth.user || auth?.guestId) {
      localStorage.setItem("auth", JSON.stringify(auth));
    } else {
      //else for  prompt login with option to continue as guest
      setAuthModalOpen(true);
    }
  }, [auth]);

  return (
    <AuthContext value={{ auth, setAuth }}>
      <Router>
        <WebSocketProvider>
          <Routes>
            <Route
              path="/"
              element={<Layout setAuthModalOpen={setAuthModalOpen} />}
            >
              <Route index element={<Home />} />
              <Route path="user" element={<UserProfile />} />
              <Route path="game/:gameId" element={<Game />} />
              <Route path="rules" element={<Rules />} />
            </Route>
          </Routes>
        </WebSocketProvider>
      </Router>
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />
      ;
    </AuthContext>
  );
}

export default App;
