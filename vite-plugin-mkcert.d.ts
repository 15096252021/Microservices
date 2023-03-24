declare module 'vite-plugin-mkcert' {
  interface MkcertPluginOptions {
    domains: string[]
    days: number
  }
  const mkcert: (options?: MkcertPluginOptions) => any
  export default mkcert
}