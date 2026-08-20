import { hasDarkBackground } from './project-cover-art';

export function interleaveBrightDark<T extends { id: string }>(items: T[]): T[] {
  const dark: T[] = [];
  const bright: T[] = [];
  for (const item of items) {
    (hasDarkBackground(item.id) ? dark : bright).push(item);
  }
  if (dark.length === 0 || bright.length === 0) return items;

  const run = Math.max(1, Math.min(2, Math.floor(dark.length / bright.length)));
  const result: T[] = [];
  let di = 0;
  let bi = 0;
  while (di < dark.length) {
    const step = Math.min(run, dark.length - di);
    for (let k = 0; k < step; k++) result.push(dark[di++]);
    if (bi < bright.length) result.push(bright[bi++]);
    else if (di < dark.length) {
      for (; di < dark.length; di++) result.push(dark[di]);
    }
  }
  while (bi < bright.length) result.push(bright[bi++]);
  return result;
}