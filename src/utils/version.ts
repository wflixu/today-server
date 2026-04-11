export const versionDiff = (v1: string, v2: string): number => {
  const [v1_major, v1_minor, v1_patch] = v1
    .split('.')
    .map(item => Number(item));
  const [v2_major, v2_minor, v2_patch] = v2
    .split('.')
    .map(item => Number(item));
  if (v1_major > v2_major) {
    return 3;
  } else if (v1_major < v2_major) {
    return -3;
  } else {
    if (v1_minor > v2_minor) {
      return 2;
    } else if (v1_minor < v2_minor) {
      return -2;
    } else {
      if (v1_patch > v2_patch) {
        return 1;
      } else if (v1_patch < v2_patch) {
        return -1;
      } else {
        return 0;
      }
    }
  }
};
