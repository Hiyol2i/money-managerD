"use client";

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export default function Home() {
  const [balance, setBalance] = useState(0);
  const [items, setItems] = useState([]);
  const [dark, setDark] = useState(true);

  const [type, setType] = useState("income");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("อาหาร");
  const [note, setNote] = useState("");

  /* 💾 LOAD DATA */
  useEffect(() => {
    const saved = localStorage.getItem("money-data");
    if (saved) {
      const data = JSON.parse(saved);
      setItems(data.items || []);
      setBalance(data.balance || 0);
    }
  }, []);

  /* 💾 SAVE DATA */
  useEffect(() => {
    localStorage.setItem(
      "money-data",
      JSON.stringify({ balance, items })
    );
  }, [balance, items]);

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

  /* 📊 CHART DATA */
  const chartData = [
    {
      name: "Income",
      value: items
        .filter((i) => i.type === "income")
        .reduce((a, b) => a + b.amount, 0)
    },
    {
      name: "Expense",
      value: items
        .filter((i) => i.type === "expense")
        .reduce((a, b) => a + b.amount, 0)
    }
  ];

  return (
    <div style={{ ...styles.bg, background: theme.bg, color: theme.text }}>
      <div style={styles.container}>

        {/* TOP BAR */}
        <div style={styles.topbar}>
          <h1 style={styles.title}>Money Manager</h1>

          <button onClick={() => setDark(!dark)} style={styles.toggle}>
            {dark ? "🌙" : "☀️"}
          </button>
        </div>

        {/* BALANCE */}
        <div style={{ ...styles.balanceCard, background: theme.card }}>
          <p style={{ opacity: 0.6 }}>Balance</p>
          <h2 style={{ fontSize: 36 }}>
            {balance.toLocaleString()} ฿
          </h2>
        </div>

        {/* FORM */}
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

        {/* 📊 REAL CHART */}
        <div style={styles.chartBox}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* LIST */}
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

/* 🎨 STYLE */
const styles = {
  bg: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    padding: 20,
    fontFamily: "sans-serif"
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
    fontWeight: "bold"
  },
  toggle: {
    border: "none",
    padding: 10,
    borderRadius: 12,
    cursor: "pointer"
  },
  balanceCard: {
    padding: 20,
    borderRadius: 20,
    marginTop: 10,
    backdropFilter: "blur(20px)"
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
    justifyContent: "space-between"
  },
  chartBox: {
    marginTop: 20,
    padding: 15,
    borderRadius: 20,
    background: "rgba(255,255,255,0.05)"
  }
};
