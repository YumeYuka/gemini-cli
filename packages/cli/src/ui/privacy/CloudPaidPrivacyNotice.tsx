/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { Box, Newline, Text } from 'ink';
import { Colors } from '../colors.js';
import { useKeypress } from '../hooks/useKeypress.js';

interface CloudPaidPrivacyNoticeProps {
  onExit: () => void;
}

export const CloudPaidPrivacyNotice = ({
  onExit,
}: CloudPaidPrivacyNoticeProps) => {
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
        Vertex AI 通知
      </Text>
      <Newline />
      <Text>
        服务特定条款<Text color={Colors.AccentBlue}>[1]</Text> 已纳入 Google 同意向客户（“协议”）提供 Google Cloud Platform<Text color={Colors.AccentGreen}>[2]</Text> 的协议中。如果协议授权根据 Google Cloud 合作伙伴或经销商计划转售或供应 Google Cloud Platform，则除“合作伙伴特定条款”部分外，服务特定条款中所有对客户的引用均指合作伙伴或经销商（如适用），服务特定条款中所有对客户数据的引用均指合作伙伴数据。服务特定条款中使用的但未定义的术语具有协议中赋予它们的含义。
      </Text>
      <Newline />
      <Text>
        <Text color={Colors.AccentBlue}>[1]</Text>{' '}
        https://cloud.google.com/terms/service-terms
      </Text>
      <Text>
        <Text color={Colors.AccentGreen}>[2]</Text>{' '}
        https://cloud.google.com/terms/services
      </Text>
      <Newline />
      <Text color={Colors.Gray}>Press Esc to exit.</Text>
    </Box>
  );
};
