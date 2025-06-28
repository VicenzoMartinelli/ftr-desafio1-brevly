import { PassThrough, Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import { db, pg } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import { type Either, makeRight } from '@/infra/shared/either'
import { uploadFileToStorage } from '@/infra/storage/upload-file-to-storage'
import { stringify } from 'csv-stringify'
import { ilike } from 'drizzle-orm'
import { z } from 'zod'

const exportLinksInput = z.object({
  searchQuery: z.string().optional(),
})

type ExportLinksInput = z.input<typeof exportLinksInput>

type ExportLinksOutput = {
  reportUrl: string
}

export async function exportLinks(
  input: ExportLinksInput
): Promise<Either<never, ExportLinksOutput>> {
  const { searchQuery } = exportLinksInput.parse(input)

  const { sql, params } = db
    .select({
      id: schema.links.id,
      displayUrl: schema.links.displayUrl,
      route: schema.links.route,
      url: schema.links.url,
      createdAt: schema.links.createdAt,
      hits: schema.links.hits,
    })
    .from(schema.links)
    .where(
      searchQuery ? ilike(schema.links.route, `%${searchQuery}%`) : undefined
    )
    .toSQL()

  const cursor = pg.unsafe(sql, params as string[]).cursor(10)

  const csv = stringify({
    delimiter: ',',
    header: true,
    columns: [
      { key: 'id', header: 'Id' },
      { key: 'displayUrl', header: 'Display Url' },
      { key: 'route', header: 'Route' },
      { key: 'url', header: 'URL' },
      { key: 'createdAt', header: 'Created at' },
      { key: 'hits', header: 'Hits' },
    ],
  })

  const uploadToStorageStream = new PassThrough()

  const convertToCSVPipeline = pipeline(
    cursor,
    new Transform({
      objectMode: true,
      transform(chunks: unknown[], encoding, callback) {
        for (const chunk of chunks) {
          this.push(chunk)
        }

        callback()
      },
    }),
    csv,
    uploadToStorageStream
  )

  const uploadToStorage = uploadFileToStorage({
    contentType: 'text/csv',
    folder: 'reports',
    fileName: `${new Date().toISOString()}-Links.csv`,
    contentStream: uploadToStorageStream,
  })

  const [{ url }] = await Promise.all([uploadToStorage, convertToCSVPipeline])

  return makeRight({ reportUrl: url })
}
