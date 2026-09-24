declare module 'babel-plugin-transform-ternary' {
  import { PluginObj } from '@babel/core'
  const plugin: () => PluginObj
  export default plugin
}
