# maraudersmap
A magical map for experiences

<a target="_blank" href="https://expo.dev/@heyloft-dev/maraudersmap?serviceType=classic&distribution=expo-go&release-channel=main"><img alt="Run in Expo Go" width=180 src="https://img.shields.io/badge/Run%20in%20Expo%20Go-217c53.svg?style=flat-square&logo=EXPO&labelColor=212121&logoColor=fff"></a>


## Running expo app locally
### Launch Expo Dev tools
1. Install Expo command-line interface
```
npm install --global expo-cli
```
2. Clone this repository and navigate into it
3. Install dependencies
```
yarn install
```
4. Launch Expo Dev Tools
```
yarn start
```
> If you get an error that looks like this
> ```
> ApiV2Error: Entity Not Authorized.
> ```
> This is most likely caused by being logged in with an expo user that is not part of the organization set as `owner` in [`app.json`](app.json). A simple solution is to log out (`expo logout`) before starting Expo Dev Tools.

### 2. Start app on phone
1. Download `Expo Go` on your phone. Available for both Android and IOS. 
2. **Android:**
On your Android device, press `Scan QR Code` on the Expo Go app and scan the QR code you see in the terminal or in Expo Dev Tools. \
**iOS:**
On your iPhone or iPad, open the default Apple "Camera" app and scan the QR code you see in the terminal or in Expo Dev Tools.

## Publishing app
1. Install `expo-updates`
```
expo install expo-updates
```
2. Login to expo account
```
expo login
```
3. Publish to [expo.dev](https://expo.dev/)
```
expo publish --release-channel <channel>
```
where `<channel>` could be `main`, `dev` or something else we want to use.
