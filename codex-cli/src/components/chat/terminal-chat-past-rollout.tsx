import type { TerminalChatSession } from "../../utils/session.js";
import type { ChatCompletionMessageParam } from "openai/resources/chat/completions.mjs";

import TerminalChatResponseItem from "./terminal-chat-response-item";
import { Box, Text } from "ink";
import React from "react";

export default function TerminalChatPastRollout({
  session,
  items,
}: {
  session: TerminalChatSession;
  items: Array<ChatCompletionMessageParam>;
}): React.ReactElement {
  const { version, id: sessionId, model } = session;
  return (
    <Box flexDirection="column">
      <Box borderStyle="round" paddingX={1} width={64}>
        <Text>
          ● OpenAI <Text bold>Codex</Text>{" "}
          <Text dimColor>
            (research preview) <Text color="blueBright">v{version}</Text>
          </Text>
        </Text>
      </Box>
      <Box
        borderStyle="round"
        borderColor="gray"
        paddingX={1}
        width={64}
        flexDirection="column"
      >
        <Text>
          <Text color="magenta">●</Text> localhost{" "}
          <Text dimColor>· session:</Text>{" "}
          <Text color="magentaBright" dimColor>
            {sessionId}
          </Text>
        </Text>
        <Text dimColor>
          <Text color="blueBright">↳</Text> When / Who:{" "}
          <Text bold>
            {session.timestamp} <Text dimColor>/</Text> {session.user}
          </Text>
        </Text>
        <Text dimColor>
          <Text color="blueBright">↳</Text> model: <Text bold>{model}</Text>
        </Text>
      </Box>
      <Box flexDirection="column" gap={1}>
        {React.useMemo(
          () =>
            items.map((item, key) => (
              <TerminalChatResponseItem key={key} item={item} />
            )),
          [items],
        )}
      </Box>
    </Box>
  );
}
