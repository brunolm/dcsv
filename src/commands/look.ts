import * as csv from '../csv';

export default async function run([filename, options]) {
  let maxSizes = [];
  let maxLineNumberSize = 1;

  await csv.read(filename, (line, linenumber) => {
    const values = csv.parse(line, options.delimiter);
    maxSizes = values.map((val, i) => {
      return (maxSizes[i] || -1) > val.length ? maxSizes[i] : val.length;
    });

    maxLineNumberSize = linenumber;
  });

  if (options.lineNumbers) {
    maxSizes.unshift(`${maxLineNumberSize}`.length);
  }

  await csv.read(filename, (line, lineNumber) => {
    const values = csv.parse(line, options.delimiter);
    if (options.lineNumbers) {
      values.unshift(`${lineNumber || '-'}`);
    }
    console.log(values.map((val, i) => {
      const complement = maxSizes[i] - val.length;
      return ` ${val}${' '.repeat(complement)} `;
    }).join('|'));
  });
}

