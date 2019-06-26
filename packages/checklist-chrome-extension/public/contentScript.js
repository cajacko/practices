const selectors = [
  {
    urls: ["jira", "stash", "bitbucket"],
    selectors: [
      ".merge-button",
      "#create-branch-submit",
      "#show-create-pr-button"
    ]
  },
  {
    urls: ["github"],
    selectors: [".btn-group-merge"]
  }
];

const elements = [];

const grabElements = () => {
  selectors.forEach(selector => {
    const shouldCheck = !!selector.urls.find(url =>
      window.location.href.includes(url)
    );

    if (!shouldCheck) return;

    selector.selectors.forEach(selec => {
      const temp = document.querySelectorAll(selec);

      if (temp && temp.length) {
        temp.forEach(el => {
          elements.push({
            original: el,
            parent: el.parentNode
          });
        });
      }
    });
  });
};

const disableElements = () => {
  elements.forEach(({ original, parent }, i) => {
    const newEl = document.createElement("div");

    newEl.innerHTML = "<span>Disabled</span>";

    newEl.style = {
      backgroundColor: "red"
    };

    elements[i].disabled = newEl;

    parent.replaceChild(newEl, original);
  });
};

const enableElements = () => {
  elements.forEach(({ original, parent, disabled }, i) => {
    parent.replaceChild(original, disabled);
  });
};

grabElements();
disableElements();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request && request.type) {
    switch (request.type) {
      case "enable":
        enableElements();
        break;
      case "disable":
        disableElements();
        break;
      default:
        break;
    }
  }
});
