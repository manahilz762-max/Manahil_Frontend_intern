import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

function ResetPassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!password) {
      setError("Please enter a new password.");
      return;
    }

    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const resetEmail =
      localStorage.getItem("resetEmail");

    const savedUser =
      localStorage.getItem("user");

    if (!resetEmail || !savedUser) {
      setError(
        "Password reset session expired. Please try again."
      );
      return;
    }

    setLoading(true);

    const user = JSON.parse(savedUser);

    user.password = password;

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    localStorage.removeItem("resetEmail");

    setLoading(false);

    setSuccess(
      "Password changed successfully!"
    );

    setTimeout(() => {
      navigate("/login");
    }, 1200);
  };

  return (
    <div className="auth-page">
      <form
        className="auth-form"
        onSubmit={handleReset}
      >
        <h1>Reset Password 🔑</h1>

        <p>
          Create a new password for your account
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
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
        />

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Updating..."
            : "Reset Password"}
        </button>

        <p style={{ marginTop: "20px" }}>
          <Link to="/login">
            Back to Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default ResetPassword;