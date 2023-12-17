import { record, closeRecord } from "./src/util/prompt.js"
import { Cooker } from "./src/model/Cooker.js";
import { Action } from "./src/model/CoockerAction.js";

const main = async() => {
  let cooker = new Cooker()
  let choosenOption = null;
  const option = Action(cooker)
  const exitValue = Object.keys(option).length - 1
  while(choosenOption != exitValue) {
    console.log("\nExisting options: ");
    Object.keys(option).forEach((item, index) => {
      console.log(` ${index}. ${option[item].label}`)
    })
    choosenOption = Math.round(await record("Choose an option: "))
    if(!Boolean(choosenOption) && isNaN(choosenOption) || choosenOption<0 || choosenOption>exitValue) {
      console.log("\nOption no valid, choose another.\n");
    } else {
      await Object.values(option)[choosenOption].func(cooker)
    }
  }
  closeRecord()
}

main()
