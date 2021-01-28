function addCatogory(arr, type = undefined) {
    if (type != undefined) {
        let resutl = arr;
        resutl.forEach((e, i) => {
            e.type = type;
            let img = e.img;
            const index = img.lastIndexOf('https') != -1 ? img.lastIndexOf('https') : 0;
            img = img.substr(index, img.length);
            e.img = img;
            e.id_catogory = "";
        });
        return resutl;
    }
}

function getLastIndex(arr, object) {
    let len = arr.length - 1;
    while (len >= 0) {
        if (arr[len].name === object.name) break;
        len--;
    }
    return len;
}

function delSameElement(arr) {
    let resutl = arr;
    resutl.forEach((e, i) => {
        while (getLastIndex(resutl, e) != i) {
            resutl.splice(getLastIndex(resutl, e), 1);
        }
    });
    return resutl;
}

function formatDataFunc(arr, type) {
    return addCatogory(delSameElement(arr), type);
}

module.exports = formatDataFunc;