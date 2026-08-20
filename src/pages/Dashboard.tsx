import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import UserTable from "../components/UserTable";
import Card from "../components/Card";

function Dashboard() {
  const savedUser = localStorage.getItem("user");

  const user = savedUser
    ? JSON.parse(savedUser)
    : {
        name: "User",
        email: "",
      };

  return (
    <div className="dashboard">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="main-content">

        {/* Header */}
        <Header name={user.name || "User"} />

        {/* Welcome Section */}
        <div className="welcome-section">
          <h2>
            Welcome back, {user.name || "User"} ✨
          </h2>

          <p>
            Here's what's happening with your account today.
          </p>
        </div>

        {/* Statistics */}
        <section className="stats">

          <StatCard
            title="Total Users"
            value={120}
          />

          <StatCard
            title="Active Users"
            value={85}
          />

          <StatCard
            title="New Users"
            value={25}
          />

          <StatCard
            title="Activities"
            value={340}
          />

        </section>

        {/* Recent Users */}
        <Card title="Recent Users & Activity">
          <UserTable />
        </Card>

      </main>
    </div>
  );
}

export default Dashboard;