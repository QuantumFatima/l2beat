import { type MultiIndexerEntry, toIndexerId } from '@l2beat/config'
import { db } from '~/server/database'

const MAX_CONFIGURATIONS_LENGTH_FOR_QUERY = 100

export async function getConfigurations(
  entries: (MultiIndexerEntry & { configId: string })[],
) {
  if (entries.length <= MAX_CONFIGURATIONS_LENGTH_FOR_QUERY) {
    return db.indexerConfiguration.getByConfigurationIds(
      entries.map((c) => c.configId),
    )
  }

  const indexerIds = [...new Set(entries.map(toIndexerId)).values()]

  const configurations =
    await db.indexerConfiguration.getByIndexerIds(indexerIds)

  const requestedIds = new Set(entries.map((c) => c.configId))

  return configurations.filter((c) => requestedIds.has(c.id))
}
