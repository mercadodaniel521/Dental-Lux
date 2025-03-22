let userConfig = undefined
try {
  userConfig = await import('./v0-user-next.config')
} catch (e) {
  // ignore error
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Necesario para exportación estática
  basePath: '/mercadodaniel521', // Reemplaza con el nombre exacto de tu repositorio
  images: {
    unoptimized: true, // Necesario para exportación estática
  },
  trailingSlash: true, // Ayuda con las rutas en GitHub Pages
}

module.exports = nextConfig

mergeConfig(nextConfig, userConfig)

function mergeConfig(nextConfig, userConfig) {
  if (!userConfig) {
    return
  }

  for (const key in userConfig) {
    if (
      typeof nextConfig[key] === 'object' &&
      !Array.isArray(nextConfig[key])
    ) {
      nextConfig[key] = {
        ...nextConfig[key],
        ...userConfig[key],
      }
    } else {
      nextConfig[key] = userConfig[key]
    }
  }
}

export default nextConfig
