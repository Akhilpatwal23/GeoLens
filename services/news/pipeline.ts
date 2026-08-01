import { aggregateNews } from "./aggregator";

import { removeDuplicates } from "./deduplicator";

export async function buildNewsPipeline() {

    const raw = await aggregateNews();

    return removeDuplicates(raw);

}