self.addEventListener('activate', () => {
    console.log('sw activate');
    clients.claim();
});

self.addEventListener("fetch", (event) => {
    console.log(event)
});