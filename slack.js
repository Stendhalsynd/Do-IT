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

  try {
    const res = await Study.update(
      {
        status: "ALLOWED",
      },
      {
        where: {
          id: body.actions[0].value,
        },
      }
    );
    postMessage("스터디 개설을 승낙합니다.", body);
  } catch (error) {
    console.error(error);
  }
});

boltApp.action("reject", async ({ ack, body }) => {
  await ack();

  console.log("거절됨");

  try {
    await Study.update(
      {
        status: "REJECTED",
      },
      {
        where: {
          id: body.actions[0].value,
        },
      }
    );
    postMessage("스터디 개설을 거절합니다.", body);
  } catch (error) {
    console.error(error);
  }
});

boltApp.command("/approve", async ({ command, ack, say }) => {
  try {
    await ack();
    say("승인하기 명령어가 인식되었습니다!");
  } catch (error) {
    console.log("err");
    console.error(error);
  }
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
