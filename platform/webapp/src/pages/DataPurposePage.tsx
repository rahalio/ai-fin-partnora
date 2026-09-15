import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api, type ListEnvelope } from "../lib/api";

type Purpose = {
  dataPurposeId: string;
  dealId: string;
  purpose: string;
  retentionDays: number;
  aadhaarLinked?: boolean;
};

export function DataPurposePage() {
  const [params] = useSearchParams();
  const dealId = params.get("dealId") || "";
  const [items, setItems] = useState<Purpose[]>([]);
  const [exportMsg, setExportMsg] = useState<string | null>(null);

  async function refresh() {
    const q = dealId ? `?dealId=${encodeURIComponent(dealId)}` : "";
    const res = await api<ListEnvelope<Purpose>>(`/v1/data-purposes${q}`);
    setItems(res.data.items ?? []);
  }

  useEffect(() => {
    refresh().catch(console.error);
  }, [dealId]);

  return (
    <section>
      <h1 className="page-title">Data-purpose rooms</h1>
      <p className="page-lead">
        Purpose limitation and retention per partner. Bulk export outside purpose is blocked (BR-7). Aadhaar-linked data
        needs caution.
      </p>
      <div className="toolbar">
        <button
          className="btn"
          type="button"
          disabled={!dealId}
          onClick={async () => {
            await api("/v1/data-purposes", {
              method: "POST",
              body: JSON.stringify({
                dealId,
                purpose: "inclusion-activation-analytics",
                retentionDays: 365,
                aadhaarLinked: false,
                attributes: ["activationEvent", "geographyCluster"],
              }),
            });
            await refresh();
          }}
        >
          Grant purpose
        </button>
        <button
          className="btn btn-ghost"
          type="button"
          onClick={async () => {
            const res = await api<{ data: { allowed: boolean; reason: string } }>("/v1/data-purposes/export-check", {
              method: "POST",
              body: JSON.stringify({
                dealId: dealId || "deal_x",
                purpose: "",
                attributeCount: 5000,
              }),
            });
            setExportMsg(`${res.data.allowed ? "Allowed" : "Blocked"}: ${res.data.reason}`);
          }}
        >
          Test unlawful export
        </button>
      </div>
      {exportMsg && <div className="lock-banner gate-banner">{exportMsg}</div>}
      <table className="ledger">
        <thead>
          <tr>
            <th>Purpose</th>
            <th>Retention</th>
            <th>Aadhaar</th>
          </tr>
        </thead>
        <tbody>
          {items.map((p) => (
            <tr key={p.dataPurposeId}>
              <td>{p.purpose}</td>
              <td className="mono">{p.retentionDays}d</td>
              <td>{p.aadhaarLinked ? "yes" : "no"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
