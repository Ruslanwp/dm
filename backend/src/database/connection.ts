import path from 'path';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import {migrate} from 'drizzle-orm/neon-http/migrator';

import * as schema from '@app/shared/schema'
import { initEnvConfig } from '../utils/env-config';

initEnvConfig()

const databaseUrl = process.env['DATABASE_URL'];

if(!databaseUrl){
    throw new Error('DATABASE_URL is not set');
}

const sql = neon(databaseUrl);
const db = drizzle(sql, { schema });

migrate(db, { migrationsFolder: path.join(__dirname, 'migrations')});

export { db };
