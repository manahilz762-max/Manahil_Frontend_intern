import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);

    const savedUser = localStorage.getItem("user");

    if (!savedUser) {
      setLoading(false);
      setError("No account found. Please register first.");
      return;
    }

    try {
      const user = JSON.parse(savedUser);

      const emailCorrect =
        user.email.toLowerCase() ===
        email.trim().toLowerCase();

      const passwordCorrect =
        user.password === password;

      if (!emailCorrect || !passwordCorrect) {
        setLoading(false);
        setError("Invalid email or password.");
        return;
      }

      localStorage.setItem("isLoggedIn", "true");

      setLoading(false);

      navigate("/dashboard", {
        replace: true,
      });
    } catch {
      setLoading(false);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="login-page">

      {/* Background decoration */}
      <div className="login-glow glow-one"></div>
      <div className="login-glow glow-two"></div>

      <div className="login-container">

        {/* LEFT SIDE */}
        <div className="login-brand">

          <div className="brand-logo">
            SS
          </div>

          <h1>
            Software Synergy
            <span>Solutions</span>
          </h1>

          <p>
            Building ideas into technology.
          </p>

          <div className="brand-line"></div>

          <small>
            Welcome to your digital workspace.
          </small>

        </div>

        {/* RIGHT SIDE */}
        <div className="login-card">

          <div className="login-heading">
            <span className="welcome-badge">
              Welcome back 👋
            </span>

            <h2>
              Sign in to your account
            </h2>

            <p>
              Enter your details to continue.
            </p>
          </div>

          {error && (
            <div className="login-error">
              ⚠️ {error}
            </div>
          )}

          <form
            onSubmit={handleLogin}
            autoComplete="off"
          >

            {/* EMAIL */}
            <div className="login-input">
              <label htmlFor="login-email">
                Email Address
              </label>

              <div className="input-box">
                <span>✉</span>

                <input
                  id="login-email"
                  name="login-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  autoComplete="off"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="login-input">
              <label htmlFor="login-password">
                Password
              </label>

              <div className="input-box">
                <span>🔒</span>

                <input
                  id="login-password"
                  name="login-password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  autoComplete="new-password"
                />
              </div>
            </div>

            {/* FORGOT PASSWORD */}
            <div className="login-options">
              <Link to="/forgot-password">
                Forgot Password?
              </Link>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading
                ? "Signing in..."
                : "Sign In"}

              {!loading && <span>→</span>}
            </button>

          </form>

          {/* REGISTER */}
          <div className="login-register">
            <span>
              Don't have an account?
            </span>

            <Link to="/register">
              Create account
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;