// Defines all the data needed for a step
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
  constructor(action, message) {
    this.action = action;
    this.message = message;
  }
}
