#!/usr/bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

let playerName;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow("Command Line Trivia! \n");

  await sleep();
  rainbowTitle.stop();

  console.log(`
  ${chalk.bgBlue("HOW TO PLAY")}
  I am a process on your computer.
  If you get any questions wrong I will be ${chalk.bgRed("terminated")}
  So get them right!
  `);
}

// await welcome();

async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });

  playerName = answers.player_name;
}

async function question1() {
  const answers = await inquirer.prompt({
    name: "question_1",
    type: "list",
    message:
      "What's the most repeated final in the history of the FIFA World Cup? \n",
    choices: [
      "Brazil - Italy",
      "England - The Netherlands",
      "Argentina - Germany",
      "Spain - France",
    ],
  });

  return handleAnswer(answers.question_1 == "Argentina - Germany");
}
async function question2() {
  const answers = await inquirer.prompt({
    name: "question_2",
    type: "list",
    message: "What is the speed of light? \n",
    choices: [
      "299 792 458 m / s",
      "300 000 000 m / s",
      "200 792 458 m / h",
      "199 993 438 km / s",
    ],
  });

  return handleAnswer(answers.question_2 == "299 792 458 m / s");
}
async function question3() {
  const answers = await inquirer.prompt({
    name: "question_3",
    type: "list",
    message: "When did the first human go to space? \n",
    choices: ["1968", "1969", "1955", "1961"],
  });

  return handleAnswer(answers.question_3 == "1961");
}
async function question4() {
  const answers = await inquirer.prompt({
    name: "question_4",
    type: "list",
    message: " TRUE OR FALSE - The color orange is named after the fruit. \n",
    choices: ["TRUE", "FALSE"],
  });

  return handleAnswer(answers.question_4 == "TRUE");
}
async function question5() {
  const answers = await inquirer.prompt({
    name: "question_5",
    type: "list",
    message: "What is the word in Spanish for 'Billion'? \n",
    choices: ["Millón", "Billón", "Mil Millones", "Dillón"],
  });

  return handleAnswer(answers.question_5 == "Mil Millones");
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking answer...").start();
  await sleep();

  if (isCorrect) {
    spinner.success({
      text: `Nice work ${playerName}!. That's a legit answer`,
    });
  } else {
    spinner.error({
      text: `💀💀💀 Game over, you lost ${playerName}, and now i'm dead ☹️`,
    });
    process.exit(1);
  }
}

function winner() {
  console.clear();
  const msg = `Congrats, ${playerName}!\n You've won
  \n


 $1 , 000 , 000 , 000  

`;

  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}
await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
// await handleAnswer();
await winner();
