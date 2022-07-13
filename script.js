const domain = window.location && window.location.origin;
const exceptedDomains = ["https://e.mail.ru"];

// store original window.open function for restoring in case it's needed
const originalWindowOpen = window.open;
// override original function so unwanted malware cannot use it in its dirty needs
if (domain.includes("tapochek.net")) {
  window.open = function (href) {
    appendClickableNotification(href);
  };
}

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

      #octop,
      #qwerty_wrap,
      #tmp_div_vid_vpaut,
      #vid_vpaut_div {
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
      .serp-item {
        position: relative;
      }
      .serp-item .label_theme_direct {
        background-color: red !important;
        width: 100%;
        opacity: 0.5;
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

  if (domain.includes("pornhub.com")) {
    element.innerText = `
      #age-verification-container,
      #age-verification-wrapper,
      #pb_template {
        display: none !important;
      }
    `;
  }

  if (domain.includes("auto.ru")) {
    element.innerText = `
      .VertisAds,
      .LayoutSidebar__sidebar {
        display: none !important;
      }
      
      .LayoutSidebar__content {
        margin-left: auto;
        margin-right: auto;
      }
    `;
  }

  if (domain.includes("redmine.mamba.ru")) {
    element.innerText = `
      .issue {
        background-color: #eef5ff !important;
      }
    `;
  }

  const head = document.getElementsByTagName("head")[0];
  head.appendChild(element);
})();

function createNotificationElement(href) {
  const div = document.createElement("div");
  div.style = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99999999999;
    background-color: grey;
    cursor: pointer;
    padding: 8px 16px;
    font-size: 48px;
    border-radius: 8px;
  `;
  div.innerHTML = href;
  div.onclick = () => originalWindowOpen(href);

  return div;
}

function appendClickableNotification(href) {
  const element = createNotificationElement(href);
  document.body.appendChild(element);
  setTimeout(() => document.body.removeChild(element), 4000);
}

if (["http://deploy.lan", "http://cportal.lan"].includes(domain)) {
  window.addEventListener("load", function () {
    const inputLogin =
      document.querySelector("#login") ||
      document.querySelector("#inputLogin3") ||
      document.querySelector("#inputEmail");

    const inputPassword =
      document.querySelector("#password") ||
      document.querySelector("#inputPassword3") ||
      document.querySelector("#inputPassword");

    if (!inputLogin || !inputPassword) {
      return;
    }

    inputLogin.value = "stepanenko";
    inputPassword.value = "46Bu7tDN";

    document.querySelector('button[type="submit"]').click();
  });
}
