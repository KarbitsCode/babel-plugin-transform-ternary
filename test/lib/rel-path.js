import { URL, fileURLToPath } from 'url';

const relPath = base => (...paths) => fileURLToPath(new URL(paths.join('/'), base));

export default relPath;
