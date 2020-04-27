window.open = function () {};

const domain = window.location && window.location.origin;

const exceptedDomains = ["https://e.mail.ru"];

const serviceWorker = window.navigator.serviceWorker;

if (exceptedDomains.includes(domain) && serviceWorker) {
  serviceWorker.register = function () {};
}

(function injectCSS() {
  const head = document.getElementsByTagName("head")[0];
  const element = document.createElement("style");
  element.setAttribute("type", "text/css");
  element.setAttribute("script-src", "unsafe-inline");

  if (!domain) {
    return;
  }

  if (domain.includes("tapochek.net")) {
    element.innerText = `
      .winter {
        max-width: 100% !important;
      }
      
      #body_container {
        max-width: 100% !important;
        margin: 0 !important;
      }
    `;
  }

  if (domain.includes("yandex.ru")) {
    element.innerText = `
      .container__banner, 
      .b-banner__content {
        display: none;
      }
    `;
  }

  head.appendChild(element);
})();
