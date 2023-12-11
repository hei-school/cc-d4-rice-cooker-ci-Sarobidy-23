import 'dart:async';

import './prompt.dart'; // Import the record function from prompt.dart

Future<double> getNumberValue(String unit) async {
  final input = await record('Enter a number value ($unit): ');
  final number = double.tryParse(input);
  if (number == null) {
    throw Exception('Invalid number entered.');
  }
  return number;
}


bool validNumber(
  double? numberValue, {
  double? limit,
  String? fieldName,
  String? objectName,
}) {
  if (numberValue == null ||
      numberValue < 0 ||
      numberValue.isNaN ||
      (limit != null && numberValue > limit)) {
    throw Exception(
      'Field "$fieldName" ${objectName != null ? "in object named $objectName" : ""}'
      ' is invalid.',
    );
  }
  return true;
}
