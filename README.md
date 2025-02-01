# Shopmate- React Native Shopping List App

## Overview
Shopmate is a React Native mobile application that provides users with a simple and intuitive shopping list management system. Built with Redux for state management and featuring authentication capabilities, it helps users organize their shopping needs effectively.

## Features
* User authentication system
* Shopping list creation and management
* Add/remove items functionality
* Custom themed interface using the Outfit font family
* Redux-powered state management
* Modal interface for adding new items
  
## Screenshot
![Image](https://github.com/user-attachments/assets/8fd1707f-f74b-434d-9c54-0991cb133882)

## Project Structure
```
sphllzulu-shopifyrn/
├── src/
│   ├── components/
│   │   ├── AddItemModal.js     # Modal for adding new items
│   │   ├── AuthScreen.js       # Authentication screen
│   │   └── ShoppingList.js     # Main shopping list component
│   ├── redux/
│   │   ├── AuthSlice.js        # Authentication state management
│   │   ├── shoppingListSlice.js # Shopping list state management
│   │   └── store.js            # Redux store configuration
│   └── theme/
│       └── colors.js           # App color scheme definitions
├── assets/
│   └── fonts/
│       └── Outfit/             # Outfit font family files
├── App.js                      # Main application entry
├── app.json                    # Expo configuration
├── eas.json                    # EAS Build configuration
├── index.js                    # Application registry
└── package.json                # Project dependencies
```

## Technologies Used
* React Native
* Redux & Redux Toolkit
* Expo
* Custom theming
* Outfit font family

## Setup & Installation

### Prerequisites
* Node.js (v14 or higher)
* npm or yarn
* Expo CLI
* iOS Simulator (for iOS) or Android Emulator

### Installation Steps
1. Clone the repository:
```bash
git clone https://github.com/sphllzulu/shopifyrn.git
cd sphllzulu-shopifyrn
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
expo start
```

4. Run on your preferred platform:
   * Press 'i' for iOS simulator
   * Press 'a' for Android emulator
   * Scan QR code with Expo Go app on your device

## Available Components

### AuthScreen
Handles user authentication with:
* Login functionality
* Registration capability
* Authentication state management

### ShoppingList
Main component for list management featuring:
* Item display
* Item removal
* List organization

### AddItemModal
Modal component for adding new items with:
* Item name input
* Add item functionality
* Modal visibility control

## State Management
The app uses Redux with two main slices:
* `AuthSlice`: Manages authentication state
* `shoppingListSlice`: Handles shopping list data

## Theme Customization
Colors and styling can be modified through:
* `src/theme/colors.js`
* Custom Outfit font implementation

## Font Usage
The app uses the Outfit font family, which includes multiple weights:
* Thin to Black weights available
* Variable font option included
* Licensed under Open Font License (OFL)

## Development Configuration
* `app.json`: Expo configuration settings
* `eas.json`: EAS Build settings for deployment
* `package.json`: Project dependencies and scripts

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact
Your Name - sphllzulu@gmail.com
Project Link: https://github.com/sphllzulu/shopifyrn

## Developer Documentation
https://docs.google.com/document/d/1XqyB57sYgI-YwrGBHNB_FWuAsUl1rr7kyJ2iJG_NqjY/edit?usp=sharing

## User Guide
https://docs.google.com/document/d/1uISJJfDMXmcpGI4c5ytyQtE8KFoOoXZ0CRUeNSCCUL8/edit?usp=sharing

