// store original window.open function for restoring in case it's needed
const originalWindowOpen = window.open;
// override original function so unwanted malware cannot use it in its dirty needs
window.open = function () {};

document.onkeydown = (event) => {
  const BUTTON_KEYCODE_D = 68;

  if (event.ctrlKey && event.keyCode === BUTTON_KEYCODE_D) {
    toggleWindowOpenReplacement();
  }
};

function toggleWindowOpenReplacement() {
  const isOriginalWindowOpen = window.open === originalWindowOpen;
  window.open = isOriginalWindowOpen ? function () {} : originalWindowOpen;
}

const domain = window.location && window.location.origin;

const exceptedDomains = ["https://e.mail.ru"];

try {
  const serviceWorker = window.navigator && window.navigator.serviceWorker;

  if (exceptedDomains.includes(domain) && serviceWorker) {
    serviceWorker.register = function () {};
  }
} catch (error) {
  // silent
}

(function injectCSS() {
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

      #octop {
        display: none !important;
      }
    `;
  }

  if (domain.includes("yandex.ru")) {
    element.innerText = `
      .container__banner, 
      .b-banner__content,
      .mail-Layout-Content :nth-child(4),
      .mail-Layout-Aside-Inner-Box :nth-child(7) {
        display: none;
      }
    `;
  }

  if (domain.includes("vk.com")) {
    element.innerText = `
      #ads_left {
        display: none !important;
      }
    `;
  }

  const head = document.getElementsByTagName("head")[0];
  head.appendChild(element);
})();
