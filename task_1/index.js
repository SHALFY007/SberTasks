import {encoded, translations} from './data.js'

console.log("Let's rock")
// console.log(encoded, translations)

const decoded = []
const allId = []

function countUnique(iterable) {
    return new Set(iterable);
  }

const constValue = (obj) => {
    const newObj = {}

    newObj.groupId = obj.groupId
    newObj.service = obj.service
    newObj.formatSize = obj.formatSize
    newObj.ca = obj.ca

    return newObj
}

const clearObj = (obj) => {
    delete obj.groupId
    delete obj.service
    delete obj.formatSize
    delete obj.ca

    return obj
}

const decodeScript = (encoded, translations) => {
    for (let obj of encoded) {

        const newObj = constValue(obj)
        obj = clearObj(obj)

        for (let key of Object.keys(obj)) {
            if (key.substr(key.length - 2).toLowerCase() == 'id') {
                allId.push(obj[key])
                obj[key] ? newObj[key] = translations[obj[key]] : newObj[key] = null
                
            }
        }
        decoded.push(newObj)
    }
}

decodeScript(encoded, translations)

console.log(decoded)
console.log(countUnique(allId))