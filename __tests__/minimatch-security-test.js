import test from 'tape';
import { spawnSync } from 'child_process';

test('minimatch bounds globpart expansion and preserves ordinary matching', (t) => {
  const source = `
    const assert = require('node:assert/strict');
    const { Minimatch } = require(${JSON.stringify(require.resolve('minimatch'))});
    const pattern = Array(30).fill('**/../a/b').join('/');
    assert.equal(new Minimatch(pattern, {
      optimizationLevel: 2,
      braceExpandMax: 64,
    }).set.length, 64);
    const ordinary = new Minimatch('Custom*');
    assert.equal(ordinary.match('CustomInput'), true);
    assert.equal(ordinary.match('OtherInput'), false);
  `;
  const result = spawnSync(process.execPath, ['--max-old-space-size=128', '-e', source], {
    encoding: 'utf8',
    timeout: 4000,
  });
  t.equal(result.status, 0, 'the matcher finishes within its memory and time bounds');
  t.end();
});
