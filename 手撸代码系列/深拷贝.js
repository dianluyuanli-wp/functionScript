function deepClone(obj, weakMap = new WeakMap()) {
    if (obj === null) return obj;
    if (obj instanceof Date) {
        return new Date(obj)
    }
    if (obj instanceof RegExp) {
        return new RegExp(obj)
    }
    if (typeof obj !== 'object') return obj;
    if (weakMap.get(obj)) {
        return weakMap.get(obj)
    }
    let newObj = new Obj.constructor();
    weakMap.set(obj, newObj);
    for(let key in obj) {
        if (obj.hasOwnProperty(obj[key])) {
            newObj[key] = deepClone(obj[key], weakMap)
        }
    }
    return newObj;
}