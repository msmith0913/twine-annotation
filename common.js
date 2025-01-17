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

export class ScrollyError {
  constructor(Action, Message, Hint) {
    this.Action = Action;
    this.Message = Message;
    this.Hint = Hint;
  }
}
