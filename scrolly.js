import { lineData } from "./common.js";
import { ScrollyError } from "./common.js";
import { validateLineDataArray } from "./common.js";

import { fetchAllDataFromGoogleSheet } from "./google-sheet.js";

let main = null;
let edition = null;
let twine = null;
let lines = null;
let prevLineData = null;

document.addEventListener("DOMContentLoaded", async function () {
  main = document.querySelector("main");
  edition = main.querySelector("#edition-container");
  twine = edition.querySelector("story");

  //createEditionContentFromCSVFile();
  try {
    const allEditionData = await fetchAllDataFromGoogleSheet();
    allEditionData.twineData.validate(
      "Reading Google Sheet story tab (first sheet)"
    );
    validateLineDataArray(
      allEditionData.lineData,
      "Reading Google Sheet steps tab (2nd sheet)"
    );
    createAllEditionContentInHTML(allEditionData);
  } catch (scrollyError) {
    displayThenThrowError(scrollyError);
  }
});

function createAllEditionContentInHTML(allEditionData) {
  createTwineContentInHtml(allEditionData.twineData);
  createLineContentInHtml(allEditionData.lineData);
}

function createTwineContentInHtml(twineData) {
  const twineTitle = document.getElementById("twine-title");
  twineTitle.innerHTML = twineData.title;

  const browserTitle = document.getElementById("browser-title");
  browserTitle.innerHTML = twineData.title;

  const author = document.getElementById("author");
  author.innerHTML = twineData.author;

  const editor = document.getElementById("editor");
  editor.innerHTML = twineData.editor;

// this is where I left off editing, 2/27/25; update IDs in index.html
  
function createStepsContentInHtml(stepDataArray) {
  var stepNumber = 1;
  stepDataArray.forEach((stepData) => {
    var stepElement = document.createElement("div");
    stepElement.classList.add("step");
    // dataset is the scrollama element that maps to HTML
    // so updating dataset updates the HTML attributes
    stepElement.dataset.step = stepNumber;
    stepElement.dataset.contentType = stepData.contentType;
    if (stepData.filePath) {
      stepElement.dataset.filePath = stepData.filePath;
    }
    if (stepData.altText) {
      stepElement.dataset.altText = stepData.altText;
    }
    if (stepData.latitude) {
      stepElement.dataset.latitude = stepData.latitude;
    }
    if (stepData.longitude) {
      stepElement.dataset.longitude = stepData.longitude;
    }
    if (stepData.zoomLevel) {
      stepElement.dataset.zoomLevel = stepData.zoomLevel;
    }

    stepElement.innerHTML = `<p class="step-content">${stepData.text}</p>`;
    story.appendChild(stepElement);
    stepNumber++;
  });

  // re-query the steps after creating them from CSV data
  steps = story.querySelectorAll(".step");

  // initialize scrollama only after the scrolly content has been created
  initScrollama();
}

function isParseError(parseErrors, papaErrors) {
  return false;
}

function displayThenThrowError(stepError) {
  const errorMessage = document.getElementById("error-message");
  errorMessage.innerHTML = stepError.message;

  const errorAction = document.getElementById("error-action");
  errorAction.innerHTML = stepError.action;

  const errorHint = document.getElementById("error-hint");
  if (stepError.hint) {
    errorHint.innerHTML = stepError.hint;
    errorHint.style.display = "block";
  } else {
    errorHint.style.display = "none";
  }

  const errorContainer = document.getElementById("error-container");
  errorContainer.style.display = "flex"; // Show the error container

  // Since stepError a subclass of Error, we want to throw it after
  // we display the error in HTML so that the full stack trace is available
  // to the user in the console
  throw stepError;
}

// scrollama event handlers
function handleStepEnter(response) {
  var el = response.element;

  // Set active step state to is-active and all othe steps not active
  steps.forEach((step) => step.classList.remove("is-active"));
  el.classList.add("is-active");

  replaceStepStickyContent(el.dataset);
}

/* As we enter a step in the story, replace or modify the sticky content
   in HTML based on the step data
*/
function replaceStepStickyContent(stepData) {
  // activate the right container if it's different from previous step
  if (
    prevStepData == null ||
    prevStepData.contentType != stepData.contentType
  ) {
    activateStickyContentContainer(stepData.contentType);
  }

  // Replace the content in the sticky container
  if (stepData.contentType === "image") {
    displayStickyImage(stepData);
  } else if (stepData.contentType === "video") {
    displayStickyVideo(stepData);
  } else if (stepData.contentType === "map") {
    displayStickyMap(stepData.latitude, stepData.longitude, stepData.zoomLevel);
    addAltTextToMap(stepData.altText);
  }
  prevStepData = stepData;
}

function activateStickyContentContainer(activateContentType) {
  // Start fading out the old container (just do all of them).
  // We've set up a transition on opacity, so setting it to 0 or 1 will take
  // as long as specified in CSS. We can fade in the new content after that
  stickyMapContainer.style.opacity = 0;
  stickyImageContainer.style.opacity = 0;
  stickyVideoContainer.style.opacity = 0;

  stopPlayingVideo(); // in case video is playing, don't want to hear it after it scrolls off page

  // Fade in the new container after the opacity transition
  if (activateContentType === "image") {
    setTimeout(() => {
      stickyImageContainer.style.opacity = 1;
      stickyImageContainer.style.display = "flex";
      stickyVideoContainer.style.display = "none";
      stickyMapContainer.style.display = "none";
    }, transitionInMilliseconds);
  } else if (activateContentType === "map") {
    setTimeout(() => {
      stickyMapContainer.style.opacity = 1;
      stickyMapContainer.style.display = "block";
      stickyImageContainer.style.display = "none";
      stickyVideoContainer.style.display = "none";
    }, transitionInMilliseconds);
  } else if (activateContentType === "video") {
    setTimeout(() => {
      stickyVideoContainer.style.opacity = 1;
      stickyVideoContainer.style.display = "block";
      stickyImageContainer.style.display = "none";
      stickyMapContainer.style.display = "none";
    }, transitionInMilliseconds);
  }
}

function displayStickyImage(stepData) {
  const img = document.getElementById("the-sticky-image");

  // only replace sticky image if it has changed, to avoid flickering
  if (
    !prevStepData ||
    (stepData.filePath && prevStepData.filePath != stepData.filePath)
  ) {
    // Fade out the current image before changing the source
    // Note that this will double the transition when we are switching from
    // an image to a different content type because the containers also fade in/out
    // in that case, but that's ok, a longer transition is appropriate in that case
    img.style.opacity = 0;

    // fade in the image after the opacity transition
    setTimeout(() => {
      // Change the image source
      img.src = stepData.filePath;
      img.alt = stepData.altText;
      img.style.opacity = 1;
    }, transitionInMilliseconds);

    prevStepData = stepData.filePath;
  }
  if (stepData.zoomLevel) {
    img.style.transform = `scale(${stepData.zoomLevel})`;
  }
}

function displayStickyVideo(stepData) {
  stickyVideoContainer.innerHTML = `<iframe 
                id="the-iframe-video"
                src="${stepData.filePath}"
                frameborder="0"
                referrerpolicy="strict-origin-when-cross-origin"
                >
            </iframe>`;
  stickyVideoContainer.ariaLabel = stepData.altText;
  stickyVideoContainer.role = "tooltip";

  prevStepData = stepData.filePath;
}

function stopPlayingVideo() {
  // To properly do this, we'd have to know which streaming service, if any, is currently
  // playing and call a different API for each service to stop their player.
  // Instead, we'll just blank out the source of the video -- it will get loaded again the
  // next time a step is invoked.
  const iframe = document.getElementById("the-iframe-video");
  if (iframe != null) {
    iframe.src = "";
  }
}

function addAltTextToMap(altText) {
  const map = document.getElementById("sticky-map-container");
  map.setAttribute("aria-label", altText);
}

function initScrollama() {
  scroller
    .setup({
      step: "#scrolly-container article .step",
      offset: 0.5, // what % from the top of the viewport the step should be considered "entered"
      debug: false,
    })
    .onStepEnter(handleStepEnter);

  // setup resize event
  window.addEventListener("resize", scroller.resize);
}
