import dayjs from "dayjs";
import { INIT_PLAY_COUNT, countStep, generatePlayableDiceByTime } from "./src/dice.js";
import { MAP } from "./src/map.js";
import { loadProfile, updateProfile } from "./src/profile.js";

const play = async () => {
  const INIT_PROFILE = {
    currency: 0,
    play_count: INIT_PLAY_COUNT,
    last_play: dayjs().format('YYYY-MM-DD HH:mm:ss'),
  };

  // set current profile either from existing profile or initialize when doesnt exist
  const currentProfile = loadProfile() || INIT_PROFILE;

  generatePlayableDiceByTime(currentProfile)

  if (!currentProfile.play_count) {
    console.log('You don\'t have play count anymore')
    return;
  }

  // get user step and current block
  const step = countStep();
  const currentBlock = MAP[step % MAP.length];

  // update user profile data
  currentProfile.currency += currentBlock.amount;
  currentProfile.play_count -= 1;
  currentProfile.last_play = dayjs().format('YYYY-MM-DD HH:mm:ss');

  updateProfile(currentProfile)

  console.table({ step: step % MAP.length, currentBlock, currentProfile });
}

play();
