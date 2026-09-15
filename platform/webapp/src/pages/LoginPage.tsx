import { useNavigate } from "react-router-dom";
import { useState, type FormEvent } from "react";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("admin@demo.local");
  const [password, setPassword] = useState("sandbox-admin-8");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    // Sandbox: API-key auth powers product APIs; login is operator UX entry.
    sessionStorage.setItem("partnora.operator", JSON.stringify({ email }));
    navigate("/pipeline");
  }

  return (
    <div className="login-hero">
      <div className="login-panel">
        <p className="brand">Partnora</p>
        <h1>Partnerships with postures. Not press releases.</h1>
        <form onSubmit={onSubmit}>
          <label className="field">
            Email
            <input value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username" />
          </label>
          <label className="field">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </label>
          <button className="btn" type="submit">
            Enter deal floor
          </button>
        </form>
      </div>
    </div>
  );
}
