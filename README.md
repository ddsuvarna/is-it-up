# server-monk

A simple chrome extension to monitor your REST API servers, sends chrome notification if anything is down. Oh! and there's dark mode too! 

## Installation 

- Open chrome://extensions
- Enable developer options
- Click load unpacked > select the project directory

## Usage 

Click on the extension icon in the chrome extension toolbar
## Build

- Use the ./server-monk.pem" certificate to pack the extension
- Open chrome://extensions
- Enable developer options
- Click Pack Extension
- IMPORTANT: Place the `./server-monk.pem file outside the extension directory
- Browse and select the extension folder path
- Browse and select the 'server-monk.pem' file from its new location (this step is to upgrade the extension without losing the previously obtained extension ID) - Click Pack Extension
- .crx file will be saved in the parent directory of the project

## Contributing

Pull requests are welcome. Any kind of development coding should be done from a new branch and later merged into master after the approval of the moderators. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
