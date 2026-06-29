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
      note,
      time: new Date().toLocaleString()
    };

    setBalance(type === "income" ? balance + num : balance - num);
    setItems([newItem, ...items]);

    setAmount("");
    setNote("");
  }

  return (
    <div style={styles.bg}>
      <div style={styles.container}>

        {/* Header */}
        <h1 style={styles.title}>💎 Money Manager</h1>

        {/* Balance Card */}
        <div style={styles.balanceCard}>
          <p style={{ opacity: 0.7 }}>ยอดคงเหลือ</p>
          <h2 style={{ fontSize: 32 }}>{balance.toLocaleString()} ฿</h2>
        </div>

        {/* Form Card */}
        <div style={styles.card}>

          <select value={type} onChange={(e) => setType(e.target.value)} style={styles.input}>
            <option value="income">➕ รายรับ</option>
            <option value="expense">➖ รายจ่าย</option>
          </select>

          <input
            placeholder="จำนวนเงิน"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={styles.input}
          />

          <select value={category} onChange={(e) => setCategory(e.target.value)} style={styles.input}>
            <option>🍔 อาหาร</option>
            <option>🚗 เดินทาง</option>
            <option>📚 การเรียน</option>
            <option>🛍 ของใช้</option>
          </select>

          <input
            placeholder="รายละเอียด"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={styles.input}
          />

          <button onClick={addItem} style={styles.button}>
            บันทึกรายการ
          </button>
        </div>

        {/* List */}
        <div style={{ marginTop: 20 }}>
          {items.map((item, i) => (
            <div key={i} style={styles.item}>
              <div>
                <b>
                  {item.type === "income" ? "🟢 +" : "🔴 -"} {item.amount} ฿
                </b>
                <p style={{ margin: 0, opacity: 0.7 }}>
                  {item.category} • {item.note}
                </p>
              </div>
              <span style={{ fontSize: 12, opacity: 0.5 }}>
                {item.time}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

const styles = {
  bg: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    display: "flex",
    justifyContent: "center",
    padding: 20,
    color: "white",
    fontFamily: "sans-serif"
  },
  container: {
    width: "100%",
    maxWidth: 420
  },
  title: {
    textAlign: "center",
    marginBottom: 20
  },
  balanceCard: {
    background: "rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
    padding: 20,
    borderRadius: 16,
    textAlign: "center",
    marginBottom: 20
  },
  card: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(10px)",
    padding: 15,
    borderRadius: 16
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    border: "none",
    outline: "none"
  },
  button: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: "none",
    background: "linear-gradient(90deg, #06b6d4, #3b82f6)",
    color: "white",
    fontWeight: "bold"
  },
  item: {
    display: "flex",
    justifyContent: "space-between",
    padding: 12,
    marginTop: 10,
    background: "rgba(255,255,255,0.08)",
    borderRadius: 12
  }
};
