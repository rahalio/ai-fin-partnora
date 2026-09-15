import { NavLink, Outlet } from "react-router-dom";

const NAV = [
  { to: "/pipeline", label: "Opportunity pipeline" },
  { to: "/deals", label: "Deal workspace" },
  { to: "/gates", label: "Compliance gates" },
  { to: "/portfolio", label: "Live portfolio" },
  { to: "/channels", label: "Last-mile channels" },
  { to: "/conflicts", label: "Coopetition conflicts" },
  { to: "/economics", label: "Unit economics" },
  { to: "/audits", label: "Audit exports" },
  { to: "/partners", label: "Partner master" },
];

export function AppShell() {
  return (
    <div className="app-shell">
      <aside className="app-nav">
        <p className="brand">Partnora</p>
        <p className="brand-tag">Partnerships with postures. Not press releases.</p>
        <ul className="nav-list">
          {NAV.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} className={({ isActive }) => (isActive ? "active" : undefined)}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
