import { Cooker } from "../model/Cooker";
import { Ingredient } from "../model/Ingredient";

describe("Cooker", () => {
  let cooker;
  let mockRecord;

  beforeEach(() => {
    cooker = new Cooker();
    mockRecord = jest.fn();
    mockRecord.mockReturnValue(1); 
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Initial cooker", () => {
    expect(cooker.waterLevel).toBe(0);
    expect(cooker.ingredientList).toHaveLength(0)
    expect(cooker.isButtonOn).toBeFalsy()
    expect(cooker.isPowerOn).toBeFalsy()
    expect(cooker.isCooking).toBeFalsy()
  });

  it("Cooking", async() => {
    let ingredient = new Ingredient("rice", 5)
    cooker.connectPower()
    await cooker.addWater(1)
    await cooker.addIngredient(ingredient)
    expect(cooker.waterLevel).toBe(1)
    expect(cooker.isPowerOn).toBe(true)
    await cooker.startCooking()
    expect(cooker.waterLevel).toBe(0)
  },20000)

});