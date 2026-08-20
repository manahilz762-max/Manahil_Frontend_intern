function Header({ name }: { name: string }) {
  const firstLetter = name
    ? name.charAt(0).toUpperCase()
    : "U";

  return (
    <header className="header">
      <h1>Dashboard</h1>

      <div className="user-info">
        <span>{name || "User"}</span>

        <div className="avatar">
          {firstLetter}
        </div>
      </div>
    </header>
  );
}

export default Header;