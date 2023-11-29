#!/bin/bash

# Create local.properties file
echo "Creating local.properties file"

echo "Enter your mac username: "
read mac_username

echo "sdk.dir=/Users/$mac_username/Library/Android/sdk" > android/local.properties

# Create assets folder
mkdir -p android/app/src/main/assets

 
# Generate keystore file
# can you prompt the user to enter file name and password

echo "Generating keystore file" 

echo "Enter the keystore file name: "
read keystore_file_name

echo "Enter the keystore alias: "
read keystore_alias

echo "Enter the keystore password: "
read keystore_password

# It will ask you to enter the password for the keystore and the key.
sudo keytool -genkey -v -keystore $keystore_file_name.keystore -alias $keystore_alias -keyalg RSA -keysize 2048 -validity 10000
mv $keystore_file_name.keystore android/app/$keystore_file_name.keystore

# Add the following lines to ~/.gradle/gradle.properties
echo "MYAPP_UPLOAD_STORE_FILE=$keystore_file_name.keystore" >> android/gradle.properties
echo "MYAPP_UPLOAD_KEY_ALIAS=$keystore_alias" >> android/gradle.properties
echo "MYAPP_UPLOAD_STORE_PASSWORD=$keystore_password" >> android/gradle.properties
echo "MYAPP_UPLOAD_KEY_PASSWORD=$keystore_password" >> android/gradle.properties

# Add the signingConfigs and buildTypes content to build.gradle
echo "Signing config added to android/app/build.gradle"

echo "

Add the signingConfigs and buildTypes content to build.gradle

signingConfigs {
    release {
        if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
            storeFile file(MYAPP_UPLOAD_STORE_FILE)
            storePassword MYAPP_UPLOAD_STORE_PASSWORD
            keyAlias MYAPP_UPLOAD_KEY_ALIAS
            keyPassword MYAPP_UPLOAD_KEY_PASSWORD
        }
    }
}

"
 
echo "

Update buildTypes to use the signing config: 

buildTypes {
    release {
        signingConfig signingConfigs.release
    }
}

"