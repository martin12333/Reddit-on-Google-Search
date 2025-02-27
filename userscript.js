// ==UserScript==
// @name         Reddit on Google Search
// @version      1.0.61
// @description  Adds a button to search Reddit via Google Search
// @author       Alexyoe
// @namespace    https://github.com/martin12333/Reddit-on-Google-Search
// @license      MIT
// @include      http*://www.google.*/search*
// @include      http*://google.*/search*
// @run-at       document-end
// ==/UserScript==

// Settings
const iconVisible = true; // Toggle icon visibility
const nameVisible = true; // Toggle name visibility
const btnPosition = "end"; // Start or End
const fixSize = false; // Expands the search buttons bar

// Start Code
const queryRegex = /q=[^&]+/g;
const siteRegex = /\+site(?:%3A|\:).+\.[^&+]+/g;
const redditUrl = "+site%3Areddit.com";
let redditIcon =
  '<svg class="DCxYpf" foscusable="false" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path d="M0 7.59c.1-.26.15-.54.28-.77.57-1 1.83-1.29 2.79-.67.09.06.15.06.24 0A8.94 8.94 0 017.5 5c.1 0 .15-.04.19-.14l1.17-3.32.05-.15 1.23.3c.56.12 1.12.25 1.68.4.1.02.15 0 .2-.09a1.66 1.66 0 013.06 1.02c-.06.8-.72 1.46-1.5 1.52-.85.06-1.6-.47-1.77-1.28-.04-.17-.1-.23-.27-.27L9.54 2.5l-.88 2.48c.37.05.72.08 1.07.14 1.05.17 2.04.5 2.96 1.04.09.05.14.05.23 0a1.99 1.99 0 012.34 3.2c-.04.04-.08.11-.08.17a3.67 3.67 0 01-.9 2.73 6.36 6.36 0 01-2.9 1.92c-2.47.86-4.93.8-7.35-.22a5.89 5.89 0 01-2.48-1.9A3.56 3.56 0 01.8 9.5c0-.04 0-.1-.03-.11a2.1 2.1 0 01-.76-1.32v-.01-.47zm7.72 6.22c1.5 0 2.67-.21 3.73-.66a5.2 5.2 0 002.15-1.54c.83-1.06.85-2.3.06-3.38-.4-.56-.93-.97-1.52-1.3a8.15 8.15 0 00-3.44-.97 9.04 9.04 0 00-4.17.63c-.83.35-1.58.82-2.15 1.54a2.66 2.66 0 00-.08 3.38c.41.57.95.99 1.55 1.32 1.29.7 2.68.97 3.87.98zm5.7-11.63a.7.7 0 00-.7.7c0 .39.32.7.7.71a.7.7 0 00.72-.72.7.7 0 00-.72-.7zm1.44 6.2a1 1 0 00-.05-1.22c-.29-.34-.79-.48-1.14-.3.49.43.9.92 1.19 1.53zM1.12 8.38c.3-.6.7-1.09 1.19-1.52-.35-.16-.81-.03-1.1.29-.3.33-.34.83-.09 1.23z"/><path d="M7.98 13.1a4.77 4.77 0 01-1.99-.45 3.58 3.58 0 01-.65-.45c-.24-.2-.24-.5-.04-.7.19-.2.47-.19.7.01.33.3.73.44 1.16.52.76.14 1.52.11 2.24-.17.24-.1.45-.24.66-.38.22-.16.5-.16.68.03.18.2.17.5-.04.68-.43.39-.95.62-1.5.73-.4.08-.81.12-1.22.18zM11.67 9.04a1.3 1.3 0 01-2.6 0 1.3 1.3 0 012.6 0zM4.46 9.04c0-.73.6-1.3 1.32-1.3a1.3 1.3 0 11-1.32 1.3z"/></svg>';
const isImageSearch = /[?&]tbm=isch/.test(location.search);

// Allow importing SVG
if (typeof trustedTypes !== "undefined") {
  const policy = trustedTypes.createPolicy("html", {
    createHTML: (input) => input,
  });
  redditIcon = policy.createHTML(redditIcon);
}

// Main function runs on load
(function () {
  // Create the main link element
  const el = document.createElement("a");
  el.className = isImageSearch ? "NZmxZe" : "nPDzT T3FoJb";

  // Create the div element for the text
  const mainDiv = document.createElement("div");
  mainDiv.className = "GKS7s";

  // Create the span to wrap the icon and title
  const span = document.createElement("span");
  span.style.cssText = "display:inline-flex;gap:5px;";
  span.className = isImageSearch ? "m3kSL" : "FMKtTb UqcIvb";

  // create the div to hold our SVG
  const iconDiv = document.createElement("div");
  iconDiv.style.cssText = nameVisible
    ? "height:16px;width:16px;display:block;fill:white;"
    : "height:16px;width:16px;display:block;margin:auto;fill:white;";
  iconDiv.innerHTML = redditIcon;

  // Create the text node to hold the button title
  const textNode = document.createTextNode("Reddit");
  // Add iconDiv to the span element
  if (iconVisible) {
    span.appendChild(iconDiv);
  }
  // Add textNode to the span element
  if (nameVisible) {
    if (!isImageSearch) {
      span.appendChild(textNode);
    }
  }

  // Add span to the mainDiv
  mainDiv.appendChild(span);
  // Add mainDiv to the main link element
  el.appendChild(mainDiv);
  // Add text node last if isImageSearch is true
  if (isImageSearch) {
    el.appendChild(textNode);
  }

  // Add site:reddit.com to the query
  el.href = window.location.href.replace(queryRegex, (match) =>
    match.search(siteRegex) >= 0
      ? match.replace(siteRegex, redditUrl)
      : match + redditUrl
  );

  // Insert the link into Google search
  if (isImageSearch) {
    let menuBar = document.querySelector(".T47uwc");
    menuBar.insertBefore(el, menuBar.children[menuBar.childElementCount - 1]);
  } else {
    let menuBar = document.querySelectorAll(".IUOThf")[0];
    switch (btnPosition) {
      case "start":
        menuBar.insertBefore(el, menuBar.children[0]);
        break;
      case "end":
        menuBar.appendChild(el);
        break;
      default:
        menuBar.appendChild(el);
        break;
    }
  }

  // Fix Sizing
  if (fixSize) {
    const buttonBox = document.querySelector(".xhjkHe");
    buttonBox.style.maxWidth = "inherit";
  }
})();
