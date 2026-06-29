"use client";

import { useState } from "react";

export default function Home() {
  const [balance, setBalance] = useState(0);
  const [items, setItems] = useState([]);
  const [dark, setDark] = useState(true);

  const [type, setType] = useState("income");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("อาหาร");
  const [note, setNote] = useState("");

  function addItem() {
    if (!amount) return;

    const num = Number(amount);

    const newItem = {
      id: Date.now(),
      type,
      amount: num,
      category,
      note,
      time: new Date().toLocaleTimeString()
    };

    setBalance(type === "income" ? balance + num : balance - num);
    setItems([newItem, ...items]);

    setAmount("");
    setNote("");
  }

  const theme = dark
    ? {
        bg: "linear-gradient(135deg,#0b1020,#111827)",
        card: "rgba(255,255,255,0.06)",
        text: "white"
      }
    : {
        bg: "linear-gradient(135deg,#f5f7ff,#eaf0ff)",
        card: "rgba(255,255,255,0.8)",
        text: "black"
      };

  return (
    <div style={{ ...styles.bg, background: theme.bg, color: theme.text }}>

      <div style={styles.container}>

        {/* TOP BAR */}
        <div style={styles.topbar}>
          <h1 style={styles.title}>Money Manager</h1>

          <button
            onClick={() => setDark(!dark)}
            style={styles.toggle}
          >
            {dark ? "🌙" : "☀️"}
          </button>
        </div>

        {/* BALANCE CARD (Apple Wallet Style) */}
        <div style={{ ...styles.balanceCard, background: theme.card }}>
          <p style={{ opacity: 0.6 }}>Balance</p>
          <h2 style={{ fontSize: 36 }}>
            {balance.toLocaleString()} ฿
          </h2>
        </div>

        {/* INPUT CARD */}
        <div style={{ ...styles.card, background: theme.card }}>

          <select value={type} onChange={(e) => setType(e.target.value)} style={styles.input}>
            <option value="income">➕ Income</option>
            <option value="expense">➖ Expense</option>
          </select>

          <input
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={styles.input}
          />

          <select value={category} onChange={(e) => setCategory(e.target.value)} style={styles.input}>
            <option>🍔 Food</option>
            <option>🚗 Transport</option>
            <option>📚 Study</option>
            <option>🛍 Shopping</option>
          </select>

          <input
            placeholder="Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={styles.input}
          />

          <button onClick={addItem} style={styles.button}>
            ✨ Add Transaction
          </button>
        </div>

        {/* MINI STATS (Fake Chart Style) */}
        <div style={styles.chartCard}>
          <div style={styles.bar}>
            <div style={{ ...styles.incomeBar, height: Math.min(balance > 0 ? balance / 10 : 10, 120) }} />
            <p>Income</p>
          </div>

          <div style={styles.bar}>
            <div style={{ ...styles.expenseBar, height: Math.min(balance < 0 ? -balance / 10 : 20, 120) }} />
            <p>Expense</p>
          </div>
        </div>

        {/* LIST with animation feel */}
        <div style={{ marginTop: 20 }}>
          {items.map((item) => (
            <div key={item.id} style={styles.item}>
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
  );
}

/* STYLE SYSTEM */
const styles = {
  bg: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    padding: 20,
    fontFamily: "sans-serif",
    transition: "0.3s"
  },
  container: {
    width: "100%",
    maxWidth: 420
  },
  topbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1
  },
  toggle: {
    border: "none",
    padding: 10,
    borderRadius: 12,
    background: "rgba(255,255,255,0.1)",
    cursor: "pointer"
  },
  balanceCard: {
    padding: 20,
    borderRadius: 20,
    marginTop: 10,
    backdropFilter: "blur(20px)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
  },
  card: {
    padding: 15,
    borderRadius: 20,
    marginTop: 15,
    backdropFilter: "blur(20px)"
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 10,
    borderRadius: 12,
    border: "none"
  },
  button: {
    width: "100%",
    padding: 12,
    borderRadius: 12,
    border: "none",
    background: "linear-gradient(90deg,#6366f1,#06b6d4)",
    color: "white",
    fontWeight: "bold"
  },
  item: {
    padding: 12,
    marginTop: 10,
    borderRadius: 16,
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(10px)",
    display: "flex",
    justifyContent: "space-between",
    transition: "0.3s"
  },
  chartCard: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: 20,
    padding: 15,
    borderRadius: 20,
    background: "rgba(255,255,255,0.05)"
  },
  bar: {
    width: 80,
    textAlign: "center"
  },
  incomeBar: {
    width: "100%",
    background: "#22c55e",
    borderRadius: 10,
    transition: "0.3s"
  },
  expenseBar: {
    width: "100%",
    background: "#ef4444",
    borderRadius: 10,
    transition: "0.3s"
  }
};
