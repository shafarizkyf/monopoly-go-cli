import dayjs from "dayjs";
import { CHANCE_DICE, INIT_PLAY_COUNT, countStep, generatePlayableDiceByTime } from "./src/dice.js";
import { MAP } from "./src/map.js";
import { loadProfile, updateProfile } from "./src/profile.js";

const play = async () => {
  const INIT_PROFILE = {
    currency: 0,
    play_count: INIT_PLAY_COUNT,
    last_play: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    last_position: 0,
  };

  // set current profile either from existing profile or initialize when doesnt exist
  const currentProfile = loadProfile() || INIT_PROFILE;

  generatePlayableDiceByTime(currentProfile)

  if (!currentProfile.play_count) {
    console.log('You don\'t have play count anymore')
    return;
  }

  // get user step and current block
  const step = currentProfile.last_position + countStep();
  const currentBlock = MAP[step % MAP.length];

  // update user profile data
  currentProfile.currency += currentBlock.amount;
  currentProfile.last_position = step;

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

play();
