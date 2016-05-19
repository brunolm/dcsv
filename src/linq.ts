export function max<T, TResult>(a: T[], selector?: (e: T) => TResult): TResult {
  if (!a.length) {
    throw new Error('Sequence contains no elements.');
  }

  selector = selector || (o => <any>o);

  let max = selector(a[0]);

  for (let i = 0, n = a.length; i < n; ++i) {
    let next = selector(a[i]);
    if (next > max) {
      max = next;
    }
  }

  return max;
}
