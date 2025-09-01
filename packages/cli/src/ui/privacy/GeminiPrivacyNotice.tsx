/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { Box, Newline, Text } from 'ink';
import { Colors } from '../colors.js';
import { useKeypress } from '../hooks/useKeypress.js';

interface GeminiPrivacyNoticeProps {
  onExit: () => void;
}

export const GeminiPrivacyNotice = ({ onExit }: GeminiPrivacyNoticeProps) => {
  useKeypress(
    (key) => {
      if (key.name === 'escape') {
        onExit();
      }
    },
    { isActive: true },
  );

  return (
    <Box flexDirection="column" marginBottom={1}>
      <Text bold color={Colors.AccentPurple}>
        Gemini API 密钥通知
      </Text>
      <Newline />
      <Text>
        通过使用 Gemini API<Text color={Colors.AccentBlue}>[1]</Text>、Google AI Studio<Text color={Colors.AccentRed}>[2]</Text> 以及其他引用这些条款的 Google 开发者服务（统称为“API”或“服务”），您同意遵守 Google API 服务条款（“API 条款”）<Text color={Colors.AccentGreen}>[3]</Text> 和 Gemini API 附加服务条款（“附加条款”）<Text color={Colors.AccentPurple}>[4]</Text>。
      </Text>
      <Newline />
      <Text>
        <Text color={Colors.AccentBlue}>[1]</Text>{' '}
        https://ai.google.dev/docs/gemini_api_overview
      </Text>
      <Text>
        <Text color={Colors.AccentRed}>[2]</Text> https://aistudio.google.com/
      </Text>
      <Text>
        <Text color={Colors.AccentGreen}>[3]</Text>{' '}
        https://developers.google.com/terms
      </Text>
      <Text>
        <Text color={Colors.AccentPurple}>[4]</Text>{' '}
        https://ai.google.dev/gemini-api/terms
      </Text>
      <Newline />
      <Text color={Colors.Gray}>Press Esc to exit.</Text>
    </Box>
  );
};
