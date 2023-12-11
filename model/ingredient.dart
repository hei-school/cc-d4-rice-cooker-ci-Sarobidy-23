import "../util/globalFunction.dart";
import "../util/globalVariable.dart";

class Ingredient {
  late String name;
  late double waterNeed;
  late double waterAbsorbed;
  late double waterAbsorptionRate;
  late double quantity;

  Ingredient(String name, double quantity) {
    this.waterAbsorbed = 0;
    this.name = name;
    validNumber(quantity, limit: double.infinity, fieldName: 'quantity', objectName: '${this.name} quantity');
    this.quantity = quantity;
    this.waterAbsorptionRate = (ingredientExist[name]?['waterAbsorptionRate'] ?? 0.0).toDouble();
    this.waterNeed = this.quantity * (ingredientExist[name]?['waterNeed'] ?? 0.0);
  }

  bool canAbsorbe() {
    return waterAbsorbed < waterNeed;
  }

  void absorbeWater(double waterAbsorbed) {
    if (canAbsorbe()) {
      this.waterAbsorbed += waterAbsorbed;
    }
  }
}
