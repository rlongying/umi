import React from 'react';
import { IUiApi } from 'umi-types';
import { message } from 'antd';

import BlocksViewer from './ui/index';
import zhCN from './locales/zh-CN';
import enUS from './locales/en-US';

export default (api: IUiApi) => {
  if (api.isMini()) {
    window.addEventListener('message', e => {
      console.log(`[Block] Received message`, e.data);
      try {
        const { action, payload } = JSON.parse(e.data);
        if (action === 'umi.ui.block.addBlock') {
          // TODO:
          // 1. show mini
          // 2. center mini iframe
          // 3. add block with payload.filename and payload.index
        }
      } catch (e) {}
    });
  }

  api.addLocales({
    'zh-CN': zhCN,
    'en-US': enUS,
  });

  api.addPanel({
    title: 'org.umi.ui.blocks.content.title',
    path: '/blocks',
    icon: 'block',
    actions: [
      {
        title: 'org.umi.ui.blocks.actions.clear',
        type: 'default',
        action: {
          type: 'org.umi.block.clear',
        },
        onClick: async () => {
          try {
            await api.callRemote({
              type: 'org.umi.block.clear',
            });
            message.success('清空缓存成功！');
          } catch (error) {
            message.error(error.message);
          }
        },
      },
    ],
    component: () => <BlocksViewer api={api} />,
  });
};
