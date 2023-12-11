import { validNumber } from "../util/GlobalFunction.js";
import { ingredientExist } from "../util/GlobalVariable.js";

export class Ingredient {
  name;
  waterNeed;
  waterAbsorbed;
  waterAbsorptionRate;
  quantity;

  constructor(name, quantity) {
    this.waterAbsorbed = 0;
    this.name = name;
    this.quantity = validNumber(quantity, "quantity", `${this.name} quantity`);
    this.waterAbsorptionRate = ingredientExist[name].waterAbsorptionRate;
    this.waterNeed = this.quantity * ingredientExist[name].waterNeed;
  }

  canAbsorbe() {
    return this.waterAbsorbed < this.waterNeed;
  }

  absorbeWater(waterAbsorbed) {
    if (this.canAbsorbe()) {
      this.waterAbsorbed += waterAbsorbed;
    }
  }
}
