// Run before publishing HTML so cached assets cannot mismatch its controls.
import fs from 'node:fs';
import {createHash} from 'node:crypto';
export function versionPanel(directory,htmlName){
 const path=directory+'/'+htmlName;let html=fs.readFileSync(path,'utf8');
 for(const name of ['admin.css','api-config.js','ledger.js','admin.js']){
  const hash=createHash('sha256').update(fs.readFileSync(directory+'/'+name)).digest('hex').slice(0,16);
  const escaped=name.replaceAll('.', '\\.');
  html=html.replace(new RegExp('(href|src)="\\./'+escaped+'(?:\\?[^"]*)?"','g'),(_,attr)=>attr+'="./'+name+'?v='+hash+'"');
 }
 fs.writeFileSync(path,html);
}

versionPanel('.', 'index.html');
