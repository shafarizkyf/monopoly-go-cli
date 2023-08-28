import fs from 'fs'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PROFILE_PATH = `${__dirname}/../profile.json`;

export const loadProfile = () => {
  try {
    const isExist = fs.existsSync(PROFILE_PATH);
    if (isExist) {
      const data = fs.readFileSync(PROFILE_PATH, 'utf8');
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.log('error while loading profile: ', error);
    return null;
  }
};

export const updateProfile = (data) => {
  fs.writeFile(PROFILE_PATH, JSON.stringify(data), error => {
    if (error) {
      console.log('error while saving profile.json: ', error);
    }
  });
}
