// Defines all the data needed for a step

export class ScrollyData {
  constructor(StoryData, StepData) {
    this.StoryData = StoryData;
    this.StepData = StepData;
  }
}

export class StoryData {
  constructor(ScrollyType, Title, Subtitle) {
    this.ScrollyType = ScrollyType;
    this.Title = Title;
    this.Subtitle = Subtitle;
  }
}
export class StepData {
  constructor(ContentType, FilePath, Latitude, Longitude, ZoomLevel, Text) {
    this.ContentType = ContentType;
    this.FilePath = FilePath;
    this.Latitude = Latitude;
    this.Longitude = Longitude;
    this.ZoomLevel = ZoomLevel;
    this.Text = Text;
  }
}

export class ScrollyError extends Error {
  constructor(Action, Message, Hint) {
    super(Message);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ScrollyError);
    }

    this.Action = Action;
    this.Message = Message;
    this.Hint = Hint;
  }

  logError() {
    console.log(
      "Error: " + this.Action + "\n" + this.Message + "\n" + this.Hint
    );

    const stackLines = this.stack.split("\n");
    console.log(`(at ${stackLines[1]})`);
  }
}
