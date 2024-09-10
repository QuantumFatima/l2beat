import { assert } from '@l2beat/shared-pure'
import { BaseRepository } from '../../BaseRepository'
import { TokenMetaRecord, toRecord, toRow } from './entity'
import { selectTokenMeta } from './select'

export class TokenMetaRepository extends BaseRepository {
  async getAll(): Promise<TokenMetaRecord[]> {
    const rows = await this.db
      .selectFrom('TokenMeta')
      .select(selectTokenMeta)
      .execute()
    return rows.map(toRecord)
  }

  async upsert(record: TokenMetaRecord): Promise<string> {
    const row = toRow(record)
    const result = await this.db
      .insertInto('TokenMeta')
      .values(row)
      .onConflict((b) => b.columns(['tokenId', 'source']).doUpdateSet(row))
      .returning('TokenMeta.id')
      .executeTakeFirst()
    assert(result, 'Failed to upsert token meta')
    return result.id
  }
  async upsertMany(records: TokenMetaRecord[]): Promise<number> {
    if (records.length === 0) return 0

    const rows = records.map(toRow)
    await this.batch(rows, 1_000, async (batch) => {
      await this.db
        .insertInto('TokenMeta')
        .values(batch)
        .onConflict((cb) =>
          cb.columns(['tokenId', 'source']).doUpdateSet((eb) => ({
            tokenId: eb.ref('excluded.tokenId'),
            source: eb.ref('excluded.source'),
          })),
        )
        .returning('TokenMeta.id')
        .execute()
    })
    return records.length
  }
}
