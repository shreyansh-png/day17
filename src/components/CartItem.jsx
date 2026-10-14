import React from "react";

const CartItem = ({ item, onRemove }) => {
  console.log("CartItem rendering:", item.name);
  return (
    <div>
      {item.name} x {item.qty}{" "}
      <button onClick={() => onRemove(item.id)}>Remove</button>
    </div>
  );
};

export default React.memo(CartItem);