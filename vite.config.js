import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const dracoFiles = new Set([
  'draco_decoder.js',
  'draco_wasm_wrapper.js',
  'draco_decoder.wasm',
])
const dracoDirectory = fileURLToPath(
  new URL('./node_modules/three/examples/jsm/libs/draco/gltf/', import.meta.url),
)

const localDracoAssets = () => ({
  name: 'local-draco-assets',
  configureServer(server) {
    server.middlewares.use('/draco', (request, response, next) => {
      const fileName = request.url?.split('?')[0].replace(/^\/+/, '')
      if (!fileName || !dracoFiles.has(fileName)) return next()

      try {
        response.statusCode = 200
        response.setHeader(
          'Content-Type',
          fileName.endsWith('.wasm') ? 'application/wasm' : 'text/javascript; charset=utf-8',
        )
        response.end(readFileSync(resolve(dracoDirectory, fileName)))
      } catch (error) {
        next(error)
      }
    })
  },
  generateBundle() {
    for (const fileName of dracoFiles) {
      this.emitFile({
        type: 'asset',
        fileName: `draco/${fileName}`,
        source: readFileSync(resolve(dracoDirectory, fileName)),
      })
    }
  },
})

const readJsonBody = async (request) => {
  const chunks = []
  let size = 0

  for await (const chunk of request) {
    size += chunk.length
    if (size > 64 * 1024) throw new Error('request body is too large')
    chunks.push(chunk)
  }

  if (!chunks.length) return undefined
  return JSON.parse(Buffer.concat(chunks).toString('utf8'))
}

const localChatApi = (environment) => {
  return {
    name: 'local-chat-api',
    apply: 'serve',
    configureServer(server) {
      // Vite only exposes VITE_-prefixed values to the browser. These two
      // variables stay in the Node dev server for the serverless handler.
      if (environment.OPENAI_API_KEY) {
        process.env.OPENAI_API_KEY = environment.OPENAI_API_KEY
      }
      if (environment.OPENAI_MODEL) {
        process.env.OPENAI_MODEL = environment.OPENAI_MODEL
      }

      server.middlewares.use('/api/chat', async (request, response) => {
        response.status = (statusCode) => {
          response.statusCode = statusCode
          return response
        }
        response.json = (payload) => {
          response.setHeader('Content-Type', 'application/json; charset=utf-8')
          response.end(JSON.stringify(payload))
          return response
        }

        try {
          request.body = await readJsonBody(request)
          const { default: handler } = await server.ssrLoadModule('/api/chat.js')
          await handler(request, response)
        } catch (error) {
          if (!response.headersSent) {
            response.statusCode = 400
            response.setHeader('Content-Type', 'application/json; charset=utf-8')
            response.end(JSON.stringify({ error: error.message || 'Invalid request' }))
          }
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const environment = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react(), localDracoAssets(), localChatApi(environment)],
    assetsInclude: ['**/*.glb'],
    resolve: {
      dedupe: ['react', 'react-dom', 'three'],
    },
    build: {
      // split the heavy vendor stacks into their own long-cacheable chunks
      rollupOptions: {
        output: {
          manualChunks: {
            three: ['three', '@react-three/fiber', '@react-three/drei', '@react-spring/three'],
            react: ['react', 'react-dom', 'react-router-dom'],
          },
        },
      },
    },
  }
})
