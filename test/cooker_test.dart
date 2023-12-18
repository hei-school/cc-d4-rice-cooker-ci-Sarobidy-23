import 'package:test/test.dart';

import 'dart:async';

import '../model/cooker.dart';
import '../model/ingredient.dart';

void main() {
  late Cooker cooker;

  setUp(() {
    cooker = Cooker();
  });

  test('Initial cooker', () {
    expect(cooker.waterLevel, equals(0));
    expect(cooker.ingredientList.length, equals(0));
    expect(cooker.isButtonOn, equals(false));
    expect(cooker.isPowerOn, equals(false));
    expect(cooker.isCooking, equals(false));
  });

  test('Cooking', () async {
    final ingredient = Ingredient('rice', 5);
    cooker.connectPower();
    await cooker.addWater(1);
    await cooker.addIngredient(ingredient);
    expect(cooker.waterLevel, equals(1));
    expect(cooker.isPowerOn, equals(true));
    await cooker.startCooking();
    Timer(Duration(seconds: 1), () {
      expect(cooker.waterLevel, equals(0));
    });
  });
}
