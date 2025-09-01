/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import { Box, Text, useInput } from 'ink';
import {
  type Extension,
  performWorkspaceExtensionMigration,
} from '../../config/extension.js';
import { RadioButtonSelect } from './shared/RadioButtonSelect.js';
import { Colors } from '../colors.js';
import { useState } from 'react';

export function WorkspaceMigrationDialog(props: {
  workspaceExtensions: Extension[];
  onOpen: () => void;
  onClose: () => void;
}) {
  const { workspaceExtensions, onOpen, onClose } = props;
  const [migrationComplete, setMigrationComplete] = useState(false);
  const [failedExtensions, setFailedExtensions] = useState<string[]>([]);
  onOpen();
  const onMigrate = async () => {
    const failed =
      await performWorkspaceExtensionMigration(workspaceExtensions);
    setFailedExtensions(failed);
    setMigrationComplete(true);
  };

  useInput((input) => {
    if (migrationComplete && input === 'q') {
      process.exit(0);
    }
  });

  if (migrationComplete) {
    return (
      <Box
        flexDirection="column"
        borderStyle="round"
        borderColor={Colors.Gray}
        padding={1}
      >
        {failedExtensions.length > 0 ? (
          <>
            <Text>
              以下扩展迁移失败。请尝试手动安装它们。要查看其他更改，必须重新启动 Gemini CLI。
              按 {'q'} 退出。
            </Text>
            <Box flexDirection="column" marginTop={1} marginLeft={2}>
              {failedExtensions.map((failed) => (
                <Text key={failed}>- {failed}</Text>
              ))}
            </Box>
          </>
        ) : (
          <Text>
            迁移完成。要查看更改，必须重新启动 Gemini CLI。
            按 {'q'} 退出。
          </Text>
        )}
      </Box>
    );
  }

  return (
    <Box
      flexDirection="column"
      borderStyle="round"
      borderColor={Colors.Gray}
      padding={1}
    >
      <Text bold>工作区级扩展已弃用
</Text>
      <Text>您想在用户级别安装它们吗？</Text>
      <Text>
        扩展定义将保留在您的工作区目录中。
      </Text>
      <Text>
        如果您选择跳过，可以使用扩展安装命令手动安装它们。
      </Text>

      <Box flexDirection="column" marginTop={1} marginLeft={2}>
        {workspaceExtensions.map((extension) => (
          <Text key={extension.config.name}>- {extension.config.name}</Text>
        ))}
      </Box>
      <Box marginTop={1}>
        <RadioButtonSelect
          items={[
            { label: '安装所有', value: 'migrate' },
            { label: '跳过', value: 'skip' },
          ]}
          onSelect={(value: string) => {
            if (value === 'migrate') {
              onMigrate();
            } else {
              onClose();
            }
          }}
        />
      </Box>
    </Box>
  );
}
