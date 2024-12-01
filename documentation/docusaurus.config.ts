import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';

const config: Config = {
  title: 'WhatsApp Node',
  tagline: 'TypeScript SDK for WhatsApp Cloud API',
  favicon: 'img/favicon.ico',
  url: 'https://watoolkit.dev',
  baseUrl: '/whatsapp-node',
  organizationName: 'watoolkit',
  projectName: 'whatsapp-node',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/watoolkit/whatsapp-node/tree/main/docs/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  themeConfig: {
    image: 'img/watoolkit-social-card.jpg',
    navbar: {
      title: 'WhatsApp Node',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/watoolkit/whatsapp-node',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/getting-started',
            },
            {
              label: 'API Reference',
              to: '/docs/api',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/watoolkit/whatsapp-node',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} WAToolkit. All rights reserved. A product by <a href="https://happysoftware.mx">Happy Software</a>.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
};

export default config;
