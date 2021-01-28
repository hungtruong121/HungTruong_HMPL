// Format data from lotte
const lotte = require('../clone/lotte');
const formatFunc = require('./formatdata');
async function formatData() {
    const data = await lotte();
    if(!data) return [];
    let glucid = [...data[0].products,...data[1].products];
    let mineral = data[2].products.concat(data[3].products);
    let protein = data[4].products.concat(
        data[5].products,
        data[6].products,
        data[7].products,
        data[8].products
    );
    glucid = formatFunc(glucid, 'glucid');
    mineral = formatFunc(mineral, 'mineral');
    protein = formatFunc(protein, 'protein');
    return [...glucid, ...protein, ...mineral];
    
}
module.exports = formatData;