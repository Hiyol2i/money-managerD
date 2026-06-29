"use client";

import { useState } from "react";
import Head from "next/head";

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
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Arizonia&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div style={styles.bg}>
        <div style={styles.container}>

          {/* HEADER */}
          <h1 style={styles.title}>Money Manager</h1>
          <p style={styles.subtitle}>track your money beautifully</p>

          {/* BALANCE */}
          <div style={styles.balanceCard}>
            <p style={{ opacity: 0.7 }}>ยอดคงเหลือ</p>
            <h2 style={{ fontSize: 34 }}>
              {balance.toLocaleString()} ฿
            </h2>
          </div>

          {/* FORM */}
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
              + เพิ่มรายการ
            </button>
          </div>

          {/* LIST */}
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
                <span style={{ fontSize: 11, opacity: 0.5 }}>
                  {item.time}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}

const styles = {
  bg: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0b1020, #1e293b)",
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

  // ⭐ Arizonia font here
  title: {
    fontFamily: "Arizonia, cursive",
    fontSize: 52,
    textAlign: "center",
    marginBottom: 0,
    letterSpacing: 1
  },

  subtitle: {
    textAlign: "center",
    opacity: 0.6,
    marginTop: 0,
    marginBottom: 20,
    fontSize: 12
  },

  balanceCard: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(12px)",
    padding: 20,
    borderRadius: 18,
    textAlign: "center",
    marginBottom: 20,
    border: "1px solid rgba(255,255,255,0.1)"
  },

  card: {
    background: "rgba(255,255,255,0.06)",
    backdropFilter: "blur(12px)",
    padding: 15,
    borderRadius: 18,
    border: "1px solid rgba(255,255,255,0.1)"
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
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(90deg, #06b6d4, #6366f1)",
    color: "white",
    fontWeight: "bold"
  },

  item: {
    display: "flex",
    justifyContent: "space-between",
    padding: 12,
    marginTop: 10,
    background: "rgba(255,255,255,0.06)",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.08)"
  }
};
