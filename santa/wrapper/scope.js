import myScope from './scopes/myScope'

export const scope = $import => {
    return {
        myScope
    }
}

export const dependencies = $import => {
    return {
        'my-scope': myScope
    }
}
