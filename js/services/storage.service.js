export const storageService = {
    saveToStorage,
    loadFromStorage
}

function saveToStorage(key, val) {
    // debugger;
    console.log('saving on storage service');
    localStorage.setItem(key, JSON.stringify(val))
}

function loadFromStorage(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}

