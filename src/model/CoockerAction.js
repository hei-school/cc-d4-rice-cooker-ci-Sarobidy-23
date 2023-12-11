export const Action = (cooker) => {
  return {
    addIngredient: {
      label: "Add ingredient",
      func: async () => {
        try {
          await cooker.addIngredient();
        } catch (error) {
          console.log(error.message);
        }
      },
    },
    addWater: {
      label: "Add water",
      func: async () => {
        try {
          await cooker.addWater();
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
          cooker.getIngredient();
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
