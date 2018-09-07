import assign from "object-assign"

const resolveESModule = (module) => {
    if (module && module["__esModule"]) {
        const _export = module["default"] || module
        if(module["default"]){
            assign(_export,module)
        }
        return _export
    }

    return module
}

const createModMap = (modules, names) => {
    return names.reduce((buf, name, index) => {
        buf[name] = resolveESModule(modules[index])

        return buf
    }, {})
}

export const createComponents = aliasses => {
    const alias = assign.apply(null, aliasses)
    const cache_names = {}
    const $import = (names, _import) => {
        let nameKey = JSON.stringify(names)
        if (cache_names[nameKey]) return cache_names[nameKey]

        const shoted_names = []
        const task = names.reduce((buf, name) => {
            if (alias[name]) {
                shoted_names.push(name)
                return buf.concat(
                    alias[name](_import, window.React, window.ReactDOM)
                )
            }
            return buf
        }, [])

        let mods = Promise.all(task).then(modules => {
            return createModMap(modules, shoted_names)
        })
        cache_names[nameKey] = mods
        return mods
    }

    return $import
}