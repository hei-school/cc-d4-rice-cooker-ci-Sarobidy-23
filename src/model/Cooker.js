import { getNumberValue, validNumber } from "../util/GlobalFunction.js";
import { DELTA_TIME, ingredientExist } from "../util/GlobalVariable.js";
import { record } from "../util/prompt.js";
import { Ingredient } from "./Ingredient.js";

export class Cooker {
  waterLevel;
  ingredientList;
  isButtonOn;
  isPowerOn;
  cookInterval;
  powerInterval;
  progressBar;
  isCooking;

  constructor() {
    this.waterLevel = 0;
    this.ingredientList = [];
    this.isButtonOn = false;
    this.isPowerOn = false;
    this.isCooking = false;
  }

  startCooking() {
    if (this.isButtonOn) {
      throw new Error("Cooking already started. \n");
    }
    console.log("\nStart cooking");
    this.isButtonOn = true;
    this.isCooking = true;

    return new Promise((resolve, reject) => {
      console.log("Cooking in progress please wait.");
      this.cookInterval = setInterval(() => {
        const waterEvaporated = 0.1;
        const totalWaterAbsorbed = 0.2;

        if (this.waterLevel > 0.0 && this.isButtonOn && this.isPowerOn) {
          this.waterLevel = this.waterLevel - totalWaterAbsorbed;

          let canAbsorb = false;
          for (const ingredient of this.ingredientList) {
            if (ingredient.canAbsorbe()) {
              canAbsorb = true;
              break;
            }
          }
          this.waterLevel = Math.max(0, this.waterLevel - waterEvaporated);
        } else {
          this.stopCooking();
          clearInterval(this.cookInterval);
          resolve();
        }
      }, DELTA_TIME);
    });
  }

  stopCooking() {
    console.log("Stopped");
    this.getStatus();
    if (!this.isButtonOn) {
      throw new Error("Cooking already stopped. \n");
    }
    this.isButtonOn = false;
    clearInterval(this.cookInterval);
    clearInterval(this.powerInterval);
    this.cookInterval = null;
  }

  getStatus() {
    console.log(
      `Power: ${this.isPowerOn ? "On" : "Off"}\t Starting button: ${
        this.isButtonOn ? "On" : "Off"
      } \t Water level: ${
        this.waterLevel
      } litre\t Ingredient: ${this.ingredientList
        .map((ingredient) => ingredient.name)
        .join(" | ")}`
    );
  }

  checkPower() {
    this.powerInterval = setInterval(() => {
      try {
        const randomPower = Math.random() * 10;
        if (randomPower < 1) {
          this.stopCooking();
          throw new Error("Power off");
        }
      } catch (error) {
        console.error(error.message);
      }
    }, DELTA_TIME + 100);
  }

  connectPower() {
    if (this.isPowerOn) {
      throw new Error("Power already on.");
    }
    this.isPowerOn = true;
  }

  disconnectPower() {
    if (!this.isPowerOn) {
      throw new Error("Power already off.");
    }
    this.isButtonOn = false;
    this.isPowerOn = false;
    clearInterval(this.powerInterval);
    clearInterval(this.cookInterval);
    this.cookInterval = null;
  }

  async addIngredient() {
    const ingredients = Object.keys(ingredientExist);
    console.log("\nIngredient lists: ");
    Object.keys(ingredientExist).forEach((ingredient, index) => {
      console.log(` ${index}. ${ingredient}`);
    });

    let ingredientIndex = null;
    do {
      ingredientIndex = await record("Choose sakafo ein: ");
    } while (
      !validNumber(ingredientIndex, ingredients.length - 1, "ingredient") &&
      ingredientIndex != 0
    );

    const quantity = await getNumberValue("kg");
    this.ingredientList = [
      ...this.ingredientList,
      new Ingredient(ingredients[ingredientIndex], quantity),
    ];
  }

  async addWater() {
    const water = await getNumberValue("litre");
    this.waterLevel =
      this.waterLevel + validNumber(water, "water value", "cooker");
  }

  getIngredient() {
    if (!this.ingredientList.length) {
      throw new Error("\nNo ingredient yet.");
    }
    console.log("\nIngredient lists:");
    this.ingredientList.forEach((ingredient) => {
      console.log(`\t${ingredient.name}\t${ingredient.quantity} kg`);
    });
  }
}
