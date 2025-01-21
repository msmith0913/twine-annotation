# Scrolly Story Generator

This project allows you to create a scrollytelling story using data from a spreadsheet.

A scrollytelling story is a web page that scrolls text down a web page while other content (such as images, maps, or videos), remain "sticky" and stays in the same position on the page. The sticky content changes as the user scrolls, to illustrate the current step in the story being told.

This project contains a sample [Scrolly Story](https://danschreibersiue.github.io/scrolly-story-generator/) that you can use as a starting point to create your own.

# How to Create Your Own Scrolly Story

Scrolly Stories can be created either from a [Google Sheet](https://docs.google.com/spreadsheets/d/1Nkq7DLecFxgwSs9tC0f_k0tTNTHPrsV3Bqf9L98aSuQ/edit?gid=0#gid=0) linked to your project, or a CSV file of the same format that is uploaded into your GitHub repository. It will be easier to develop your story if you start from a Google Sheet, because you can edit the google sheet and then refresh the story and you'll see your changes right away. To see changes from a CSV file, you'll need to update your git repository with the CSV file before you can see your changes. It is recommended that you develop your story from a Google Sheet, and when it is ready, upload a CSV file for the final version so that all your data is in a single place (the GitHub repository).

## Overview

The main steps

1. Copy this template GitHub repository to your own account
2. Setup a GitHub Page for your repository to host your story
3. Copy the example Google Sheet to your Google Drive
4. Link your Google Sheet to your repository
5. Develop your story by editing the Google Sheet
6. Upload any images, videos, or audio you use in the story into your GitHub repository
7. After you've created your story and want to share it widely, you'll need to do one of the following (explained below):
   - Convert your Google Sheet to a CSV file and upload to your repository (recommended)
   - To continue using Google Sheets, generate your own API key, or

### Detailed Steps

#### Copy GitHub Repository

1. Sign into GitHub using your account credentials
2. Open [this GitHub repository](https://github.com/danschreiberSIUE/scrolly-story-generator) in a new tab
3. In the upper right corner, click _Use this template_ the "Create a new repository"
4. Create a repository name and description specific to your story and press the green _Create Repository_ button at the bottom right

Your new repository will have a URL like `https://github.com/YOUR_GITHUB_NAME/YOUR_REPOSITORY_NAME`

#### Create a GitHub Pages website to host your story

GitHub Pages is a free service that allows you to publish a website directly from a GitHub repository. Your scrollytelling story will be published and accessible on this site.

1. In your new repository, click on the _Settings_ tab/button beneath the search bar
2. Click on the _Pages_ link under "Code and Automation" on the left sidebar
3. Under "Build and Deployment" change _Source_ from _None_ to _Main_, and keep the default / (root) setting, then press _Save_
4. This will publish your site, but it will take a few minutes to complete. Get a cup of coffee, then come back, refresh the browser, and the website URL of your story is displayed at the top of the page. It will be of the form `https://YOUR_GITHUB_NAME.github.io/YOUR_REPOSITORY_NAME/`
5. Go to your new website and verify it matches the example provided by this repository

#### Copy the example Google Sheet

1. Open the [template Google Sheet](https://docs.google.com/spreadsheets/d/1Nkq7DLecFxgwSs9tC0f_k0tTNTHPrsV3Bqf9L98aSuQ/edit?gid=0#gid=0) in a new tab
2. Sign into your Google account and select _File -> Make a Copy_ to save a version of the template to your Google Drive
3. Click the blue _Share_ button and then _Change to anyone with the link_, then _Done_.
4. Go to _File -> Publish to the Web_ , then the green _Publish_ button. Publicly sharing the link is needed for the app to read the spreadsheet. You can close this dialog via the upper right _X_ symbol.

#### Link your Google Sheet to your repository

You need your repository to read your version of the Google Sheet, so that changes you make in your Google Sheet are displayed in your story.

1. At the top of your browser, copy your Google Sheet URL address (it will end in _/edit#gid=0_). Don't copy the URL from the _Published to the web_ address, which will not work with this project.
2. In your GitHub Repository, find the file `google-sheet.js` in the list of files for the project.
3. Click on `google-sheet.js` and it will show the contents of the file.
4. Click the pencil icon in the top right of the file contents and choose _Edit in place_.
5. In the line under `const googleSheetURL = `, replace the URL between the single quotes with your Google Sheet URL. Be sure not to remove the single quotes or the semicolon at the end.
6. Press the green _Commit Changes_ button at the top right

Now you can begin editing your Google Sheet to create your story. After you make an edit, refresh the browser on Pages URL and your changes should appear in your story

# Editing the Google Sheet to Create Your Story

The spreadsheet contains all the data that you'll use to create your scrollytelly story. Updating the data in the Google Sheet will automatically update your Pages site (after you've set it up, above).

The data available to you is broken down into separate tabs of the spreadsheet

## Story Tab

This contains all the data you can change about the story as a whole. It includes:

- **TODO**

## Steps Tab

This contains the data for each step in the story. Each block of text that scrolls up the page is considered a "step".

Each row in this tab is one step, displayed in the order it appears in the tab.

Values are:

- **ContentType** - The kind of sticky content displayed to the right
  - Image
  - Map
- **FilePath** - The path to the image, video, or audio file being used in the step, either relative to the GitHub project, or a URL to an external media
  - Example: ./media/myimage.jpg
  - Example: http://www.siue.edu/some_image.jpeg
- **Latitude** - Used for Map content, to specify the Latitude of the center of the map
  - A floating point number between -90.0 and 90.0
- **Longitude** - Used for Map content, to specify the Longitue of the center of the map
  - A floating point number between -180.0 and 180.0
- **ZoomLevel** - Zoom levels allow you to change the size of what's viewable in the window, which functionally works as the ability to zoom in or out of a map or image.
  - Maps have valid ZoomLevels between 0 (the whole world) and 18 (max zoom)
  - Image ZoomLevels
    - the default 1, so specifying 1 doesn't change the zoom
    - Positive numbers scale the image up or down (zoom in or out)
      - Numbers between 0 and 1 scale an image down, which zooms it out. A value of 0.5 makes the image half as big, and 0 will make the image disappear as it scales the image down to 0 size.
      - Numbers above 1 scale the image up that many times. A value 1.5 will make the image twice ts original size, which zooms in.
      - Negative numbers flip the element as well as scale it. A value of -1.5 will flip the image horizontally and zoom in by a factor of 1.5
- **Text** - The text that scrolls up for this step

# Credits (and licenses)

**TODO**
