import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';

export function parse(text: string, delimiter?: ',' | ';'): string[] {
  const csvExpComma = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|"([^""]*(?:"[\S\s][^""]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
  const csvExpSemi = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|"([^""]*(?:"[\S\s][^""]*)*)"|([^;'"\s\\]*(?:\s+[^;'"\s\\]+)*))\s*(?:;|$)/g;

  const csvExp = delimiter === ';' ? csvExpSemi : csvExpComma;

  const values: string[] = [];

  text.replace(csvExp, (m0, m1, m2, m3, m4) => {
    if (m1 !== undefined) {
      values.push(m1.replace(/\\'/g, "'"));
    }
    else if (m2 !== undefined) {
      values.push(m2.replace(/\\"/g, '"'));
    }
    else if (m3 !== undefined) {
      values.push(m3.replace(/""/g, '"'));
    }
    else if (m4 !== undefined) {
      values.push(m4);
    }
    return '';
  });

  if (/,\s*$/.test(text)) {
    values.push('');
  }

  return values;
}

export function read(filename: string, onLineCallback: (line: string, lineNumber?: number) => void) {
  return new Promise((resolve, reject) => {
    const rs = fs.createReadStream(filename, { autoClose: true });

    const lineReader = readline.createInterface({
      input: rs,
    });

    let lineNumber = 0;
    lineReader.on('line', line => {
      onLineCallback(line, lineNumber);
      ++lineNumber;
    });

    lineReader.on('close', () => {
      return resolve();
    });
  });
}
