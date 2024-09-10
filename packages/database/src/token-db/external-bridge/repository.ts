import { assert } from '@l2beat/shared-pure'
import { BaseRepository } from '../../BaseRepository'
import { ExternalBridgeRecord, toRecord, toRow } from './entity'
import { selectExternalBridge } from './select'

export class ExternalBridgeRepository extends BaseRepository {
  async getAll(): Promise<ExternalBridgeRecord[]> {
    const rows = await this.db
      .selectFrom('ExternalBridge')
      .select(selectExternalBridge)
      .execute()
    return rows.map(toRecord)
  }

  async upsert(record: ExternalBridgeRecord): Promise<string> {
    const row = toRow(record)
    const res = await this.db
      .insertInto('ExternalBridge')
      .values(row)
      .onConflict((cb) => cb.doNothing())
      .returning('ExternalBridge.id')
      .executeTakeFirst()
    assert(res, 'Failed to upsert external bridge')
    return res.id
  }
}
