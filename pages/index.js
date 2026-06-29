export default function Home() {
  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      <h1>💰 Money Manager</h1>

      <h2>ยอดคงเหลือ: 0 บาท</h2>

      <button>+ รายรับ</button>
      <button style={{ marginLeft: 10 }}>- รายจ่าย</button>

      <hr />

      <p>ระบบพร้อมทำงาน 🎉</p>
    </div>
  );
}
