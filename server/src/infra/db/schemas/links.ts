import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { uuidv7 } from 'uuidv7'

export const links = pgTable('links', {
  id: text()
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  url: text().notNull(),
  route: text().notNull().unique(),
  displayUrl: text().notNull().unique(),
  hits: integer().default(0).notNull(),
  createdAt: timestamp().defaultNow().notNull(),
})
