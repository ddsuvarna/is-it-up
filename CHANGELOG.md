# Change Log

All notable changes to this project will be documented in this file.

## Current Version: 0.4

## Go Live version: NA

## [Unreleased]

## [0.4] - 2020-04-02

### Added

- Options.html
- Bootstrap is local served
- Able to add and delete servers to the extension
- Better code for URL handling
- Added bulk addition of servers using json text - Improved UI

### WIP: Future improvements

- Error handling
- Bulk add using upload json file
- Improve notifications by cutting down spam notifications for a service which is down for a very long time (maybe send twice)
- Theme changing code is a bit messy, needs to cleaned and organized for easier future changes
- Give options to change frequency at which the notifier should check the dashboards status (currently once in 10mins)

## [0.3] - 2020-03-18

### Added

- Generated ./server-monk.pem' file
- Cleared commented code and formatted all files

### WIP: Future improvements

- Give options to user to add his own servers (almost achieved)
- Improve notifications by cutting down spam notifications for a service which is down for a very long time (maybe send twice)
- Theme changing code is a bit messy, needs to cleaned and organized for easier future changes
- Give options to change frequency at which the notifier should check the dashboards status (currently once in 10mins)

## [0.2] - 2020-03-18

### Added

- Mute notification button
- Made it cozier
- Better UI
- Dark theme and light theme switch
- changed directory structure

### WIP: Future improvements

- Give options to user to add his own servers (almost achieved)
- Improve notifications by cutting down spam notifications for a service which is down for a very long time (maybe send twice)
- Theme changing code is a bit messy, needs to cleaned and organized for easier future changes
- Give options to change frequency at which the notifier should check the dashboards status (currently once in 10mins)

## [0.1] - 2020-03-17

#### First push to git

### Release Notes

- Currently hardcoded all dashboards data
- Any new dashboard can be added to the json in the './background.js' file - Html generated dynamically

### Current Features

- Notify if any service is down/does not respond
- Show the service status when clicked on the extension icon (simple UI) - Shows port number of service

### WIP: Future improvements

- Give options to user to add his own servers (almost achieved)
- mute notifications for any service if the user is aware that it is down
- Improve notifications by cutting down spam notifications for a service which is down for a very long time (maybe send twice)
