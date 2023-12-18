import 'dart:io'; 

String record(String question) {
  print(question);
  final response = stdin.readLineSync();
  return response ?? '';
}
