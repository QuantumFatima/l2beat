import { BaseRepository } from '../../BaseRepository'
import { DeploymentRecord, toRecord, toRow } from './entity'
import { selectDeployment } from './select'

export class DeploymentRepository extends BaseRepository {
  async getAll(): Promise<DeploymentRecord[]> {
    const rows = await this.db
      .selectFrom('Deployment')
      .select(selectDeployment)
      .execute()
    return rows.map(toRecord)
  }

  async upsert(record: DeploymentRecord): Promise<void> {
    const row = toRow(record)
    await this.db
      .insertInto('Deployment')
      .values(row)
      .onConflict((cb) =>
        cb.column('tokenId').doUpdateSet((eb) => ({
          tokenId: eb.ref('excluded.tokenId'),
          txHash: eb.ref('excluded.txHash'),
          blockNumber: eb.ref('excluded.blockNumber'),
          timestamp: eb.ref('excluded.timestamp'),
          from: eb.ref('excluded.from'),
          to: eb.ref('excluded.to'),
          isDeployerEoa: eb.ref('excluded.isDeployerEoa'),
          sourceAvailable: eb.ref('excluded.sourceAvailable'),
        })),
      )
      .execute()
  }
}
