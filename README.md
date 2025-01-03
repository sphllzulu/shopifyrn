# Shopmate App
Shopmate is a mobile shopping list application designed to help users manage their shopping tasks efficiently. Built with React Native and powered by Redux for state management, the app provides a seamless experience for users to log in, create shopping lists, and track purchased items. Data persistence is achieved using AsyncStorage, ensuring that user data is saved locally even after the app is closed.

# Table of Contents
Features

Screenshots

Installation

Prerequisites

Setting Up the Project

Running the App

Tech Stack

Developer Documentation

Project Structure

Redux Store

Components

Authentication Flow

Shopping List Management

User Guide

Getting Started

Using the App

Contributing

Dependencies

License

## Features
User Authentication:

Login and signup functionality.

Persistent sessions using AsyncStorage.

Shopping List Management:

Add, edit, and delete shopping list items.

Mark items as purchased.

Categorize items (e.g., groceries, toiletries, household).

Data Persistence:

Shopping lists and user data are saved locally.

Responsive UI:

Designed to work seamlessly on both iOS and Android.

Custom Fonts:

Uses the Outfit font for a modern look.

## Screenshots
Auth Screen	Shopping List	Add Item Modal
Auth Screen	Shopping List	Add Item Modal
### Installation
Prerequisites
Before running the app, ensure you have the following installed:

Node.js (v16 or higher)

npm or yarn

React Native CLI or Expo CLI

Xcode (for iOS development) or Android Studio (for Android development)

Setting Up the Project
Clone the repository:

```
git clone https://github.com/sphllzulu/shopifyrn.git
cd shopmate
```
Install dependencies:

```
npm install
or

yarn install
```
Running the App
```
npx expo start

```


## Tech Stack
Frontend: React Native

State Management: Redux, Redux Toolkit

Navigation: React Navigation

Data Persistence: AsyncStorage

Styling: React Native StyleSheet

Fonts: Expo Fonts

## Developer Documentation
Project Structure
Copy
src/
├── components/            # React components
│   ├── AuthScreen.js      # Login/Signup screen
│   ├── ShoppingList.js    # Main shopping list screen
│   └── AddItemModal.js    # Modal for adding/editing items
├── redux/                 # Redux store and slices
│   ├── AuthSlice.js       # Authentication state management
│   ├── shoppingListSlice.js # Shopping list state management
│   └── store.js           # Redux store configuration
├── theme/                 # App theme (colors, fonts)
└── App.js                 # Main application entry point
Redux Store
The app uses Redux for state management, with the following slices:

AuthSlice:

Manages user authentication state.

Actions: login, logout, restoreSession.

Persists user data using AsyncStorage.

ShoppingListSlice:

Manages shopping list items.

Actions: addItem, updateItem, togglePurchased, removeItem, initializeUserItems.

Persists user-specific shopping lists using AsyncStorage.

Components
AuthScreen:

Handles user login and signup.

Validates input fields and dispatches the login action.

ShoppingList:

Displays the user's shopping list.

Allows adding, editing, and deleting items.

Includes a logout button.

AddItemModal:

A modal for adding or editing shopping list items.

Includes fields for item name, quantity, and category.

Authentication Flow
Login:

User enters username and password.

Dispatches the login action, which updates the Redux state and saves user data to AsyncStorage.

Navigates to the ShoppingList screen.

Logout:

Dispatches the logout action, which clears the Redux state and removes user data from AsyncStorage.

Navigates back to the AuthScreen.

Session Restoration:

On app startup, the restoreSession action checks AsyncStorage for saved user data and restores the session if found.

Shopping List Management
Adding Items:

Users can add items via the AddItemModal.

Items are saved to the Redux store and AsyncStorage.

Editing Items:

Users can edit item details (name, quantity, category) via the AddItemModal.

Marking Items as Purchased:

Users can toggle the purchased status of an item.

Deleting Items:

Users can remove items from the list.

## User Guide
Getting Started
Launch the App:

Open the app on your device or emulator.

Login or Sign Up:

If you’re a new user, sign up by entering a username and password.

If you’re a returning user, log in with your credentials.

Using the App
Adding Items:

Tap the + Add Item button.

Enter the item name, quantity, and category.

Tap Add to save the item.

Editing Items:

Tap the ✏️ icon next to the item you want to edit.

Update the details in the modal and tap Update.

Marking Items as Purchased:

Tap the checkbox next to an item to mark it as purchased.

Deleting Items:

Tap the 🗑️ icon next to the item you want to delete.

Logging Out:

Tap the Logout button at the bottom of the shopping list screen.

## Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.

Create a new branch for your feature or bugfix.

Commit your changes.

Submit a pull request.

## Dependencies
React Native: Framework for building mobile apps.

Redux: State management library.

React Navigation: Navigation library for React Native.

AsyncStorage: Persistent storage for user data.

Expo Fonts: For loading custom fonts.