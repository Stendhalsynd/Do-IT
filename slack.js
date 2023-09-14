const { App, LogLevel } = require("@slack/bolt");
const { Study } = require("./models");

let logLevel = LogLevel.INFO;

const {
  SLACK_BOT_TOKEN4: token,
  SLACK_APP_TOKEN4: appToken,
  SLACK_SIGNING_SECRET4: signingSecret,
} = process.env;

const boltApp = new App({
  token,
  logLevel,
  signingSecret,
  socketMode: true,
  appToken,
});

boltApp.action("approve", async ({ ack, body }) => {
  await ack();

  console.log("승인됨");

  body.actions.forEach(async (action) => {
    const id = action.value;

    const beforeStudyStatus = (await Study.findByPk(id)).status;

    try {
      const res = await Study.update(
        {
          status: "ALLOWED",
        },
        { where: { id } }
      );

      const afterStudyStatus = (await Study.findByPk(id)).status;

      if (beforeStudyStatus !== afterStudyStatus)
        postMessage("스터디 개설을 승낙합니다.", body);
    } catch (error) {
      console.error(error);
    }
  });
});

boltApp.action("reject", async ({ ack, body }) => {
  await ack();

  console.log("거절됨");

  body.actions.forEach(async (action) => {
    const id = action.value;

    const beforeStudyStatus = (await Study.findByPk(id)).status;

    try {
      const res = await Study.update(
        {
          status: "REJECTED",
        },
        { where: { id } }
      );

      const afterStudyStatus = (await Study.findByPk(id)).status;

      if (beforeStudyStatus !== afterStudyStatus)
        postMessage("스터디 개설을 거절합니다.", body);
    } catch (error) {
      console.error(error);
    }
  });
});

const postMessage = async (text, body) => {
  await boltApp.client.chat.postMessage({
    token,
    channel: body.channel.id,
    thread_ts: body.message.ts,
    text,
  });
};

(async () => {
  const port = 3000;
  // Start your app
  await boltApp.start(process.env.PORT || port);
  console.log(`⚡️ Slack Bolt app is running on port ${port}!`);
})();

module.exports = boltApp;
