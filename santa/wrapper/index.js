import alias from "./components-lazy-alias"
import { scope, dependencies } from "./scope"
import { createComponents } from "./lang"

const ChingRelimReactComponents = (...extensions) => {
  const $import = createComponents([alias].concat(extensions))

  return {
    getComponents: $import,
    getScope() {
      return scope($import)
    },
    getDependencies() {
      return dependencies($import)
    },
    // 获取组件属性
    getProperties(name) {
      return import(/* webpackMode: "lazy" */
      `../../src/components/${name}/properties.json`).then(module => {
        return module
      })
    }
  }

}

export default ChingRelimReactComponents
