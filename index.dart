import './util/prompt.dart';
import './model/cooker.dart';
import './model/cookerAction.dart';

void main() async {
  final cooker = Cooker(); // Assume Cooker is instantiated somewhere
  final options = createActions(cooker);
  final exitValue = options.length - 1;
  var chosenOption = 0;

  while (chosenOption != exitValue) {
    print('\nExisting options:');
    options.forEach((key, value) {
      print(' ${options.keys.toList().indexOf(key)}. ${value.label}');
    });

    chosenOption = int.tryParse(await record('Choose an option: ')) ?? -1;

    if (chosenOption < 0 || chosenOption > exitValue) {
      print('\nInvalid option, please choose another.\n');
    } else {
      await options.values.toList()[chosenOption].func();
    }
  }
}

