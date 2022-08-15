export const updateObjectInArray = (items, itemId, objPropName, newObjPorps) => {
    return items.map(u => {
        if (u[objPropName] === itemId) {
            return {...u, ...newObjPorps}
        }
        return u
    })
}