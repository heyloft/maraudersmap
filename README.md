# Cyber Quest

*A magical map for experiences*

[![Run in Expo Go](https://img.shields.io/badge/Run%20in%20Expo%20Go-217c53.svg?logo=EXPO&labelColor=212121&logoColor=fff)](https://expo.dev/@heyloft-dev/maraudersmap?serviceType=classic&distribution=expo-go&release-channel=production)
![License](https://img.shields.io/github/license/heyloft/maraudersmap?color=blue)


## 💻 Development
### 🔡 Environment variables
Create your own local `.env` file for holding environment variables. It must be placed in the root directory. You can use `base.env` as a template.
```
cp base.env .env
```

### 🔌 Local backend connection
The backend url (`BASE_URL`) provided in `base.env` points to a deployed "development" version of the backend based on the `main` branch. During development, you might want to point to a local backend instead:
1. You first need the LAN IP address of your computer. There are many ways to find this address, and it depends on the operating system you are using.

    On **Linux and macOS**, the following should print the address
    ```sh
    ifconfig | grep -E "([0-9]{1,3}\.){3}[0-9]{1,3}" | grep -v 127.0.0.1 | awk '{ print $2 }' | cut -f2 -d:
    ```

    On **Windows**, run `ipconfig` and look for `IPv4 Address`.

    > A LAN IP address is required because your phone cannot access localhost services running on your computer.

    > If your phone is not on the same LAN, the backend must be accessible through the public internet. In that case you can try a service like [Telebit](https://telebit.cloud/), and use the provided url instead of a LAN IP address.

2. Update `.env` with the following (replacing `<your-LAN-ip-address>` with the address you found above)
    ```
    BASE_URL=http://<your-LAN-ip-address>:8000
    ```
    > Example:
    > ```
    > BASE_URL=http://10.23.12.132:8000
    > ```
    > This assumes that your backend is running on the default port `8000`.
    >
    > Make sure to use `http` and not `https` for local connections.

### ⚙️ Code generation for API client

Communication with the backend API is performed via the [`DefaultService`](/src/client/services/DefaultService.ts) class. This client, together with its type dependencies, is generated with the [`openapi-typescript-codegen`](https://www.npmjs.com/package/openapi-typescript-codegen) package. Code generation is required each time the backend changes, and is performed with (while the backend is running)
```
yarn codegen
```
> check out [`package.json`](package.json) to see what tricks it does to pull this of 🪄

### 🚀 Launch local dev server
1. Install the Expo command-line interface
    ```
    npm install --global expo-cli
    ```
2. Install dependencies
    ```
    yarn install
    ```
3. Start local dev server
    ```
    yarn start
    ```
    > If your phone is not on the same network as the local dev server, you can use tunneling
    >```
    >yarn start -m tunnel
    >```

    > You might get an error that looks like this
    > ```
    > ApiV2Error: Entity Not Authorized.
    > ```
    > This is most likely caused by being logged in with an expo user that is not part of the organization set as `owner` in [`app.json`](app.json). A simple solution is to log out (`expo logout`) before starting the dev server.

### 📱 Start app on phone
1. Download `Expo Go` on your phone. Available for both Android and iOS. 
2. Make sure your phone is on the same network as the host computer running frontend and backend. If not, use frontend tunneling as mentioned above and a service like [Telebit](https://telebit.cloud/) to expose the local backend service.
3. Launch app:
    
    **(Android)**
    Press `Scan QR Code` in the Expo Go app and scan the QR code you see in the terminal.

    **(iOS)**
    Open the default Apple "Camera" app and scan the QR code you see in the terminal.

### 🔧 Fix issue with `.env` updates
Environment variables retrieved from `.env` when starting the dev server seem to be cached somehow. It is therefore necessary to clear the cache before restarting the dev server if you have updated any values in this file:
1. Terminate running expo-instance
2. Run `yarn start -c`
    > the `-c` flag tells Expo to clear the bundler cache

### 🤖 Updating `.env` for GitHub Actions
In order to use a `.env` file inside GitHub Actions, we store the `.env` file as a base64 encoded string in a repository secret (`ENV_FILE_BASE64_DEV` and `ENV_FILE_BASE64_PROD`). 

Encoding is performed locally with the following command
```
openssl base64 -A -in .env
``` 

## 📤 Publishing app

> This utilizes the legacy Expo service [Classic Updates](https://docs.expo.dev/archive/classic-updates/introduction/)
#### Github Actions
Publishing is performed automatically with GitHub Actions when the `main` and `production` branches are updated. These versions are published to the [`dev`](https://expo.dev/@heyloft-dev/maraudersmap?serviceType=classic&distribution=expo-go&release-channel=dev) and [`production`](https://expo.dev/@heyloft-dev/maraudersmap?serviceType=classic&distribution=expo-go&release-channel=production) channels respectively on [expo.dev](https://expo.dev/). Similarly, PR preview versions are published for each new pull request (in channel `pr-{prNumber}`).

Github Actions is authorized to publish to [expo.dev](https://expo.dev/) via the `EXPO_TOKEN` secret.

#### Manually
1. Login to Expo account
    ```
    expo login
    ```
2. Publish to [expo.dev](https://expo.dev/)
    ```
    expo publish --release-channel <channel>
    ```
    where `<channel>` could be `main`, `dev` or something else we want to use.