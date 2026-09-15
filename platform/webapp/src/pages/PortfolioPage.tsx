import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api, type ListEnvelope } from "../lib/api";

type Deal = {
  dealId: string;
  status: string;
  commercialModel: string;
  inclusionKpis?: Array<{ name: string; target: number; actual?: number }>;
};

export function PortfolioPage() {
  const [items, setItems] = useState<Deal[]>([]);

  useEffect(() => {
    api<ListEnvelope<Deal>>("/v1/deals?status=live")
      .then((res) => setItems((res.data.items ?? []).filter((d) => d.status === "live" || d.status === "remediating")))
      .catch(console.error);
  }, []);

  return (
    <section>
      <h1 className="page-title">Live partnership portfolio</h1>
      <p className="page-lead">KPI health per live deal. Underperformers face remediation or exit.</p>
      <div className="kpi-row">
        <div className="kpi">
          <strong>{items.length}</strong>
          Live deals
        </div>
        <div className="kpi">
          <strong className="mono" style={{ color: "var(--color-peacock)" }}>
            peacock
          </strong>
          Inclusion KPI pulse
        </div>
      </div>
      {items.length === 0 ? (
        <div className="empty">
          No live deals yet. <Link to="/pipeline">Score an opportunity</Link> and clear compliance gates.
        </div>
      ) : (
        <table className="ledger">
          <thead>
            <tr>
              <th>Deal</th>
              <th>Model</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((d) => (
              <tr key={d.dealId}>
                <td className="mono">{d.dealId}</td>
                <td>{d.commercialModel}</td>
                <td>
                  <span className="chip chip-ok">{d.status}</span>
                </td>
                <td>
                  <Link to={`/channels?dealId=${d.dealId}`}>Channels</Link>
                  {" · "}
                  <Link to={`/economics?dealId=${d.dealId}`}>Economics</Link>
                  {" · "}
                  <Link to={`/conflicts?dealId=${d.dealId}`}>Conflicts</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}
