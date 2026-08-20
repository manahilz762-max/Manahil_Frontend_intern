type CardProps = {
  title: string;
  children: React.ReactNode;
};

function Card({
  title,
  children,
}: CardProps) {
  return (
    <div className="card">
      <h2>{title}</h2>

      <div style={{ marginTop: "15px" }}>
        {children}
      </div>
    </div>
  );
}

export default Card;