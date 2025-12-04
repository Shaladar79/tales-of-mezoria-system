// scripts/item/MarkedItemSheet.mjs

export class MarkedItemSheet extends ItemSheet {
  static get defaultOptions() {
    return foundry.utils.mergeObject(super.defaultOptions, {
      classes: ["marked", "sheet", "item"],
      template: "systems/tales-of-mezoria-system/templates/items/item-sheet.hbs",
      width: 600,
      height: 400
    });
  }

  getData(options = {}) {
    const data = super.getData(options);
    data.system = data.item.system; // normalize system data
    return data;
  }
}
