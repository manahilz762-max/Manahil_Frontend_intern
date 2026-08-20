import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Button from "../components/Button";

type User = {
  name: string;
  email: string;
  password: string;
};

function Profile() {
  const savedUser = localStorage.getItem("user");

  const user: User = savedUser
    ? JSON.parse(savedUser)
    : {
        name: "User",
        email: "",
        password: "",
      };

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    setMessage("");
    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!email.trim()) {
      setError("Please enter your email.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }

    const updatedUser = {
      ...user,
      name: name.trim(),
      email: email.trim(),
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    setMessage("Profile updated successfully! ✓");
  };

  return (
    <div className="dashboard">

      <Sidebar />

      <main className="main-content">

        <Header name={name || "User"} />

        <div className="simple-page">

          <div className="content-card profile-card">

            <div className="page-heading">
              <h1>My Profile ✨</h1>

              <p>
                Manage your personal account information.
              </p>
            </div>

            <div className="profile-header">

              <div className="profile-avatar">
                {name
                  ? name.charAt(0).toUpperCase()
                  : "U"}
              </div>

              <div>
                <h2>{name || "User"}</h2>

                <p>
                  {email || "No email available"}
                </p>
              </div>

            </div>

            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {message && (
              <div className="success-message">
                {message}
              </div>
            )}

            <div className="profile-form">

              <div className="form-group">
                <label htmlFor="name">
                  Full Name
                </label>

                <input
                  id="name"
                  type="text"
                  value={name}
                  placeholder="Enter your name"
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Email Address
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />
              </div>

              <Button onClick={handleSave}>
                Save Changes
              </Button>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Profile;