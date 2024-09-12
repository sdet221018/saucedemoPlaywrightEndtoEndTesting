class InventoryPage{

    constructor(page){
        this.page = page;
        this.inventoryItem = '.inventory_item';
        this.inventoryItemPrice = '.inventory_item_price';
        this.addToCartButton = '.btn_inventory';
    }

    async getHighestPriceItem() {
        const prices = await this.page.$$eval(this.inventoryItemPrice, (items) =>
            items.map(item => parseFloat(item.textContent.replace('$', '')))
        );
        const maxPriceIndex = prices.indexOf(Math.max(...prices));
        return maxPriceIndex;
    }

    async addItemToCartByIndex(index) {
        const addToCartButtons = await this.page.$$(this.addToCartButton);
        await addToCartButtons[index].click();
    }
}
module.exports = {InventoryPage};