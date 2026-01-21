import { useState, useContext } from "react";
import BaseModal from "./ui/BaseModal";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import PrimaryButton from "./ui/PrimaryButton";
import { GoogleLogin } from "@react-oauth/google";

export default function AuthModal({ isOpen, onClose }) {
  const baseHttpUrl =
    import.meta.env.VITE_BASE_HTTP_URL || "http://127.0.0.1:8000/";

  const [mode, setMode] = useState("login");
  const { setAuth } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    avatar: null,
  });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");
  const [loading, setLoading] = useState(false);

  const toggleMode = () => {
    setMode(mode === "login" ? "signup" : "login");
    setMessage("");
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Handle Google OAuth
  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setMessage("");
    console.log("credential:", credentialResponse.credential);

    try {
      const response = await fetch(`${baseHttpUrl}google-auth/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: credentialResponse.credential,
          mode: mode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle error responses (400, 500, etc.)
        setMessage(data.error || "Authentication failed");
        setMessageType("error");
        return;
      }

      // Success
      const userData = data.user_data;
      setAuth({ isLoggedIn: true, user: userData });
      setMessage(`Google ${mode} successful!`);
      setMessageType("success");

      // Close modal after successful login/signup
      setTimeout(() => {
        onClose();
      }, 500);
    } catch (error) {
      console.error("Google auth error:", error);
      setMessage("Network error. Please try again.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (mode === "signup") {
        const data = new FormData();
        data.append("username", formData.username);
        data.append("email", formData.email);
        data.append("password", formData.password);
        if (formData.avatar) data.append("avatar", formData.avatar);

        await axios.post(`${baseHttpUrl}signup/`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setMessage("Signup successful! You can now log in.");
        setMessageType("success");
        setMode("login");
      } else {
        const response = await axios.post(`${baseHttpUrl}login/`, {
          username: formData.username,
          password: formData.password,
        });
        setMessage("Login successful!");
        setMessageType("success");
        const userData = response.data.user_data;
        setAuth({ isLoggedIn: true, user: userData });

        setTimeout(() => {
          onClose();
        }, 500);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.error || "An error occurred";
      setMessage(errorMsg);
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={
        (mode === "login" ? "🔐 " : "👤 ") +
        (mode === "login" ? "Login" : "Sign Up")
      }
    >
      <div className="space-y-6">
        {/* Google Authentication Button */}
        <div className="space-y-3">
          <div className="flex justify-center">
            <div className="w-full max-w-xs">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  setMessage("Google authentication failed");
                  setMessageType("error");
                }}
                size="large"
                text={mode === "login" ? "signin_with" : "signup_with"}
                shape="rectangular"
                theme="filled_black"
                logo_alignment="left"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border-muted"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-bg-surface text-text-muted text-sm font-medium">
                Or {mode === "login" ? "sign in" : "sign up"} with email
              </span>
            </div>
          </div>
        </div>

        <FormField label="Username">
          <Input
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </FormField>

        {mode === "signup" && (
          <>
            <FormField label="Email Address">
              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </FormField>

            <FormField label="Profile Picture (Optional)">
              <Input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleChange}
              />
            </FormField>
          </>
        )}

        <FormField label="Password">
          <Input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </FormField>

        {/* Submit Button */}
        <PrimaryButton
          variant="primary"
          loading={loading}
          onClick={handleSubmit}
        >
          {mode === "login" ? "Log In" : "Create Account"}
        </PrimaryButton>

        {/* Alert Message */}
        <Alert message={message} type={messageType} />

        {/* Toggle Mode */}
        <div className="text-center pt-4 border-t border-border-muted">
          <p className="text-text-muted">
            {mode === "login" ? (
              <>
                Don't have an account?{" "}
                <button
                  onClick={toggleMode}
                  className="text-primary hover:text-primary-hover font-semibold hover:underline transition-colors"
                >
                  Sign up here
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={toggleMode}
                  className="text-primary hover:text-primary-hover font-semibold hover:underline transition-colors"
                >
                  Log in here
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </BaseModal>
  );
}

// Input Component
const Input = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required,
  accept,
  className = "",
}) => {
  const baseClasses =
    "w-full p-4 bg-bg-surface-dark border border-border-muted rounded-lg text-text-light placeholder-text-muted focus:outline-none focus:border-primary transition-all";

  if (type === "file") {
    return (
      <input
        type="file"
        name={name}
        accept={accept}
        onChange={onChange}
        className={`${baseClasses} file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-border-muted file:text-text-light hover:file:bg-border-light file:cursor-pointer cursor-pointer ${className}`}
      />
    );
  }

  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`${baseClasses} ${className}`}
    />
  );
};

// FormField Component
const FormField = ({ label, children }) => (
  <div>
    <label className="block text-text-light font-semibold mb-2 text-sm">
      {label}
    </label>
    {children}
  </div>
);

// Alert Component
const Alert = ({ message, type = "error" }) => {
  if (!message) return null;

  const styles = {
    success: "bg-green-900/30 text-green-300 border border-green-800",
    error: "bg-red-900/30 text-red-300 border border-red-800",
  };

  return (
    <div className={`p-4 rounded-lg text-sm font-medium ${styles[type]}`}>
      {message}
    </div>
  );
};
