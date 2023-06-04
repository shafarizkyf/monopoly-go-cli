import dayjs from "dayjs";

export const INIT_PLAY_COUNT = 30; // initial playable limitation when first play
const GENERATE_PLAY_COUNT_TIME = 1; // in minute

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
  return currentProfile;
}
