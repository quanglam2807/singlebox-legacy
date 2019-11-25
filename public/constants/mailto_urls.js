// specifies the URL pattern to handle `mailto` links.
// https://developer.mozilla.org/en-US/docs/Web/API/Navigator/registerProtocolHandler

const MAILTO_URLS = [
  {
    domains: ['fastmail.com'],
    mailtoUrl: 'http://www.fastmail.fm/action/compose/?mailto=%s',
  },
  {
    domains: ['gmail.com', 'mail.google.com', 'googlemail.com'],
    mailtoUrl: 'https://mail.google.com/mail/?extsrc=mailto&url=%s',
  },
  {
    domains: ['outlook.live.com', 'outlook.com', 'hotmail.com'],
    mailtoUrl: 'https://outlook.live.com/owa/?path=/mail/action/compose&to=%s',
  },
  {
    domains: ['mail.yahoo.com', 'yahoomail.com'],
    mailtoUrl: 'https://compose.mail.yahoo.com/?To=%s',
  },
  {
    domains: ['mail.zoho.com'],
    mailtoUrl: 'https://mail.zoho.com/mail/compose.do?extsrc=mailto&mode=compose&tp=zb&ct=%s',
  },
];

module.exports = {
  MAILTO_URLS,
};
