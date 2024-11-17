# Email Client Web App

This is a simple email client web application that allows users to view and manage emails dynamically. It supports features like filtering emails by status (read/unread, favorites), viewing email details, and basic pagination for navigating through pages of emails.

## Features

- **Filter Emails**: View emails based on their read/unread status or favorite status.
- **Pagination**: Navigate through multiple pages of emails.
- **Email Details**: View detailed content of an email when clicked.
- **Favorite Emails**: Mark emails as favorites and toggle between the favorite status.
- **Responsive Design**: The app adjusts its layout for mobile devices.

## Technologies Used

- **HTML**
- **CSS**
- **JavaScript**
- **Webpack** for bundling JavaScript and assets
- **Fetch API** for email data fetching

## Installation

1. **Clone the repository** to your local machine:
   ```bash
   git clone https://github.com/your-username/email-client.git
   cd email-client


## Folder Structure

email-client/
│
├── dist/                  # Output folder for the bundled app (after running Webpack)
|   |--- bundle.js
|   |--- index.html
├── src/                   # Source folder containing app's code
│   ├── index.js           # Main JavaScript file
├── public/                # public for style and structure
│   ├── index.html         # Main HTML file
│   ├── styles.css         # CSS styles for the app
├── package.json           # NPM dependencies and scripts
├── webpack.config.js      # Webpack configuration
└── README.md              # This README file



### Webpack Setup Details:
- Make sure your `webpack.config.js` file is correctly set up for both **development** and **production** builds.
- **Scripts**: You'll need two scripts in `package.json` for starting the dev server and for building the production version.

Here’s an example `package.json` script section:

```json
"scripts": {
  "start": "webpack serve --mode development --open",
  "build": "webpack --mode production"
}
