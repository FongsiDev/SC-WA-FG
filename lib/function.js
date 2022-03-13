const fetch = require("node-fetch"),
  cfonts = require("cfonts"),
  axios = require("axios");

const getBuffer = async (url, options) => {
  try {
    options ? options : {};
    const res = await axios({
      method: "get",
      url,
      headers: {
        DNT: 1,
        "Upgrade-Insecure-Request": 1,
      },
      ...options,
      responseType: "arraybuffer",
    });
    return res.data;
  } catch (e) {
    console.log(`Error : ${e}`);
  }
};

const getGroupAdmins = (participants) => {
  admins = [];
  for (let i of participants) {
    i.isAdmin ? admins.push(i.jid) : "";
  }
  return admins;
};

const banner = cfonts.render(`hero`, {
  font: "block",
  color: "candy",
  align: "left",
  gradient: ["red", "magenta"],
  lineHeight: 3,
});

module.exports = {
  getBuffer,
  getGroupAdmins,
  banner,
};