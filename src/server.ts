import { env } from '@/env'
import { app } from '@/app'

app
  .listen({
    port: env.PORT,
  })
  .then((port) => {
    console.log(`Server listening on port ${env.PORT} 🚀`)
  })
