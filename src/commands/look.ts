import * as csv from '../csv';
import * as linq from '../linq';

export default async function run([filename, options]) {
  let maxSize = 0;
  let maxLineNumberSize = 1;

  await csv.read(filename, (line, linenumber) => {
    const values = csv.parse(line, options.delimiter);
    maxSize = linq.max(values, val => val.length);
    maxLineNumberSize = linenumber;
  });
  maxLineNumberSize = `${maxLineNumberSize}`.length;

  await csv.read(filename, (line, lineNumber) => {
    const values = csv.parse(line, options.delimiter);
    if (options.lineNumbers) {
      values.unshift(`${lineNumber || '-'}`);
    }
    console.log(values.map((val, i) => {
      let size = options.lineNumbers && !i ? maxLineNumberSize : maxSize;
      const complement = size - val.length;
      return ` ${val}${' '.repeat(complement)} `;
    }).join('|'));
  });
}

