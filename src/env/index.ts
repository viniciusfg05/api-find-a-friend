import 'dotenv/config'
import { z } from 'zod'

const schemaEnvironment = z.object({
  PORT: z.coerce.number().default(3335),
  AWS_SECRET_ACCESS_KEY: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_DEFAULT_REGION: z.string(),
  STORAGE_ENVIRAMENTS: z.enum(['s3', 'local']),
  JWT_SECRET: z.string(),
  BUCKET_NAME: z.string(),
})

const ifAllEnvironmentVariablesAreInAccordanceWithSchema =
  schemaEnvironment.safeParse(process.env)

if (ifAllEnvironmentVariablesAreInAccordanceWithSchema.success === false) {
  console.error(
    '❌Invalid environment variables',
    ifAllEnvironmentVariablesAreInAccordanceWithSchema.error.format(),
  )

  throw new Error('❌Invalid environment variables')
}

export const env = ifAllEnvironmentVariablesAreInAccordanceWithSchema.data
