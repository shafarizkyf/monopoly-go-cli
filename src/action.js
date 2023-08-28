import dayjs from "dayjs";
import { MAP } from "./map.js";
import { countStep } from "./dice.js";
import { updateProfile } from "./profile.js";

export default {
  EXIT: 'exit',
  THROW_DICE: 'throw-dice',
  MAKE_BUILDING: 'make-building'
};

export const throwDice = (currentProfile) => {
  // get user step and current block
  const step = currentProfile.last_position + countStep();
  const locationIndex = step % MAP.length;
  const currentBlock = MAP[locationIndex];

  // update user profile data
  currentProfile.currency += currentBlock.amount;
  currentProfile.last_position = locationIndex;

  if (currentProfile.currency < 0) {
    currentProfile.currency = 0;
  }

  currentProfile.play_count -= 1;

  if (currentBlock.name === 'chance') {
    currentProfile.play_count += CHANCE_DICE;
  }

  currentProfile.last_play = dayjs().format('YYYY-MM-DD HH:mm:ss');

  updateProfile(currentProfile)

  console.table({ step: step % MAP.length, currentBlock, currentProfile });
}