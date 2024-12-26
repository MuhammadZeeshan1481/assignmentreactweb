import './App.css';
import React, { useState } from "react";

function App() {
  const [items, setItems] = useState([]),
   [name, setName] = useState(""), 
   [rate, setRate] = useState(""),
   [qty, setQty] = useState(""), 
   [editIndex, setEditIndex] = useState(null);

  const addItem = () => {
    const newItem = { id: Date.now(), name, rate: +rate, qty: +qty };
    setItems(editIndex !== null ? items.map((item, i) => (i === editIndex ? newItem : item)):[...items, newItem]);
    setName(""); setRate(""); setQty(""); setEditIndex(null);
  };

  return (
    <div>
      <h2>Shopping List</h2>
      {[setName, setRate, setQty].map((fn, i) => (
        <input key={i} placeholder={["Enter Product Name", "Rate", "Quantity"][i]} value={[name, rate, qty][i]} onChange={(e) => fn(e.target.value)} type={i > 0 ? "number" : "text"} />
      ))}
      <button onClick={addItem}>{editIndex !== null ? "Update" : "Add"}</button>
      <table border="1" style={{ marginTop: "10px", width: "100%", textAlign: "center" }}>
        <thead><tr>{["ID", "Name", "Rate", "Qty", "Total", "Actions"].map((h, i) =>
         <th key={i}>{h}</th>)}</tr></thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id}>
              {[index + 1, item.name, item.rate, item.qty, item.rate * item.qty].map((val, i) => <td key={i}>{val}</td>)}
              <td>
                <button onClick={() => (setName(item.name), setRate(item.rate), setQty(item.qty), setEditIndex(index))}>Edit</button>
                <button onClick={() => setItems(items.filter((_, i) => i !== index))}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">Grand Total:</td>
            <td>{items.reduce((sum, { rate, qty }) => sum + rate * qty, 0)}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default App;