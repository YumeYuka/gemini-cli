/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import type React from 'react';
import { Box, Text } from 'ink';
import { Colors } from '../colors.js';
import type { SlashCommand } from '../commands/types.js';

interface Help {
  commands: readonly SlashCommand[];
}

export const Help: React.FC<Help> = ({ commands }) => (
  <Box
    flexDirection="column"
    marginBottom={1}
    borderColor={Colors.Gray}
    borderStyle="round"
    padding={1}
  >
    {/* Basics */}
    <Text bold color={Colors.Foreground}>
      基础:
    </Text>
    <Text color={Colors.Foreground}>
      <Text bold color={Colors.AccentPurple}>
        添加上下文
      </Text>
      : 使用{' '}
      <Text bold color={Colors.AccentPurple}>
        @
      </Text>{' '}
      来指定上下文文件 (例如,{' '}
      <Text bold color={Colors.AccentPurple}>
        @src/myFile.ts
      </Text>
      ) 来定位特定的文件或文件夹。
    </Text>
    <Text color={Colors.Foreground}>
      <Text bold color={Colors.AccentPurple}>
        Shell 模式
      </Text>
      : 通过{' '}
      <Text bold color={Colors.AccentPurple}>
        !
      </Text>{' '}
      执行 shell 命令 (例如,{' '}
      <Text bold color={Colors.AccentPurple}>
        !npm run start
      </Text>
      ) 或使用自然语言 (例如,{' '}
      <Text bold color={Colors.AccentPurple}>
        启动服务器
      </Text>
      )。
    </Text>

    <Box height={1} />

    {/* Commands */}
    <Text bold color={Colors.Foreground}>
      命令:
    </Text>
    {commands
      .filter((command) => command.description)
      .map((command: SlashCommand) => (
        <Box key={command.name} flexDirection="column">
          <Text color={Colors.Foreground}>
            <Text bold color={Colors.AccentPurple}>
              {' '}
              /{command.name}
            </Text>
            {command.description && ' - ' + command.description}
          </Text>
          {command.subCommands &&
            command.subCommands.map((subCommand) => (
              <Text key={subCommand.name} color={Colors.Foreground}>
                <Text bold color={Colors.AccentPurple}>
                  {'   '}
                  {subCommand.name}
                </Text>
                {subCommand.description && ' - ' + subCommand.description}
              </Text>
            ))}
        </Box>
      ))}
    <Text color={Colors.Foreground}>
      <Text bold color={Colors.AccentPurple}>
        {' '}
        !{' '}
      </Text>
      - shell 命令
    </Text>

    <Box height={1} />

    {/* Shortcuts */}
    <Text bold color={Colors.Foreground}>
      键盘快捷键:
    </Text>
    <Text color={Colors.Foreground}>
      <Text bold color={Colors.AccentPurple}>
        Alt+Left/Right
      </Text>{' '}
      - 在输入中按词跳转
    </Text>
    <Text color={Colors.Foreground}>
      <Text bold color={Colors.AccentPurple}>
        Ctrl+C
      </Text>{' '}
      - 退出应用
    </Text>
    <Text color={Colors.Foreground}>
      <Text bold color={Colors.AccentPurple}>
        {process.platform === 'win32' ? 'Ctrl+Enter' : 'Ctrl+J'}
      </Text>{' '}
      {process.platform === 'linux'
        ? '- 换行 (Alt+Enter 在某些 linux 发行版中有效)'
        : '- 换行'}
    </Text>
    <Text color={Colors.Foreground}>
      <Text bold color={Colors.AccentPurple}>
        Ctrl+L
      </Text>{' '}
      - 清除屏幕
    </Text>
    <Text color={Colors.Foreground}>
      <Text bold color={Colors.AccentPurple}>
        {process.platform === 'darwin' ? 'Ctrl+X / Meta+Enter' : 'Ctrl+X'}
      </Text>{' '}
      - 在外部编辑器中打开输入
    </Text>
    <Text color={Colors.Foreground}>
      <Text bold color={Colors.AccentPurple}>
        Ctrl+Y
      </Text>{' '}
      - 切换 YOLO 模式
    </Text>
    <Text color={Colors.Foreground}>
      <Text bold color={Colors.AccentPurple}>
        Enter
      </Text>{' '}
      - 发送消息
    </Text>
    <Text color={Colors.Foreground}>
      <Text bold color={Colors.AccentPurple}>
        Esc
      </Text>{' '}
      - 取消操作 / 清除输入 (双击)
    </Text>
    <Text color={Colors.Foreground}>
      <Text bold color={Colors.AccentPurple}>
        Shift+Tab
      </Text>{' '}
      - 切换自动接受编辑
    </Text>
    <Text color={Colors.Foreground}>
      <Text bold color={Colors.AccentPurple}>
        Up/Down
      </Text>{' '}
      - 循环浏览您的提示历史
    </Text>
    <Box height={1} />
    <Text color={Colors.Foreground}>
      有关完整的快捷键列表，请参阅{' '}
    </Text>
  </Box>
);
