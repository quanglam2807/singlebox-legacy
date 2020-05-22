/* eslint-disable prefer-template */
/* eslint-disable quote-props */
// modified from https://github.com/minbrowser/min/blob/master/main/registryConfig.js
// fix https://github.com/atomery/webcatalog/issues/784

const regedit = require('regedit');

// const installPath = process.execPath
const installPath = 'C:\\Users\\quanglam2807\\AppData\\Local\\Programs\\Singlebox\\Singlebox.exe';

const keysToCreate = [
  'HKCU\\Software\\Classes\\Singlebox',
  'HKCU\\Software\\Classes\\Singlebox\\Application',
  'HKCU\\Software\\Classes\\Singlebox\\DefaulIcon',
  'HKCU\\Software\\Classes\\Singlebox\\shell\\open\\command',
  'HKCU\\Software\\Clients\\StartMenuInternet\\Singlebox\\Capabilities\\FileAssociations',
  'HKCU\\Software\\Clients\\StartMenuInternet\\Singlebox\\Capabilities\\StartMenu',
  'HKCU\\Software\\Clients\\StartMenuInternet\\Singlebox\\Capabilities\\URLAssociations',
  'HKCU\\Software\\Clients\\StartMenuInternet\\Singlebox\\DefaultIcon',
  'HKCU\\Software\\Clients\\StartMenuInternet\\Singlebox\\InstallInfo',
  'HKCU\\Software\\Clients\\StartMenuInternet\\Singlebox\\shell\\open\\command',
];

const registryConfig = {
  'HKCU\\Software\\RegisteredApplications': {
    'Singlebox': {
      value: 'Software\\Clients\\StartMenuInternet\\Singlebox\\Capabilities',
      type: 'REG_SZ',
    },
  },
  'HKCU\\Software\\Classes\\Singlebox': {
    'default': {
      value: 'Singlebox Browser Document',
      type: 'REG_DEFAULT',
    },
  },
  'HKCU\\Software\\Classes\\Singlebox\\Application': {
    'ApplicationIcon': {
      value: installPath + ',0',
      type: 'REG_SZ',
    },
    'ApplicationName': {
      value: 'Singlebox',
      type: 'REG_SZ',
    },
    'AppUserModelId': {
      value: 'Singlebox',
      type: 'REG_SZ',
    },
  },
  'HKCU\\Software\\Classes\\Singlebox\\DefaulIcon': {
    'ApplicationIcon': {
      value: installPath + ',0',
      type: 'REG_SZ',
    },
  },
  'HKCU\\Software\\Classes\\Singlebox\\shell\\open\\command': {
    'default': {
      value: '"' + installPath + '" "%1"',
      type: 'REG_DEFAULT',
    },
  },
  /*
  'HKCU\\Software\\Classes\\.htm\\OpenWithProgIds': {
    'Singlebox': {
      value: 'Empty',
      type: 'REG_SZ',
    }
  },
  'HKCU\\Software\\Classes\\.html\\OpenWithProgIds': {
    'Singlebox': {
      value: 'Empty',
      type: 'REG_SZ',
    },
  },
  'HKCU\\Software\\Clients\\StartMenuInternet\\Singlebox\\Capabilities\\FileAssociations': {
    '.htm': {
      value: 'Singlebox',
      type: 'REG_SZ',
    },
    '.html': {
      value: 'Singlebox',
      type: 'REG_SZ',
    },
  },
  */
  'HKCU\\Software\\Clients\\StartMenuInternet\\Singlebox\\Capabilities\\StartMenu': {
    'StartMenuInternet': {
      value: 'Singlebox',
      type: 'REG_SZ',
    },
  },
  'HKCU\\Software\\Clients\\StartMenuInternet\\Singlebox\\Capabilities\\URLAssociations': {
    'http': {
      value: 'Singlebox',
      type: 'REG_SZ',
    },
    'https': {
      value: 'Singlebox',
      type: 'REG_SZ',
    },
  },
  'HKCU\\Software\\Clients\\StartMenuInternet\\Singlebox\\DefaultIcon': {
    'default': {
      value: installPath + ',0',
      type: 'REG_DEFAULT',
    },
  },
  'HKCU\\Software\\Clients\\StartMenuInternet\\Singlebox\\InstallInfo': {
    'IconsVisible': {
      value: 1,
      type: 'REG_DWORD',
    },
  },
  'HKCU\\Software\\Clients\\StartMenuInternet\\Singlebox\\shell\\open\\command': {
    'default': {
      value: installPath,
      type: 'REG_DEFAULT',
    },
  },
};

const registryInstaller = {
  installAsync: () => new Promise((resolve, reject) => {
    regedit.createKey(keysToCreate, (err) => {
      regedit.putValue(registryConfig, (err2) => {
        if (err || err2) {
          reject(err || err2);
        } else {
          resolve();
        }
      });
    });
  }),
  uninstallAsync: () => new Promise((resolve, reject) => {
    regedit.deleteKey(keysToCreate, (err) => {
      if (err) {
        reject();
      } else {
        resolve();
      }
    });
  }),
};

module.exports = registryInstaller;
