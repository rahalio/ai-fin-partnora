import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api, type ListEnvelope } from "../lib/api";

type Snapshot = {
  economicsSnapshotId: string;
  dealId: string;
  period: string;
  costToServe: number;
  feeIncome: number;
  floatIncome: number;
  valueDestroying?: boolean;
};

export function EconomicsPage() {
  const [params] = useSearchParams();
  const dealId = params.get("dealId") || "";
  const [items, setItems] = useState<Snapshot[]>([]);

  async function refresh() {
    if (!dealId) return;
    const res = await api<ListEnvelope<Snapshot>>(`/v1/economics?dealId=${encodeURIComponent(dealId)}`);
    setItems(res.data.items ?? []);
  }

  useEffect(() => {
    refresh().catch(console.error);
  }, [dealId]);

  return (
    <section>
      <h1 className="page-title">Unit economics</h1>
      <p className="page-lead">
        Cost to acquire/serve vs float and fee income under payments-bank deposit-cap constraints (BR-9).
      </p>
      {!dealId && <div className="empty">Open from a live deal to close a monthly snapshot.</div>}
      {dealId && (
        <>
          <div className="toolbar">
            <button
              className="btn"
              type="button"
              onClick={async () => {
                await api("/v1/economics", {
                  method: "POST",
                  body: JSON.stringify({
                    dealId,
                    period: "2026-09",
                    costToServe: 42.5,
                    feeIncome: 28.0,
                    floatIncome: 11.2,
                  }),
                });
                await refresh();
              }}
            >
              Close month
            </button>
          </div>
          <table className="ledger">
            <thead>
              <tr>
                <th>Period</th>
                <th>Cost to serve</th>
                <th>Fee</th>
                <th>Float</th>
                <th>Signal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((s) => {
                const destroying = s.costToServe > s.feeIncome + s.floatIncome;
                return (
                  <tr key={s.economicsSnapshotId}>
                    <td className="mono">{s.period}</td>
                    <td className="mono">{s.costToServe}</td>
                    <td className="mono">{s.feeIncome}</td>
                    <td className="mono">{s.floatIncome}</td>
                    <td>
                      {destroying ? (
                        <span className="chip chip-gate-open">value-destroying</span>
                      ) : (
                        <span className="chip chip-ok">viable</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </section>
  );
}
