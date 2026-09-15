import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api, type ListEnvelope } from "../lib/api";

type Gate = {
  gateId: string;
  dealId: string;
  gateType: string;
  status: string;
  evidenceUri?: string;
};

export function GatesPage() {
  const [params] = useSearchParams();
  const dealId = params.get("dealId") || "";
  const [items, setItems] = useState<Gate[]>([]);

  async function refresh() {
    if (!dealId) return;
    const res = await api<ListEnvelope<Gate>>(`/v1/deals/${dealId}/gates`);
    setItems(res.data.items ?? []);
  }

  useEffect(() => {
    refresh().catch(console.error);
  }, [dealId]);

  return (
    <section>
      <h1 className="page-title">Compliance launch gates</h1>
      <p className="page-lead">
        RBI outsourcing, KYC/AML, and data-sharing checklists gate launch. Incomplete checklists cannot go live (BR-3).
      </p>
      {!dealId && <div className="empty">Select a deal from Deal workspace to manage gates.</div>}
      {dealId && (
        <>
          <div className="toolbar">
            <span className="mono">deal {dealId}</span>
            {(["outsourcing", "kycAml", "dataSharing", "consumerProtection"] as const).map((gateType) => (
              <button
                key={gateType}
                className="btn btn-ghost"
                type="button"
                onClick={async () => {
                  await api(`/v1/deals/${dealId}/gates`, {
                    method: "POST",
                    body: JSON.stringify({
                      gateType,
                      evidenceUri: `https://evidence.partnora.local/${gateType}`,
                      notes: "Sandbox evidence pack",
                    }),
                  });
                  await refresh();
                }}
              >
                Add {gateType}
              </button>
            ))}
          </div>
          <table className="ledger">
            <thead>
              <tr>
                <th>Type</th>
                <th>Status</th>
                <th>Evidence</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {items.map((g) => (
                <tr key={g.gateId}>
                  <td className="mono">{g.gateType}</td>
                  <td>
                    <span className={`chip ${g.status === "passed" ? "chip-ok" : "chip-gate-open"}`}>{g.status}</span>
                  </td>
                  <td className="mono">{g.evidenceUri || "—"}</td>
                  <td>
                    <button
                      className="btn btn-ghost"
                      type="button"
                      onClick={async () => {
                        await api(`/v1/deals/${dealId}/gates/${g.gateId}`, {
                          method: "POST",
                          body: JSON.stringify({ status: "passed" }),
                        });
                        await refresh();
                      }}
                    >
                      Pass
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </section>
  );
}
