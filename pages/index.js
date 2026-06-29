"use client";

import { useState } from "react";

export default function Home() {
  const [balance, setBalance] = useState(0);
  const [items, setItems] = useState([]);

  const [type, setType] = useState("income");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("อาหาร");
  const [note, setNote] = useState("");

  function addItem() {
    if (!amount) return;

    const num = Number(amount);

    const newItem = {
      type,
      amount: num,
      category,
      note
    };

    if (type === "income") {
      setBalance(balance + num);
    } else {
      setBalance(balance - num);
    }

    setItems([newItem, ...items]);

    setAmount("");
    setNote("");
  }

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif", background: "#f5f6fa", minHeight: "100vh" }}>
      
      <div style={{ maxWidth: 420, margin: "0 auto", background: "white", padding: 20, borderRadius: 12 }}>

        <h1>💰 Money Manager</h1>

        <h2>ยอดคงเหลือ: {balance} บาท</h2>

        <select value={type} onChange={(e) => setType(e.target.value)} style={{ width: "100%", padding: 10 }}>
          <option value="income">➕ รายรับ</option>
          <option value="expense">➖ รายจ่าย</option>
        </select>

        <input
          placeholder="จำนวนเงิน"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{ width: "100%", padding: 10, marginTop: 10 }}
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: "100%", padding: 10, marginTop: 10 }}>
          <option>อาหาร</option>
          <option>เดินทาง</option>
          <option>การเรียน</option>
          <option>ของใช้</option>
        </select>

        <input
          placeholder="รายละเอียด (เช่น ค่าข้าว)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={{ width: "100%", padding: 10, marginTop: 10 }}
        />

        <button onClick={addItem} style={{ width: "100%", padding: 10, marginTop: 10, background: "black", color: "white" }}>
          บันทึก
        </button>

        <hr />

        <h3>รายการ</h3>

        {items.map((item, i) => (
          <div key={i} style={{ padding: 10, background: "#f0f0f0", marginBottom: 8, borderRadius: 8 }}>
            <b>{item.type === "income" ? "➕" : "➖"} {item.amount} บาท</b>
            <div>{item.category} - {item.note}</div>
          </div>
        ))}

      </div>
    </div>
  );
}
