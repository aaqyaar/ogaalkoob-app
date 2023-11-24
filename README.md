# Ogaalkoob

Ogaalkoob is an online e-book reader app that people can use to purchase and read books online. The app is built using React Native and Next.js

## Tech Stack

- [x] React Native
- [x] TypeScript
- [x] Zustand
- [x] React Native MMKV
- [x] Next.js
- [x] REST API

## Getting Started

Clone the repository and run the following commands to get started:

```bash
git clone https://github.com/aaqyaar/ogaalkoob-app.git
```

```bash
cd ogaalkoob-app
```

```bash
yarn install

# Prebuild the app because their are some native dependencies like (mmkv)
yarn prebuild
```

```bash
# For iOS
yarn ios --(device, simulator) [Device Name]
# For Android
yarn android
```

## Screenshots

Coming soon...

## Installing App on Simulator

Create a folder named `assets` in the `android/app/src/main` directory.

Then create a file named `local.properties` in the `android` directory and add the following line:

```bash
sdk.dir = /Users/abdizamed/Library/Android/sdk
```

Then run the following command to install the app on the simulator:

```bash
yarn android
```

## Publishing Android Apk

Generate a keystore file using the following command:

````bash
sudo keytool -genkey -v -keystore ogaalkoob.keystore -alias ogaalkoob-app -keyalg RSA -keysize 2048 -validity 10000
```

Then place the keystore file in the `android/app` directory.

Create a file named `gradle.properties` in the `android` directory and add the following lines:

```bash
MYAPP_UPLOAD_STORE_FILE=ogaalkoob.keystore
MYAPP_UPLOAD_KEY_ALIAS=ogaalkoob-app
MYAPP_UPLOAD_STORE_PASSWORD=aaqyaar@10
MYAPP_UPLOAD_KEY_PASSWORD=aaqyaar@10
````

Then open the `android/app/build.gradle` file and add the following lines:

```bash
 release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
```

Then run the following command to generate the apk:

```bash
yarn release:android
```
