import { homedir } from 'os';
import { resolve } from 'path';

export const UPLOAD_DIR = resolve(homedir(), './upload/');
