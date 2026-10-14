import React, { useCallback, useMemo, useState } from "react";
import Card from "./components/Card";
import CartItem from "./components/CartItem";

const items = [
  { id: 1, name: "Keyboard", price: 1200 },
  { id: 2, name: "Mouse", price: 600 },
  { id: 3, name: "Monitor", price: 8000 },
  { id: 4, name: "Mousepad", price: 300 },
];

const App = () => {
  console.log("App rendering...");

  const [count, setCount] = useState(0);
  const [q, setQ] = useState("");
  const [cart, setCart] = useState([]); // [{id, name, price, qty}]

  const list = useMemo(() => {
    console.log("filtering...");
    return items.filter((i) => i.name.toLowerCase().includes(q.toLowerCase()));
  }, [q]);

  // total ab cart se calculate hota hai, cart change hone pe hi chalega
  const total = useMemo(() => {
    console.log("total calculating...");
    return cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  }, [cart]);

  // add: item cart me hai to qty badhao, warna naya daalo
  // prev use kiya, isliye deps [] (stale state ka issue nahi)
  const add = useCallback((item) => {
    setCart((prev) => {
      const found = prev.find((i) => i.id === item.id);
      if (found) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
      }
      return [...prev, { ...item, qty: 1 }];
    });
  }, []);

  const remove = useCallback((id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }, []);

  return (
    <div>
      <h2>Mini Shop</h2>
      <button onClick={() => setCount(count + 1)}>Counter: {count}</button>

      <input
        placeholder="search..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      <h3>Products</h3>
      {list.map((i) => (
        <Card key={i.id} item={i} onAdd={add} />
      ))}

      <h3>Cart (Total: Rs.{total})</h3>
      {cart.map((i) => (
        <CartItem key={i.id} item={i} onRemove={remove} />
      ))}
    </div>
  );
};

export default App;