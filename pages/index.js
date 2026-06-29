"use client";

import { useState } from "react";

export default function Home() {
  const [balance, setBalance] = useState(0);
  const [items, setItems] = useState([]);

  function addIncome() {
    const amount = Number(prompt("รายรับกี่บาท?"));
    if (!amount) return;

    setBalance(balance + amount);

    setItems([
      { type: "➕ รายรับ", amount },
      ...items,
    ]);
  }

  function addExpense() {
    const amount = Number(prompt("รายจ่ายกี่บาท?"));
    if (!amount) return;

    setBalance(balance - amount);

    setItems([
      { type: "➖ รายจ่าย", amount },
      ...items,
    ]);
  }

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>💰 Money Manager</h1>

      <h2>ยอดคงเหลือ: {balance} บาท</h2>

      <button onClick={addIncome}>+ เพิ่มรายรับ</button>
      <button onClick={addExpense} style={{ marginLeft: 10 }}>
        - เพิ่มรายจ่าย
      </button>

      <hr />

      <h3>รายการ</h3>
      <ul>
        {items.map((item, i) => (
          <li key={i}>
            {item.type} {item.amount} บาท
          </li>
        ))}
      </ul>
    </div>
  );
}
