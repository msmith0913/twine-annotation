// Defines all the data needed for a step

export class ScrollyData {
  constructor(storyData, stepData) {
    this.storyData = storyData;
    this.stepData = stepData;
  }
}

export class StoryData {
  constructor(scrollyType, title, subtitle) {
    this.scrollyType = ScrollyType;
    this.title = title;
    this.subtitle = subtitle;
  }
}
export class StepData {
  constructor(contentType, filePath, latitude, longitude, zoomLevel, text) {
    this.contentType = contentType;
    this.filePath = filePath;
    this.latitude = latitude;
    this.longitude = longitude;
    this.zoomLevel = zoomLevel;
    this.text = text;
  }
}

export class ScrollyError extends Error {
  constructor(Action, Message, Hint) {
    super(Message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ScrollyError);
    }
    // use Error.message for the error message
    this.action = Action;
    this.hint = Hint;
  }
}
