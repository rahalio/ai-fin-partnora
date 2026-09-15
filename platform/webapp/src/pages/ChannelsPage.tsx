import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api, type ListEnvelope } from "../lib/api";

type ChannelNode = {
  channelNodeId: string;
  dealId: string;
  nodeType: string;
  geography: string;
  activations?: number;
  dormancyRate?: number;
};

export function ChannelsPage() {
  const [params] = useSearchParams();
  const dealId = params.get("dealId") || "";
  const [items, setItems] = useState<ChannelNode[]>([]);

  async function refresh() {
    const q = dealId ? `?dealId=${encodeURIComponent(dealId)}` : "";
    const res = await api<ListEnvelope<ChannelNode>>(`/v1/channels${q}`);
    setItems(res.data.items ?? []);
  }

  useEffect(() => {
    refresh().catch(console.error);
  }, [dealId]);

  return (
    <section>
      <h1 className="page-title">Last-mile channels</h1>
      <p className="page-lead">
        BC, merchant, telco, and NGO performance at partner and geography grain — not vanity national totals (BR-5).
      </p>
      <div className="toolbar">
        <button
          className="btn"
          type="button"
          disabled={!dealId}
          onClick={async () => {
            await api("/v1/channels", {
              method: "POST",
              body: JSON.stringify({
                dealId,
                nodeType: "bc",
                geography: "UP-Varanasi-cluster",
              }),
            });
            await refresh();
          }}
        >
          Add BC node
        </button>
      </div>
      <table className="ledger">
        <thead>
          <tr>
            <th>Node</th>
            <th>Type</th>
            <th>Geography</th>
            <th>Activations</th>
            <th>Dormancy</th>
          </tr>
        </thead>
        <tbody>
          {items.map((n) => (
            <tr key={n.channelNodeId}>
              <td className="mono">{n.channelNodeId}</td>
              <td>{n.nodeType}</td>
              <td>{n.geography}</td>
              <td className="mono">{n.activations ?? 0}</td>
              <td className="mono">{n.dormancyRate ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {items.length === 0 && <div className="empty">Prompt for geography grain before national rollups.</div>}
    </section>
  );
}
