"use client";

import { useState } from "react";

export default function Home() {
  const [balance, setBalance] = useState(0);
  const [items, setItems] = useState([]);

  function addIncome() {
    const amount = Number(prompt("รายรับกี่บาท?"));
    if (!amount) return;

    setBalance(balance + amount);
    setItems([{ type: "➕ รายรับ", amount }, ...items]);
  }

  function addExpense() {
    const amount = Number(prompt("รายจ่ายกี่บาท?"));
    if (!amount) return;

    setBalance(balance - amount);
    setItems([{ type: "➖ รายจ่าย", amount }, ...items]);
  }

  return (
    <div style={{
      padding: 20,
      fontFamily: "sans-serif",
      background: "#f5f6fa",
      minHeight: "100vh"
    }}>
      <div style={{
        maxWidth: 400,
        margin: "0 auto",
        background: "white",
        padding: 20,
        borderRadius: 12,
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
      }}>
        
        <h1 style={{ textAlign: "center" }}>💰 Money Manager</h1>

        <h2 style={{ textAlign: "center" }}>
          {balance} บาท
        </h2>

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={addIncome} style={{
            flex: 1,
            padding: 10,
            background: "green",
            color: "white",
            border: "none",
            borderRadius: 8
          }}>
            + รายรับ
          </button>

          <button onClick={addExpense} style={{
            flex: 1,
            padding: 10,
            background: "red",
            color: "white",
            border: "none",
            borderRadius: 8
          }}>
            - รายจ่าย
          </button>
        </div>

        <hr />

        <h3>รายการ</h3>

        {items.length === 0 && (
          <p style={{ color: "gray" }}>ยังไม่มีรายการ</p>
        )}

        <ul style={{ listStyle: "none", padding: 0 }}>
          {items.map((item, i) => (
            <li key={i} style={{
              padding: 10,
              marginBottom: 8,
              background: "#f0f0f0",
              borderRadius: 8
            }}>
              {item.type} {item.amount} บาท
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}
