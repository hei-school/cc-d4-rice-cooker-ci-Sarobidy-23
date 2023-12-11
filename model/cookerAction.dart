import 'dart:async';
import './cooker.dart';

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
          await cooker.addIngredient();
        } catch (error) {
          print(error.toString());
        }
      },
    ),
    'addWater': Action(
      label: 'Add water',
      func: () async {
        try {
          await cooker.addWater();
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