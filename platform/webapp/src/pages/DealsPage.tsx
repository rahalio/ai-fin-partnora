import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { api, type ListEnvelope } from "../lib/api";

type Deal = {
  dealId: string;
  opportunityId?: string;
  status: string;
  commercialModel: string;
  exitTerms?: string;
  gatesComplete?: boolean;
  inclusionKpis?: Array<{ name: string; target: number; actual?: number }>;
  commercialTerms?: { bankRole?: string; partnerRole?: string };
  launchBlocked?: boolean;
  launchBlockReason?: string;
};

export function DealsPage() {
  const [params] = useSearchParams();
  const [items, setItems] = useState<Deal[]>([]);
  const [selected, setSelected] = useState<Deal | null>(null);

  async function refresh() {
    const res = await api<ListEnvelope<Deal>>("/v1/deals");
    setItems(res.data.items ?? []);
  }

  useEffect(() => {
    refresh().catch(console.error);
  }, []);

  return (
    <section>
      <h1 className="page-title">Deal workspace</h1>
      <p className="page-lead">
        Encode commercial model, inclusion KPIs, and exit terms before go-live. Asymmetric roles stay visible.
      </p>

      <div className="lock-banner">
        <span className="chip chip-posture">PB lock</span>
        <div>
          Payments-bank posture: lending and credit-book activities are hard-blocked (BR-1). Exit terms are required
          before gate submit (BR-2).
        </div>
      </div>

      <div className="toolbar">
        <button
          className="btn"
          type="button"
          onClick={async () => {
            await api("/v1/deals", {
              method: "POST",
              body: JSON.stringify({
                opportunityId: params.get("from") || "opp_draft",
                commercialModel: "revenueShare",
                exitTerms: "90-day wind-down; customer ownership reverts to bank",
                commercialTerms: {
                  model: "revenueShare",
                  bankRole: "Scale, compliance, custody of float",
                  partnerRole: "Last-mile distribution and UX",
                  shareBps: 3500,
                  currency: "INR",
                },
                inclusionKpis: [
                  { name: "activations", target: 10000, unit: "accounts" },
                  { name: "dormancyRate", target: 0.2, unit: "ratio" },
                ],
              }),
            });
            await refresh();
          }}
        >
          Draft deal
        </button>
      </div>

      <div className="term-sheet">
        <div className="term-col">
          <h3>Bank column</h3>
          <p>{selected?.commercialTerms?.bankRole || "Scale, RBI compliance, float custody"}</p>
        </div>
        <div className="term-col">
          <h3>Partner column</h3>
          <p>{selected?.commercialTerms?.partnerRole || "Agility, distribution, product UX"}</p>
        </div>
      </div>

      <table className="ledger">
        <thead>
          <tr>
            <th>Deal</th>
            <th>Model</th>
            <th>Status</th>
            <th>Gates</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {items.map((d) => (
            <tr key={d.dealId} onClick={() => setSelected(d)} style={{ cursor: "pointer" }}>
              <td className="mono">{d.dealId}</td>
              <td>{d.commercialModel}</td>
              <td>
                <span className={`chip ${d.status === "live" ? "chip-ok" : "chip-peacock"}`}>{d.status}</span>
              </td>
              <td>
                {d.gatesComplete ? (
                  <span className="chip chip-ok">complete</span>
                ) : (
                  <span className="chip chip-gate-open">open</span>
                )}
              </td>
              <td>
                <Link to={`/gates?dealId=${d.dealId}`}>Gates</Link>
                {" · "}
                <Link to={`/ownership?dealId=${d.dealId}`}>Ownership</Link>
                {" · "}
                <Link to={`/datapurpose?dealId=${d.dealId}`}>Data purpose</Link>
                {" · "}
                <Link to={`/pilots?dealId=${d.dealId}`}>Pilots</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <div className="toolbar" style={{ marginTop: 16 }}>
          <button
            className="btn btn-ghost"
            type="button"
            onClick={async () => {
              await api(`/v1/deals/${selected.dealId}/submit-gates`, { method: "POST" });
              await refresh();
            }}
          >
            Submit to gates
          </button>
          <button
            className="btn"
            type="button"
            onClick={async () => {
              const res = await api<{ data: Deal }>(`/v1/deals/${selected.dealId}/launch`, { method: "POST" });
              setSelected(res.data);
              await refresh();
            }}
          >
            Launch
          </button>
          <Link to="/ma-reassessment">M&A reassessment</Link>
        </div>
      )}
      {selected?.launchBlocked && (
        <div className="lock-banner gate-banner">{selected.launchBlockReason}</div>
      )}
    </section>
  );
}
