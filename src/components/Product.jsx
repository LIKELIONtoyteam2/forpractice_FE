const Product = ({ name, daysLeft, onClick }) => {
  return (
    <div onClick={onClick} style={{ border: "1px solid black" }}>
      <p>{name}</p>
      <p>D-{daysLeft}</p>
      <progress value={20 - daysLeft} max={20} />
    </div>
  );
};

export default Product;
