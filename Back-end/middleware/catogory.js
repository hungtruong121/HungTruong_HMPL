function catogory(data, group) {
    data.forEach((e, i) => {
        let isTrue = true;
        group.forEach((e2, i2) => {
            const regex = new RegExp(e2.name, 'gi');
            if (e.name.indexOf(e.name.match(regex)) != -1 && isTrue) { // có tên trong nhóm
                e.id_catogory = e2._id;
                isTrue = false;
            }
        });
    });
    return data;
}

module.exports = catogory;