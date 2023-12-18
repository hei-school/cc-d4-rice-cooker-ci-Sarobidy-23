import 'dart:async';

import './cooker.dart';
import './ingredient.dart'; 
import "../util/prompt.dart";
import '../util/global_variable.dart'; 
import '../util/global_function.dart'; 

class Action {
  final String label;
  final FutureOr<void> Function() func;

  const Action({
    required this.label,
    required this.func,
  });
}
Map<String, Action> createActions(Cooker cooker) {
  return {
    'addIngredient': Action(
      label: 'Add ingredient',
      func: () async {
        try {
          final ingredients = ingredientExist.keys.toList();
            print('\nIngredient lists: ');
            for (var i = 0; i < ingredients.length; i++) {
              print(' ${i }. ${ingredients[i]}');
            }

            var ingredientIndex;
            do {
              ingredientIndex = await record('Choose ingredient: ');
            } while (
                !validNumber(double.parse(ingredientIndex)) &&
                ingredientIndex != 0);

            final quantity = await getNumberValue('kg');
          await cooker.addIngredient(Ingredient(ingredients[int.parse(ingredientIndex)], quantity));
        } catch (error) {
          print(error.toString());
        }
      },
    ),
    'addWater': Action(
      label: 'Add water',
      func: () async {
        try {
          final water = await getNumberValue('litre');
          await cooker.addWater(water);
        } catch (error) {
          print(error.toString());
        }
      },
    ),
    'startCooking': Action(
      label: 'Start cooking',
      func: () async {
        try {
          await cooker.startCooking();
        } catch (error) {
          print(error.toString());
        }
      },
    ),
    'stopCooking': Action(
      label: 'Stop cooking',
      func: () {
        try {
          cooker.stopCooking();
        } catch (error) {
          print(error.toString());
        }
      },
    ),
    'connectPower': Action(
      label: 'Connect power',
      func: () {
        try {
          cooker.connectPower();
        } catch (error) {
          print(error.toString());
        }
      },
    ),
    'disconnectPower': Action(
      label: 'Disconnect power',
      func: () {
        try {
          cooker.disconnectPower();
        } catch (error) {
          print(error.toString());
        }
      },
    ),
    'getIngredient': Action(
      label: 'Ingredient list',
      func: () {
        try {
          cooker.getIngredient();
        } catch (error) {
          print(error.toString());
        }
      },
    ),
    'getStatus': Action(
      label: 'Cooker status',
      func: () {
        cooker.getStatus();
      },
    ),
    'exit': Action(
      label: 'Exit',
      func: () {
        print('\nThanks.');
      },
    ),
  };
}