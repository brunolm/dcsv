# Data CSV

Do things with csv files.

## Look

Usage: `dcsv look [options] <filename>`

Options:

```
  -h, --help                   output usage information
  -d, --delimiter <delimiter>  CSV delimiter (default: ,)
  -l, --line-numbers           Show a column with line numbers
```

Output:

```
 - | name                | data                | id
 1 | bruno               | 1337                | 1
 2 | mi"che,ls           | 9999                | 2
 3 | longestHasExactly19 | 123                 | 0
```