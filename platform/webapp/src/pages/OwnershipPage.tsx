import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api, type ListEnvelope } from "../lib/api";

type Rule = {
  ownershipRuleId: string;
  dealId: string;
  journeyStep: string;
  ownerParty: string;
  complaintLiability: string;
  routingSlaHours?: number;
};

export function OwnershipPage() {
  const [params] = useSearchParams();
  const dealId = params.get("dealId") || "";
  const [items, setItems] = useState<Rule[]>([]);

  async function refresh() {
    const q = dealId ? `?dealId=${encodeURIComponent(dealId)}` : "";
    const res = await api<ListEnvelope<Rule>>(`/v1/ownership-rules${q}`);
    setItems(res.data.items ?? []);
  }

  useEffect(() => {
    refresh().catch(console.error);
  }, [dealId]);

  return (
    <section>
      <h1 className="page-title">Customer ownership</h1>
      <p className="page-lead">
        Explicit ownership and complaint liability per journey step — no bounce between bank and partner (BR-6).
      </p>
      <div className="toolbar">
        <button
          className="btn"
          type="button"
          disabled={!dealId}
          onClick={async () => {
            await api("/v1/ownership-rules", {
              method: "POST",
              body: JSON.stringify({
                dealId,
                journeyStep: "onboarding-assisted-kyc",
                ownerParty: "partner-bc",
                complaintLiability: "bank",
                routingSlaHours: 24,
              }),
            });
            await refresh();
          }}
        >
          Publish routing
        </button>
      </div>
      <table className="ledger">
        <thead>
          <tr>
            <th>Journey step</th>
            <th>Owner</th>
            <th>Complaint liability</th>
            <th>SLA (h)</th>
          </tr>
        </thead>
        <tbody>
          {items.map((r) => (
            <tr key={r.ownershipRuleId}>
              <td>{r.journeyStep}</td>
              <td className="mono">{r.ownerParty}</td>
              <td className="mono">{r.complaintLiability}</td>
              <td className="mono">{r.routingSlaHours ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
