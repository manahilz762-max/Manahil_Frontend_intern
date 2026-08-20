import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

type SettingsData = {
  emailNotifications: boolean;
  activityNotifications: boolean;
  darkMode: boolean;
};

const defaultSettings: SettingsData = {
  emailNotifications: true,
  activityNotifications: true,
  darkMode: false,
};

function Settings() {
  const savedUser = localStorage.getItem("user");

  const user = savedUser
    ? JSON.parse(savedUser)
    : { name: "User" };

  const [settings, setSettings] =
    useState<SettingsData>(defaultSettings);

  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const savedSettings =
      localStorage.getItem("settings");

    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch {
        setSettings(defaultSettings);
      }
    }
  }, []);

  useEffect(() => {
    document.body.classList.toggle(
      "dark-mode",
      settings.darkMode
    );
  }, [settings.darkMode]);

  const handleChange = (
    setting: keyof SettingsData
  ) => {
    setSettings((current) => ({
      ...current,
      [setting]: !current[setting],
    }));

    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem(
      "settings",
      JSON.stringify(settings)
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <div className="dashboard">

      <Sidebar />

      <main className="main-content">

        <Header name={user.name || "User"} />

        <div className="simple-page">

          <div className="content-card">

            <div className="page-heading">
              <h1>Settings ⚙️</h1>

              <p>
                Customize your account and application
                preferences.
              </p>
            </div>

            {saved && (
              <div className="success-message">
                Settings saved successfully! ✓
              </div>
            )}

            <div className="settings-list">

              {/* Email Notifications */}
              <div className="setting-row">

                <div>
                  <h3>
                    Email Notifications 📧
                  </h3>

                  <p>
                    Receive important updates and
                    account information through email.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={
                    settings.emailNotifications
                  }
                  onChange={() =>
                    handleChange(
                      "emailNotifications"
                    )
                  }
                />

              </div>

              {/* Activity Notifications */}
              <div className="setting-row">

                <div>
                  <h3>
                    Activity Notifications 🔔
                  </h3>

                  <p>
                    Get notified about new account
                    activity.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={
                    settings.activityNotifications
                  }
                  onChange={() =>
                    handleChange(
                      "activityNotifications"
                    )
                  }
                />

              </div>

              {/* Dark Mode */}
              <div className="setting-row">

                <div>
                  <h3>
                    Dark Mode 🌙
                  </h3>

                  <p>
                    Switch between light and dark
                    appearance.
                  </p>
                </div>

                <input
                  type="checkbox"
                  checked={settings.darkMode}
                  onChange={() =>
                    handleChange("darkMode")
                  }
                />

              </div>

              {/* Save */}
              <div>
                <button
                  className="btn"
                  onClick={handleSave}
                >
                  Save Settings
                </button>
              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Settings;