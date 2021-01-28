const request = require("request-promise");
const cheerio = require("cheerio");

const options = {
    uri: "https://vinmart.com/",
    headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/38.0.2125.111 Safari/537.36"
    }
};

async function getUrlItems() {
    const results = [];
    await request(options)
        .then(html => {
            const $ = cheerio.load(html);
            const productItems = $("div.container.home").find("li.list-group-item");
            const items = [];
            for (let i = 2; i < 6; i++) items.push(productItems.eq(i));
            items.forEach((element, index) => {
                const itemUrl = $(element)
                    .children()
                    .first()
                    .attr("href")
                    .trim();
                results.push({
                    url: itemUrl
                });
            });
        })
        .catch(err => {
            console.log(err);
        });
    return results;
}

async function scrapeProductDetails(urlProduct) {
    return await Promise.all(urlProduct.map(async (product) => {
        product.products = [];
        let page = "?page=1";
        while (page != '#') {
            options.uri = "https://vinmart.com" + product.url + page;
            await request(options).then(html => {
                    const $ = cheerio.load(html);
                    const header = $(".product-list__header");
                    const products = header.find("div.card.card-product");
                    products.each((index, element) => {
                        const productName = $(element)
                            .find("a.product-name")
                            .text()
                            .trim();
                        const productPrice = $(element)
                            .find("div.product-price")
                            .children()
                            .first()
                            .text()
                            .trim()
                            .split("\n")
                            .join("")
                            .substr(0, 15)
                            .trim().replace('₫', '').trim();
                        const productImage = $(element).find('img.card-img-top').attr('src');
                        product.products.push({
                            name: productName,
                            price: productPrice,
                            img: productImage
                        });
                    });

                    lastPage = header
                        .find("div.mt-5")
                        .find(".last")
                        .find("a")
                        .attr("href");
                    if (lastPage == undefined) page = '#';
                    else {
                        if (lastPage != '#') {
                            const i = parseInt(page[page.length - 1]) + 1;
                            page = '?page=' + i;
                        } else page = lastPage;
                    }
                })
                .catch(err => console.log(err));
        }
        return product;
    }));
}


async function scrapeVinmart() {
    const urlProductVinmart = await getUrlItems();
    const vinmartFullData = await scrapeProductDetails(urlProductVinmart);
    return vinmartFullData;
}

module.exports = scrapeVinmart;