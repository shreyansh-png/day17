import React from "react";

const Card = ({ item, onAdd }) => {
  console.log("Card rendering:", item.name);
  return (
    <div>
      {item.name} - Rs.{item.price}{" "}
      <button onClick={() => onAdd(item)}>Add</button>
    </div>
  );
};

export default React.memo(Card);