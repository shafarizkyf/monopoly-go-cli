import dayjs from "dayjs";

export const INIT_PLAY_COUNT = 30; // initial playable limitation when first play
export const CHANCE_DICE = 3; // free dice when player stop on "chance" block
const GENERATE_PLAY_COUNT_TIME = 1; // in minute
const MAX_PLAY = 30;

const DICE_SIDE_MIN = 1
const DICE_SIDE_MAX = 6;

const generateDiceSide = (min = DICE_SIDE_MIN, max = DICE_SIDE_MAX) => {
  return Math.floor(Math.random() * (max - min) ) + min;
}

export const generateDices = () => {
  return [
    generateDiceSide(),
    generateDiceSide(),
  ];
}

export const countStep = () => {
  const [firstDice, secondDice] = generateDices();
  console.table({ firstDice, secondDice });
  return firstDice + secondDice;
}

export const generatePlayableDiceByTime = (currentProfile) => {
  const lastPlay = dayjs(currentProfile.last_play);
  const today = dayjs();
  const playableAmount = Math.round(today.diff(lastPlay, 'minute') / GENERATE_PLAY_COUNT_TIME);

  currentProfile.play_count += playableAmount;

  if (currentProfile.play_count >= MAX_PLAY) {
    currentProfile.play_count = MAX_PLAY;
  }

  return currentProfile;
}
