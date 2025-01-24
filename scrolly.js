import { StepData } from "./common.js";
import { ScrollyError } from "./common.js";
import { validateStepDataArray } from "./common.js";

import { fetchAllDataFromGoogleSheet } from "./google-sheet.js";

let main = null;
let scrolly = null;
let stickyImageContainer = null;
let stickyMapContainer = null;
let story = null;
let steps = null;
let prevStepData = null;

// initialize the scrollama
let scroller = scrollama();

document.addEventListener("DOMContentLoaded", async function () {
  main = document.querySelector("main");
  scrolly = main.querySelector("#scrolly-container");
  stickyImageContainer = scrolly.querySelector("#sticky-image-container");
  stickyMapContainer = scrolly.querySelector("#sticky-map-container");
  story = scrolly.querySelector("article");

  //createScrollyContentFromCSVFile();
  try {
    const allScrollyData = await fetchAllDataFromGoogleSheet();
    validateStepDataArray(
      allScrollyData.stepData,
      "Reading Google Sheet steps tab"
    );
    createAllScrollyContentInHTML(allScrollyData);
  } catch (scrollyError) {
    displayThenThrowError(scrollyError);
  }
});

function createAllScrollyContentInHTML(allScrollyData) {
  createStoryContentInHtml(allScrollyData.storyData);
  createStepsContentInHtml(allScrollyData.stepData);
}

function createStoryContentInHtml(storyData) {
  const title = document.getElementById("title");
  title.innerHTML = storyData.title;

  const subtitle = document.getElementById("subtitle");
  subtitle.innerHTML = storyData.subtitle;

  const endText = document.getElementById("end-text");
  endText.innerHTML = storyData.endText;
}

/* This creates all the steps in HTML for the scrolly story 
    from a stepDataArry 
*/
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
  } else if (stepData.contentType === "map") {
    displayStickyMap(stepData.latitude, stepData.longitude, stepData.zoomLevel);
    addAltTextToMap(stepData.altText);
  }
  prevStepData = stepData;
}

function activateStickyContentContainer(activateContentType) {
  // Fade out all the containers
  stickyMapContainer.style.opacity = 0;
  stickyImageContainer.style.opacity = 0;

  if (activateContentType === "image") {
    // Fade in the new container after the opacity transition
    setTimeout(() => {
      stickyImageContainer.style.opacity = 1;
      stickyImageContainer.style.display = "flex";
      stickyMapContainer.style.display = "none";
    }, 400);
  } else if (activateContentType === "map") {
    setTimeout(() => {
      stickyMapContainer.style.opacity = 1;
      stickyImageContainer.style.display = "none";
      stickyMapContainer.style.display = "block";
    }, 400);
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
    img.style.opacity = 0;

    // fade in the image after the opacity transition
    setTimeout(() => {
      // Change the image source
      img.src = stepData.filePath;
      img.alt = stepData.altText;

      // Fade in the new image
      img.style.opacity = 1;
    }, 500); // Match the duration of the CSS transition

    prevStepData = stepData.filePath;
  }
  if (stepData.zoomLevel) {
    img.style.transform = `scale(${stepData.zoomLevel})`;
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
