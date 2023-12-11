import 'dart:io'; // Import the 'dart:io' library for access to stdin

String record(String question) {
  print(question);
  final response = stdin.readLineSync();
  return response ?? ''; // Handle empty input
}
