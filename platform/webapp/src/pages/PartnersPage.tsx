import { useEffect, useState } from "react";
import { api, type ListEnvelope } from "../lib/api";

type Partner = {
  partnerId: string;
  name: string;
  posture: string;
  prohibitedActivities?: string[];
};

export function PartnersPage() {
  const [items, setItems] = useState<Partner[]>([]);

  useEffect(() => {
    api<ListEnvelope<Partner>>("/v1/partners")
      .then((res) => setItems(res.data.items ?? []))
      .catch(console.error);
  }, []);

  return (
    <section>
      <h1 className="page-title">Partner master</h1>
      <p className="page-lead">Regulatory posture and prohibited activities as hard locks (BR-1).</p>
      <table className="ledger">
        <thead>
          <tr>
            <th>Name</th>
            <th>Posture</th>
            <th>Prohibited</th>
          </tr>
        </thead>
        <tbody>
          {items.map((p) => (
            <tr key={p.partnerId}>
              <td>{p.name}</td>
              <td>
                <span className="chip chip-posture">{p.posture}</span>
              </td>
              <td className="mono">{(p.prohibitedActivities || []).join(", ") || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
