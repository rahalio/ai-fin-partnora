import { useEffect, useState } from "react";
import { api, type ListEnvelope } from "../lib/api";

type AuditExport = {
  auditExportId: string;
  status: string;
  periodFrom: string;
  periodTo: string;
  downloadUri?: string;
  integrityHash?: string;
};

export function AuditsPage() {
  const [items, setItems] = useState<AuditExport[]>([]);

  async function refresh() {
    const res = await api<ListEnvelope<AuditExport>>("/v1/audits/exports");
    setItems(res.data.items ?? []);
  }

  useEffect(() => {
    refresh().catch(console.error);
  }, []);

  return (
    <section>
      <h1 className="page-title">Audit and board export</h1>
      <p className="page-lead">
        Active deals, gate status, incidents, and KPI attainment for board and regulator inquiries (BR-11).
      </p>
      <div className="toolbar">
        <button
          className="btn"
          type="button"
          onClick={async () => {
            const to = new Date();
            const from = new Date();
            from.setMonth(from.getMonth() - 1);
            await api("/v1/audits/exports", {
              method: "POST",
              body: JSON.stringify({
                periodFrom: from.toISOString(),
                periodTo: to.toISOString(),
              }),
            });
            await refresh();
          }}
        >
          Generate pack
        </button>
      </div>
      <table className="ledger">
        <thead>
          <tr>
            <th>Export</th>
            <th>Period</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((a) => (
            <tr key={a.auditExportId}>
              <td className="mono">{a.auditExportId}</td>
              <td className="mono">
                {a.periodFrom?.slice(0, 10)} → {a.periodTo?.slice(0, 10)}
              </td>
              <td>
                <span className="chip chip-peacock">{a.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
