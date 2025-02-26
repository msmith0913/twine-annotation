// Defines all the data needed for a step

export class editionData {
  constructor(twineData, lineData) {
    this.twineData = twineData;
    this.lineData = lineData;
  }
}

export class twineData {
  constructor(
    title,
    author,
    editor,
    license
  ) {
    this.title = DOMPurify.sanitize(title);
    this.author = DOMPurify.sanitize(author);
    this.editor = DOMPurify.sanitize(editor);
    this.license = DOMPurify.sanitize(license);
  }

function isNumber(value) {
  return !isNaN(value);
}

function doesValueExist(value) {
  return value != null && value != "";
}

function stripPercentageCharIfExists(str) {
  return str.endsWith("%") ? str.slice(0, -1) : str;
}

export class lineData {
  constructor(
    lineID,
    lineType,
    line,
    annotation
  ) {
    this.lineID = DOMPurify.sanitize(lineID);
    this.lineType = DOMPurify.sanitize(lineType);
    this.line = DOMPurify.sanitize(line);
    this.annotation = DOMPurify.sanitize(annotation);
  }

  validate(actionTextIfError) {
    const validLineTypes = ["annotated", "unannotated"];
    if (!validLineTypes.includes(this.lineType)) {
      throw new ScrollyError(
        actionTextIfError,
        `Invalid contentType: "${this.lineType}"`,
        `Valid contentType values are: ${validLineTypes.join(", ")}`
      );
    }

export function validateLineDataArray(lineDataArray, actionTextIfError) {
  var line = 1;
  lineDataArray.forEach((lineData) => {
    lineData.validate(actionTextIfError + ", line " + line);
    line++;
  });
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
