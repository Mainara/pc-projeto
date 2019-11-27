import fs from 'fs';
import path from 'path';

const __dirname = process.env.PWD + '/routers';

export default app => {
  fs
    .readdirSync(__dirname)
    .filter(file => ((file.indexOf('.')) !== 0 && (file !== 'index.mjs')))
    .forEach(async file => {
      const modules = await import(path.resolve(__dirname, file));
      modules.default(app); 
    });
};