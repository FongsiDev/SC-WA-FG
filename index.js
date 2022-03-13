const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange,
  } = require("@adiwajshing/baileys"),
  fs = require("fs"),
  { banner } = require("./lib/function"),
  go = require("open");
require("./fongsi.js");
nocache("./fongsi.js", (module) => {
  console.log(`${module} Telah Di Update✓\nSubscribe My Channel PM4`);
  go(`https://youtube.com/channel/UCE_BPFJYlvxTFh0a3WRuBBw`, {
    app: "google chrome",
  });
});
const starts = async (Fongsi = new WAConnection()) => {
  Fongsi.logger.level = "warn";
  Fongsi.version = [2, 2143, 8];
  Fongsi.browserDescription = [
    "FONGSI DEVELOPMENT ( PM4 )",
    "V2 BY PM4",
    "windows 10",
  ];
  console.log(banner.string);
  fs.existsSync("./session.json") && Fongsi.loadAuthInfo("./session.json");
  require("@app")(client);
  await Fongsi.connect({ timeoutMs: 30 * 1000 });
  fs.writeFileSync(
    "./session.json",
    JSON.stringify(Fongsi.base64EncodedAuthInfo(), null, "\t")
  );
  require("./fongsi.js")(Fongsi);
};
function nocache(module, cb = () => {}) {
  console.log(
    "[ ! ]",
    `'${module}'`,
    "DI Pantau Oleh PM4\nSubscribe My Channel PM4, Subscribe lah pls..."
  );
  fs.watchFile(require.resolve(module), async () => {
    await uncache(require.resolve(module));
    cb(module);
  });
}
function uncache(module = ".") {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(module)];
      resolve();
    } catch (e) {
      reject(e);
    }
  });
}
starts();