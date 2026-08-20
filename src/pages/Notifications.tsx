import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

type Notification = {
  id: number;
  title: string;
  message: string;
  time: string;
  read: boolean;
};

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "Welcome to your dashboard 🎉",
    message:
      "Your account has been successfully created.",
    time: "Just now",
    read: false,
  },
  {
    id: 2,
    title: "Profile updated",
    message:
      "Your profile information was updated successfully.",
    time: "10 minutes ago",
    read: false,
  },
  {
    id: 3,
    title: "New activity",
    message:
      "There is new activity available on your account.",
    time: "1 hour ago",
    read: true,
  },
  {
    id: 4,
    title: "Security reminder 🔐",
    message:
      "Make sure your account information is always up to date.",
    time: "Yesterday",
    read: true,
  },
];

function Notifications() {
  const savedUser = localStorage.getItem("user");

  const user = savedUser
    ? JSON.parse(savedUser)
    : { name: "User" };

  const [notifications, setNotifications] =
    useState<Notification[]>(initialNotifications);

  const markAsRead = (id: number) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  return (
    <div className="dashboard">

      <Sidebar />

      <main className="main-content">

        <Header name={user.name || "User"} />

        <div className="simple-page">

          <div className="content-card">

            <div
              className="page-heading"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "15px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <h1>Notifications 🔔</h1>

                <p>
                  Stay updated with your latest account
                  activity.
                </p>
              </div>

              {unreadCount > 0 && (
                <button
                  className="btn"
                  onClick={markAllAsRead}
                >
                  Mark all as read
                </button>
              )}
            </div>

            <div className="notification-list">

              {notifications.length === 0 ? (
                <div className="notification-item">
                  <h3>No notifications</h3>

                  <p>
                    You're all caught up! ✨
                  </p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="notification-item"
                    style={{
                      borderLeft: notification.read
                        ? "3px solid #ddd6fe"
                        : "3px solid #a78bfa",
                    }}
                  >

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "15px",
                      }}
                    >

                      <div>
                        <h3>
                          {notification.title}
                        </h3>

                        <p>
                          {notification.message}
                        </p>

                        <small>
                          {notification.time}
                        </small>
                      </div>

                      {!notification.read && (
                        <button
                          className="btn"
                          onClick={() =>
                            markAsRead(notification.id)
                          }
                        >
                          Read
                        </button>
                      )}

                    </div>

                  </div>
                ))
              )}

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Notifications;