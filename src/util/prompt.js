import * as readline from "readline";

const interfaces = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const record = (question) => {
  return new Promise((resolve) => {
    interfaces.question(question, (response) => {
      resolve(response);
    });
  });
};

export const closeRecord = () => {
  interfaces.close();
};
