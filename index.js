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




/*
const getAmount = async(cause) => {
    const amount = await record(`${cause} amount value: `)
    return amount;
}

const deposit = async () => {
    const amount = await getAmount("Deposit");
    console.log(amount, "deposit")
}

const withdraw = async () => {
  const amount = await getAmount("Withdraw");
  console.log(amount, "withdraw")
}

const MoneyAction = {
  deposit: deposit,
  withdraw: withdraw,
  exit: "exit"
}


const main = async () => {
  let choosenOption = null;
  const exitValue = Object.keys(MoneyAction).length
  while(choosenOption !=2) {
    Object.keys(MoneyAction).forEach( (item, index) => {
      console.log(`${index}. ${item}`)
    })
    choosenOption = Math.round(await record("Choose: "))
    if(!Boolean(choosenOption) && isNaN(choosenOption) || choosenOption<0 || choosenOption>exitValue-1) {
      console.log("Choose another");
    } else {
      await Object.values(MoneyAction)[choosenOption]()
    }
  }
  closeRecord()
}
main()
*/