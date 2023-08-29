import dayjs from "dayjs";
import { INIT_PLAY_COUNT, generatePlayableDiceByTime } from "./src/dice.js";
import { loadProfile } from "./src/profile.js";
import { select } from "@inquirer/prompts";
import action, { selectBuilding, throwDice } from "./src/action.js";
import level from "./src/level.js";

const play = async () => {
  const INIT_PROFILE = {
    currency: 0,
    play_count: INIT_PLAY_COUNT,
    last_play: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    last_position: 0,
    level: 1
  };

  // set current profile either from existing profile or initialize when doesnt exist
  const currentProfile = await loadProfile() || INIT_PROFILE;
  const currentLevel = level.find((town) => town.level == currentProfile.level);

  generatePlayableDiceByTime(currentProfile)

  if (!currentProfile.play_count) {
    console.log('You don\'t have play count anymore')
    return;
  }

  let isExit = false;
  while (!isExit) {
    const answer = await select({
      message: 'Select Action',
      choices: [
        {
          name: 'Throw Dice',
          value: action.THROW_DICE
        },
        {
          name: 'Make Building',
          value: action.MAKE_BUILDING
        },
        {
          name: 'Exit',
          value: action.EXIT
        }
      ]
    });

    switch (answer) {
      case action.THROW_DICE:
        throwDice(currentProfile);
        break;

      case action.MAKE_BUILDING:
        await selectBuilding(currentProfile, currentLevel);
        break;

      case action.EXIT:
        isExit = true;
        break;

      default:
        isExit = true;
    }
  }
}

play();
