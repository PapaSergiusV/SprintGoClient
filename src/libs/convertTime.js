export const railsToJsTime = (str) => {
  const t = str.split(/-|\.|:|T/);
  return new Date(t[0], +t[1] - 1, t[2], t[3], t[4]);
}

export const getHours = (ms) => ~~(ms / 3600000) % 24;

export const getDays = (ms) => ~~(ms / 24 / 3600000);