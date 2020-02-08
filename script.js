window.open = function() {};

const domain = window.location && window.location.origin;

const exceptedDomains = ["https://e.mail.ru"];

const serviceWorker = window.navigator.serviceWorker;

if (exceptedDomains.indexOf(domain) === -1 && serviceWorker) {
  serviceWorker.register = function() {
    Promise.reject("Хуй вам, а не serviceWorker");
  };
}
