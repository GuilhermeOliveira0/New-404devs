import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

test('production output contains only public assets and complete project galleries', () => {
  execFileSync(process.execPath, ['build.mjs']);
  assert.deepEqual(fs.readdirSync('dist').sort(), ['assets','index.html','robots.txt','script.js','sitemap.xml','style.css']);
  const html = fs.readFileSync('dist/index.html', 'utf8');
  const gallery = JSON.parse(html.match(/id="gallery-data">([\s\S]*?)<\/script>/)[1]);
  assert.equal(gallery.length, 9);
  for (const project of gallery) for (const img of project.images) {
    assert.ok(fs.existsSync(path.join('dist',img.src)), img.src);
    assert.ok(fs.existsSync(path.join('dist',img.src.replace('.webp','-thumb.webp'))));
  }
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(ids).size, ids.length, 'duplicate HTML IDs');
  for (const [,id] of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.includes(id), `missing anchor ${id}`);
  for (const [,number] of html.matchAll(/https:\/\/wa\.me\/(\d+)/g)) assert.equal(number, '5517996242178');
});
