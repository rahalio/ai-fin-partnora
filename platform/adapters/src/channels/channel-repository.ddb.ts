/**
 * ChannelRepositoryDdb — in-memory sandbox (no x-dynamodb on OpenAPI ops).
 * HAND-MAINTAINED sandbox for local/dev.
 */

import type { ChannelRepository } from "@partnora/services/channels";
import { createSandboxRepository } from "../_shared/sandbox-entity-store.js";

const _sandbox = createSandboxRepository("channels", "channelNodeId", ["listChannelNodes", "createChannelNode", "getChannelNode"]);

export class ChannelRepositoryDdb implements ChannelRepository {
  constructor(private readonly dynamoClient: unknown) {}

  async listChannelNodes(input: Parameters<ChannelRepository['listChannelNodes']>[0]): Promise<Awaited<ReturnType<ChannelRepository['listChannelNodes']>>> {
    return _sandbox.listChannelNodes(input) as Promise<Awaited<ReturnType<ChannelRepository['listChannelNodes']>>>;
  }

  async createChannelNode(input: Parameters<ChannelRepository['createChannelNode']>[0]): Promise<Awaited<ReturnType<ChannelRepository['createChannelNode']>>> {
    return _sandbox.createChannelNode(input) as Promise<Awaited<ReturnType<ChannelRepository['createChannelNode']>>>;
  }

  async getChannelNode(input: Parameters<ChannelRepository['getChannelNode']>[0]): Promise<Awaited<ReturnType<ChannelRepository['getChannelNode']>>> {
    return _sandbox.getChannelNode(input) as Promise<Awaited<ReturnType<ChannelRepository['getChannelNode']>>>;
  }
}
