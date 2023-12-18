import 'dart:async';
import 'dart:math';

import '../util/global_function.dart'; 
import '../util/global_variable.dart'; 
import './ingredient.dart'; 

class Cooker {
  double waterLevel = 0.0;
  List<Ingredient> ingredientList = [];
  bool isButtonOn = false;
  bool isPowerOn = false;
  bool isCooking = false;

  Duration cookIntervalDuration = const Duration(milliseconds: DELTA_TIME);
  Duration powerIntervalDuration = const Duration(milliseconds: DELTA_TIME + 100);

  Timer? cookInterval;
  Timer? powerInterval;


  Future<void> startCooking() async {
    if (isButtonOn) {
      throw Exception('Cooking already started.');
    }
    print('\nStart cooking');
    isButtonOn = true;
    isCooking = true;

    cookInterval = Timer.periodic(cookIntervalDuration, (timer) {
      const waterEvaporated = 0.1;
      const totalWaterAbsorbed = 0.2;

      if (waterLevel > 0.0 && isButtonOn && isPowerOn) {
        waterLevel -= totalWaterAbsorbed;

        for (final ingredient in ingredientList) {
          if (ingredient.canAbsorbe()) {
            break;
          }
        }

        waterLevel = max(0.0, waterLevel - waterEvaporated);
      } else {
        stopCooking();
        timer.cancel();
      }
    });
  }

  void stopCooking() {
    print('Stopped');
    getStatus();
    if (!isButtonOn) {
      throw Exception('Cooking already stopped.');
    }

    isButtonOn = false;
    cookInterval?.cancel();
    powerInterval?.cancel();
  }

  void getStatus() {
    print(
      'Power: ${isPowerOn ? "On" : "Off"}\t Starting button: ${isButtonOn ? "On" : "Off"} \t Water level: ${waterLevel.toStringAsFixed(2)} litre\t Ingredient: ${ingredientList.map((ingredient) => ingredient.name).join(" | ")}',
    );
  }

  void checkPower() {
    powerInterval = Timer.periodic(powerIntervalDuration, (timer) {
      try {
        final randomPower = Random().nextDouble() * 10;
        if (randomPower < 1) {
          stopCooking();
          throw Exception('Power off');
        }
      } catch (error) {
        print(error.toString());
      }
    });
  }

  void connectPower() {
    if (isPowerOn) {
      throw Exception('Power already on.');
    }
    isPowerOn = true;
  }

  void disconnectPower() {
    if (!isPowerOn) {
      throw Exception('Power already off.');
    }

    isButtonOn = false;
    isPowerOn = false;
    powerInterval?.cancel();
    cookInterval?.cancel();
  }

  Future<void> addIngredient(ingredient) async {
    ingredientList.add(ingredient);
  }

  Future<void> addWater(water) async {
    validNumber(water.toDouble(), limit: double.infinity, fieldName: 'water value', objectName: 'cooker');
    waterLevel += water;
  }

    void getIngredient() {
    if (ingredientList.isEmpty) {
        throw Exception('\nNo ingredient added yet.');
    }

    print('\nIngredient list:');
    ingredientList.forEach((ingredient) {
        print('\t${ingredient.name}\t\t${ingredient.quantity} kg');
    });
    }
}