// functions go here

exports.formatShopData = (shopData) => {
    const formattedShops = shopData.map((shop) => [shop.shop_name]);
    return formattedShops;
};

