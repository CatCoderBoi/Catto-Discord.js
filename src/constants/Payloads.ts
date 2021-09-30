export const Heartbeat = {
  op: 1,
  d: null,
};
export const Identify = {
  op: 2,
  d: {
    token: "",
    properties: {
      $os: "linux",
      $browser: "Catto-Discord.js",
      $device: "Catto-Discord.js",
    },
  },
};
