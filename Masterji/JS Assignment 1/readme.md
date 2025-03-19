# Mood Tracker

This is a simple Mood Tracker web application that allows users to track their mood on different days. The app allows users to select a date and mood, then save their mood for that day. 

The application also includes a **Mood Report** feature, where users can see the mood for the last 1, 7, or 30 days.

## Features

- Select a date using a date picker.
- Choose a mood from four options: Happy, Sad, Neutral, or Excited (with emojis).
- Submit the form, and ensure all fields are filled before saving.
- **Mood Report**: View mood reports for the last 1, 7, or 30 days.
- Data validation to check for required fields.


## Installation

To use this application, follow these steps:

1. **Clone the repository**
2. Navigate into the project folder:
```
bash
cd Masterji/JS Assignment 1
```
3. Open the index.html file in your browser to view the application: Simply double-click index.html or open it in any modern web browser.


## Files
- index.html: The main HTML file containing the structure of the application where user fills up their data and save the record.
- style.css: Custom styling for the app to ensure a clean and responsive design.
- index.js: JavaScript file for handling the form validation, date and mood selection logic.
- report.html : User can view their submitted data in a report format.
- README.md: This file explains how to set up and use the project.


## Usage
- Select a Date: Click on the date input field and choose a date from the calendar.
- Select a Mood: Choose a mood by clicking on the appropriate radio button.
1. 😊 Happy
2. 😢 Sad
3. 😐 Neutral
4. 😄 Excited
- Save: Click the "Save" button to submit your mood for the selected date.
- Validation: If any field is missing, a validation message will appear, prompting the user to fill out all the required fields.

## Viewing the Mood Report
- Navigate to the Mood Report Page via the "Last 1 Day", "Last 7 Days", or "Last 30 Days" buttons.
- The report displays the mood history for the selected range (1 day, 7 days, or 30 days).
- The report page also has a Back to Previous Page button to navigate back to the main mood tracker form.


## Technologies Used
1. HTML: Markup for the structure of the application.
2. CSS (Bootstrap): Styling and layout for a responsive and mobile-friendly design.
3. JavaScript: Used for handling the form submission, validation, mood report logic, and time range filtering.