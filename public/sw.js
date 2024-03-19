const installEvent = () => {
    self.addEventListener('install', () => {
        console.log('service worker installed');
    });
  };
installEvent();

const activateEvent = () => {
    self.addEventListener('activate', () => {
        console.log('service worker activated');
    });
};
activateEvent();

const activateFetch = () => {
    self.addEventListener('fetch', (event) => {
        console.log(event);
    });
};
activateFetch();