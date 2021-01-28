// Format data from vinmart
const vinmart = require('../clone/vinmart');
const formatFunc = require('./formatdata');
async function formatData() {
    const data = await vinmart();
    if(!data) return [];
    let glucid = data[0].products;
    let mineral = [...data[1].products, ...data[2].products];
    let protein = data[3].products;
    glucid = formatFunc(glucid, 'glucid');
    mineral = formatFunc(mineral, 'mineral');
    protein = formatFunc(protein, 'protein');
    return [...glucid, ...protein, ...mineral];
}
module.exports = formatData;