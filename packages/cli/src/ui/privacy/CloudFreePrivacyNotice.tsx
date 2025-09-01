/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { Box, Newline, Text } from 'ink';
import { RadioButtonSelect } from '../components/shared/RadioButtonSelect.js';
import { usePrivacySettings } from '../hooks/usePrivacySettings.js';
import { CloudPaidPrivacyNotice } from './CloudPaidPrivacyNotice.js';
import type { Config } from '@google/gemini-cli-core';
import { Colors } from '../colors.js';
import { useKeypress } from '../hooks/useKeypress.js';

interface CloudFreePrivacyNoticeProps {
  config: Config;
  onExit: () => void;
}

export const CloudFreePrivacyNotice = ({
  config,
  onExit,
}: CloudFreePrivacyNoticeProps) => {
  const { privacyState, updateDataCollectionOptIn } =
    usePrivacySettings(config);

  useKeypress(
    (key) => {
      if (privacyState.error && key.name === 'escape') {
        onExit();
      }
    },
    { isActive: true },
  );

  if (privacyState.isLoading) {
    return <Text color={Colors.Gray}>加载中...</Text>;
  }

  if (privacyState.error) {
    return (
      <Box flexDirection="column" marginY={1}>
        <Text color={Colors.AccentRed}>
          加载选择加入设置时出错：{privacyState.error}
        </Text>
        <Text color={Colors.Gray}>按 Esc 退出。</Text>
      </Box>
    );
  }

  if (privacyState.isFreeTier === false) {
    return <CloudPaidPrivacyNotice onExit={onExit} />;
  }

  const items = [
    { label: 'Yes', value: true },
    { label: 'No', value: false },
  ];

  return (
    <Box flexDirection="column" marginY={1}>
      <Text bold color={Colors.AccentPurple}>
        Gemini Code Assist 个人版隐私声明
      </Text>
      <Newline />
      <Text>
        本声明和我们的隐私政策<Text color={Colors.AccentBlue}>[1]</Text> 描述了
        Gemini Code Assist 如何处理您的数据。请仔细阅读。
      </Text>
      <Newline />
      <Text>
        当您使用 Gemini CLI 的 Gemini Code Assist 个人版时，Google
        会收集您的提示、相关代码、生成的输出、代码编辑、相关功能使用信息以及您的反馈，以提供、改进和开发
        Google 产品和服务以及机器学习技术。
      </Text>
      <Newline />
      <Text>
        To help with quality and improve our products (such as generative
        machine-learning models), human reviewers may read, annotate, and
        process the data collected above. We take steps to protect your privacy
        as part of this process. This includes disconnecting the data from your
        Google Account before reviewers see or annotate it, and storing those
        disconnected copies for up to 18 months. Please don&apos;t submit
        confidential information or any data you wouldn&apos;t want a reviewer
        to see or Google to use to improve our products, services and
        machine-learning technologies.
      </Text>
      <Newline />
      <Box flexDirection="column">
        <Text>
          Allow Google to use this data to develop and improve our products?
        </Text>
        <RadioButtonSelect
          items={items}
          initialIndex={privacyState.dataCollectionOptIn ? 0 : 1}
          onSelect={(value) => {
            updateDataCollectionOptIn(value);
            // Only exit if there was no error.
            if (!privacyState.error) {
              onExit();
            }
          }}
        />
      </Box>
      <Newline />
      <Text>
        <Text color={Colors.AccentBlue}>[1]</Text>{' '}
        https://policies.google.com/privacy
      </Text>
      <Newline />
      <Text color={Colors.Gray}>Press Enter to choose an option and exit.</Text>
    </Box>
  );
};
