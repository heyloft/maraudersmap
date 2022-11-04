# Cyber Quest
A magical map for experiences

<a target="_blank" href="https://expo.dev/@heyloft-dev/maraudersmap?serviceType=classic&distribution=expo-go&release-channel=main"><img alt="Run in Expo Go" width=180 src="https://img.shields.io/badge/Run%20in%20Expo%20Go-217c53.svg?style=flat-square&logo=EXPO&labelColor=212121&logoColor=fff"></a>


## Running app locally with Expo Go
### Environment variables
Create your own local `.env` file for holding environment variables. It must be placed in the root directory. You can use the [`.env` file in the `maraudersmap-secrets` repo](https://github.com/heyloft/maraudersmap-secrets/blob/main/.env) as a template.
### Local backend connection
1. You first need the LAN IP address of your computer. There are many ways to find this address, and it depends on the operating system you are using.

    On **Linux and macOS**, the following should print the address
    ```sh
    ifconfig | grep -E "([0-9]{1,3}\.){3}[0-9]{1,3}" | grep -v 127.0.0.1 | awk '{ print $2 }' | cut -f2 -d:
    ```

    On **Windows**, run `ipconfig` and look for `IPv4 Address`.

    > A LAN IP address is required because your phone cannot access localhost services running on your computer.

    > If your phone is not on the same LAN, the backend must be accessible through the public internet. In that case you can try a service like [Telebit](https://telebit.cloud/).

2. Update `.env` with the following (replacing `<your-LAN-ip-address>` with the address you found above)
    ```
    BASE_URL=http://<your-LAN-ip-address>:8000/
    URL_CODEGEN=http://<your-LAN-ip-address>:8000/openapi.json
    ```
    > Example:
    > ```
    > BASE_URL=http://10.23.12.132:8000/
    > URL_CODEGEN=http://10.23.12.132:8000/openapi.json
    > ```
    > This assumes that your backend is running on the default port `8000`.
    >
    > Make sure to use `http` and not `https` for local connections.

### Launch local dev server
1. Install the Expo command-line interface
```
npm install --global expo-cli
```
2. Clone this repository and navigate into it
3. Install dependencies
```
yarn install
```
4. Launch local dev server
```
yarn start
```
> You might get an error that looks like this
> ```
> ApiV2Error: Entity Not Authorized.
> ```
> This is most likely caused by being logged in with an expo user that is not part of the organization set as `owner` in [`app.json`](app.json). A simple solution is to log out (`expo logout`) before starting the dev server.

### 2. Start app on phone
1. Download `Expo Go` on your phone. Available for both Android and iOS. 
2. Make sure your phone is on the same network as the host computer running frontend and backend.
3. Launch app:
    
    **(Android)**
    Press `Scan QR Code` in the Expo Go app and scan the QR code you see in the terminal.

    **(iOS)**
    Open the default Apple "Camera" app and scan the QR code you see in the terminal.

## Fix issue with `.env` updates
1. Terminate running expo-instance
2. Run `expo r -c`
3. Recommended: Exit expo-instance when QR code pops up and do `yarn start` instead.

## Publishing app
> Publishing is performed automatically with GitHub Actions when the `main` branch is updated. This version is published to the [`main` channel on expo.dev](https://expo.dev/@heyloft-dev/maraudersmap?serviceType=classic&distribution=expo-go&release-channel=main). Similarly, PR preview versions are published for each new pull request (in channel `pr-{prNumber}`). Below are instructions for publishing manually.
1. Login to Expo account
```
expo login
```
2. Publish to [expo.dev](https://expo.dev/)
```
expo publish --release-channel <channel>
```
where `<channel>` could be `main`, `dev` or something else we want to use.

## Updating `.env` for GitHub Actions
In order to use a `.env` file inside GitHub Actions, we store the `.env` file as a base64 encoded string in a repository secret (`ENV_FILE_BASE64_DEV` and `ENV_FILE_BASE64_PROD`). 

Encoding is performed locally with the following command
```
openssl base64 -A -in .env
``` 