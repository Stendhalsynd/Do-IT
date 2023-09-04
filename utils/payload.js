function definePayload(
  memTotal,
  startDate,
  endDate,
  title,
  intro,
  category,
  studyId
) {
  return {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: "스터디 개설이 요청되었습니다.",
        },
      },
      {
        type: "section",
        fields: [
          {
            type: "mrkdwn",
            text: `*타이틀:*\n${title}`,
          },
          {
            type: "mrkdwn",
            text: `*소개글:*\n${intro}`,
          },
          {
            type: "mrkdwn",
            text: `*시작일:*\n${startDate}`,
          },
          {
            type: "mrkdwn",
            text: `*종료일:*\n${endDate}`,
          },
          {
            type: "mrkdwn",
            text: `*정원:*\n${memTotal}명`,
          },
          {
            type: "mrkdwn",
            text: `*카테고리:*\n${category}`,
          },
        ],
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "승낙하기",
            },
            action_id: "approve",
            style: "primary",
            value: `${studyId}`,
          },
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "거절하기",
            },
            action_id: "reject",
            style: "danger",
            value: `${studyId}`,
          },
        ],
      },
    ],
  };
}

module.exports = definePayload;
