import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api, type ListEnvelope } from "../lib/api";

type Pilot = {
  pilotId: string;
  name: string;
  kind: string;
  parentDealId?: string;
  status: string;
};

export function PilotsPage() {
  const [params] = useSearchParams();
  const dealId = params.get("dealId") || "";
  const [items, setItems] = useState<Pilot[]>([]);

  async function refresh() {
    const res = await api<ListEnvelope<Pilot>>("/v1/pilots");
    setItems(res.data.items ?? []);
  }

  useEffect(() => {
    refresh().catch(console.error);
  }, []);

  return (
    <section>
      <h1 className="page-title">Pilot attachment</h1>
      <p className="page-lead">
        AI/RPA/blockchain/cyber pilots must reference a parent deal — no orphan shadow IT (BR-10).
      </p>
      <div className="toolbar">
        <button
          className="btn"
          type="button"
          disabled={!dealId}
          onClick={async () => {
            await api("/v1/pilots", {
              method: "POST",
              body: JSON.stringify({
                name: "BC agent assist RPA",
                kind: "rpa",
                parentDealId: dealId,
              }),
            });
            await refresh();
          }}
        >
          Attach pilot
        </button>
      </div>
      <table className="ledger">
        <thead>
          <tr>
            <th>Name</th>
            <th>Kind</th>
            <th>Parent deal</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {items.map((p) => (
            <tr key={p.pilotId}>
              <td>{p.name}</td>
              <td className="mono">{p.kind}</td>
              <td className="mono">{p.parentDealId || "ORPHAN"}</td>
              <td>
                <span className={`chip ${p.status === "quarantined" ? "chip-gate-open" : "chip-ok"}`}>{p.status}</span>
              </td>
              <td>
                {!p.parentDealId && (
                  <button
                    className="btn btn-ghost"
                    type="button"
                    onClick={async () => {
                      await api(`/v1/pilots/${p.pilotId}/quarantine`, { method: "POST" });
                      await refresh();
                    }}
                  >
                    Quarantine orphan
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
