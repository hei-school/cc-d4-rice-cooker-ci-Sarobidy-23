import { getNumberValue, validNumber } from "../util/GlobalFunction.js";
import { ingredientExist } from "../util/GlobalVariable.js";
import { record } from "../util/prompt.js";
import { Ingredient } from "./Ingredient.js";

export const Action = (cooker) => {
  return {
    addIngredient: {
      label: "Add ingredient",
      func: async () => {
        try {
          const ingredients = Object.keys(ingredientExist);
          console.log("\nIngredient lists: ");
          Object.keys(ingredientExist).forEach((ingredient, index) => {
            console.log(` ${index}. ${ingredient}`);
          });
      
          let ingredientIndex  = await record("Choose sakafo ein: ");
          validNumber(ingredientIndex, ingredients.length - 1, "ingredient") 
          const quantity = await getNumberValue("kg");

          await cooker.addIngredient(new Ingredient(ingredients[ingredientIndex], quantity));
          console.log(`${ingredients[ingredientIndex]} ${quantity} kg is added.`);
        } catch (error) {
          console.log(error.message);
        }
      },
    },
    addWater: {
      label: "Add water",
      func: async () => {
        try {
          const water = await getNumberValue("litre");
          await cooker.addWater(water);
        } catch (error) {
          console.error(error.message);
        }
      },
    },
    startCooking: {
      label: "Start cooking",
      func: async () => {
        try {
          await cooker.startCooking();
        } catch (error) {
          console.error(error.message);
        }
      },
    },
    stopCooking: {
      label: "Stop cooking",
      func: () => {
        try {
          cooker.stopCooking();
        } catch (error) {
          console.error(error.message);
        }
      },
    },
    connectPower: {
      label: "Connect power",
      func: () => {
        try {
          cooker.connectPower();
        } catch (error) {
          console.error(error.message);
        }
      },
    },
    disconnectPower: {
      label: "Disconnet power",
      func: () => {
        try {
          cooker.disconnectPower();
        } catch (error) {
          console.error(error.message);
        }
      },
    },
    getIngredient: {
      label: "Ingredient lists",
      func: () => {
        try {
          let ingredientList = cooker.getIngredient();
          console.log("\nIngredient lists:");
          ingredientList.forEach((ingredient) => {
            console.log(`\t${ingredient.name}\t${ingredient.quantity} kg`);
          });
        } catch (error) {
          console.error(error.message);
        }
      },
    },
    getStatus: {
      label: "Cooker status",
      func: () => {
        cooker.getStatus();
      },
    },
    exit: {
      label: "Exit",
      func: () => {
        console.log("\nThanks.");
      },
    },
  };
};
