exports.formatShopData = (shopData) => {
    const formattedShops = shopData.map((shop) => [shop.shop_name, shop.owner, shop.slogan]);
    return formattedShops;
};


exports.createShopRef = (shopRows) => {
    const ref = {};
    shopRows.forEach((shopRow) => {
        ref[shopRow.shop_name] = shopRow.shop_id;
    });
    //console.log('THIS IS THE REF', ref);
    return ref;
};




exports.formatTreasureData = (treasureData, shopRef) => {
    console.log(shopRef, 'shopref')
    return treasureData.map((treasure) => {
        return [
            treasure.treasure_name, 
            treasure.colour, 
            treasure.age,
            treasure.cost_at_auction, 
            shopRef[treasure.shop],
        ];
    });
};

