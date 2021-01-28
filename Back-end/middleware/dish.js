function findDishes(foods, dishes){
    const menu = [];
    foods.forEach((food, index) => {
        dishes.forEach((dish, index2) => {
            const reg = new RegExp(dish.main_ingredient, 'gi');
            if(food.name.indexOf(food.name.match(reg)) != -1){
                if(!menu.includes(dish.menu)){
                    menu.push(dish.menu);
                }
            }
        });
    });

    return menu;
}

module.exports = findDishes;