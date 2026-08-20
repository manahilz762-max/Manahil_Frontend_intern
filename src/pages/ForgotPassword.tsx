import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }

    setLoading(true);

    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      setLoading(false);
      setError("No account found. Please register first.");
      return;
    }

    const user = JSON.parse(savedUser);

    if (user.email !== email.trim()) {
      setLoading(false);
      setError("No account found with this email.");
      return;
    }

    localStorage.setItem(
      "resetEmail",
      email.trim()
    );

    setLoading(false);

    setSuccess(
      "Email verified! Redirecting to reset password..."
    );

    setTimeout(() => {
      navigate("/reset-password");
    }, 1200);
  };

  return (
    <div className="auth-page">
      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >
        <h1>Forgot Password 🔐</h1>

        <p>
          Enter your registered email address
        </p>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {success && (
          <div className="success-message">
            {success}
          </div>
        )}

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Checking..."
            : "Continue"}
        </button>

        <p style={{ marginTop: "20px" }}>
          Remember your password?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default ForgotPassword;