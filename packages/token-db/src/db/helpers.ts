import { nanoid } from 'nanoid'
import { Simplify } from 'type-fest'
import { SourceTagParams, sourceTag } from '../utils/sourceTag.js'
import { Database, TokenMetaRecord, TokenRecord } from '@l2beat/database'

export type UpsertTokenMetaInput = Simplify<
  Omit<TokenMetaRecord, 'id' | 'source'> & {
    source: SourceTagParams
  }
>

export async function upsertTokenMeta(
  db: Database,
  { tokenId, source, ...meta }: UpsertTokenMetaInput,
) {
  await db.tokenMeta.upsert({
    id: nanoid(),
    tokenId,
    source: sourceTag(source),
    ...meta,
  })
}

export type UpsertTokenWithMetaInput = Simplify<
  Omit<TokenRecord, 'id'> &
    Omit<TokenMetaRecord, 'id' | 'tokenId' | 'source'> & {
      source: SourceTagParams
    }
>

export async function upsertTokenWithMeta(
  db: Database,
  { networkId, address, source, ...meta }: UpsertTokenWithMetaInput,
) {
  const token = { networkId, address }

  const tokenId = await db.token.upsert({
    id: nanoid(),
    ...token,
    updatedAt: new Date(),
    createdAt: new Date(),
  })

  const tokenMetaId = await db.tokenMeta.upsert({
    id: nanoid(),
    tokenId,
    source: sourceTag(source),
    ...meta,
  })

  return { tokenId, tokenMetaId }
}

export async function upsertManyTokenMeta(
  db: Database,
  metas: UpsertTokenMetaInput[],
) {
  await db.tokenMeta.upsertMany(
    metas.map(({ source, ...meta }) => ({
      id: nanoid(),
      source: sourceTag(source),
      ...meta,
    })),
  )
}

export async function upsertManyTokensWithMeta(
  db: Database,
  tokens: UpsertTokenWithMetaInput[],
) {
  await db.token.upsertMany(
    tokens.map((token) => ({
      id: nanoid(),
      networkId: token.networkId,
      address: token.address,
      updatedAt: new Date(),
      createdAt: new Date(),
    })),
  )

  const tokenEntities = await db.token.getByNetworks(
    tokens.map((token) => ({
      networkId: token.networkId,
      address: token.address,
    })),
  )

  const tokenIds = Object.fromEntries(
    tokenEntities.map((token) => [
      `${token.networkId}_${token.address}`,
      token.id,
    ]),
  )

  await db.tokenMeta.upsertMany(
    tokens.map(({ networkId, address, source, ...meta }) => ({
      id: nanoid(),
      tokenId: tokenIds[`${networkId}_${address}`] ?? '',
      source: sourceTag(source),
      ...meta,
    })),
  )

  return tokenEntities.map((token) => token.id)
}
