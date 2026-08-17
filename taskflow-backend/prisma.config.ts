import { defineConfig } from 'prisma/config'

export default defineConfig({
    schema: 'prisma/schema.prisma',
    migrations: {
        path: 'prisma/migrations',
        seed: 'ts-node ./prisma/seed.ts',
    },
    datasource: {
        url: 'postgresql://neondb_owner:npg_ixe1yz8vQZmN@ep-mute-mouse-asq2zfj9-pooler.c-4.eu-central-1.aws.neon.tech/saas_auth?sslmode=require&channel_binding=require',
    },
})
