# distribution-mobile-automation

## Prerequisites

You can run Android on Windows but to run iOS, you should use macOS. So, this guide only for macOS.

## Get Started


```bash
npm install
```

It will install dependencies only for this repository.

You should install another dependencies to run script as well. Important thing is Xcode and Android SDK. You can check from below.

## Structure

- `.github` - Only for Github
- `app` - App package files (e.g app-debug.app, app-debug.apk)
- `config` - Config files
- `scripts` - `NPM` scripts (package.json#scripts)
- `tests` - UI test scripts (mobile, web)

## Check dependencies

Use Appium Doctor to check global dependencies.

```bash
npm install appium-doctor -g
appium-doctor
```

If you will install everything from `required` section, you are ready to run test scripts.

## Homebrew

You can install package manager for macOS, otherwise you should install in manually.

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew --version
```

## Install JDK

MacOS don't install JAVA anymore. So, you should install it manually. And Homebrew is your friend.

```bash
brew tap AdoptOpenJDK/openjdk
brew cask install adoptopenjdk8

# build, project management
brew install ant
brew install gradle
brew install maven
```

## Android SDK

Most common way to install Android SDK, install Android Studio. Then, it will install automatically but you need to set path manually for some commands.

Another way is, install `android-platform-tools android-sdk` by Homebrew.

```bash
brew tap caskroom/cask
brew cask install android-sdk
brew cask install android-platform-tools
```

As I mentioned, if you've installed Android Studio, you are not able to run some Android tools commands. This NPM scripts will help you fix those issues. If you didn't try `appium-doctor`, please do that before running this.

```bash
# only run these when path was wrong
npm run path:emulator
npm run path:sdkmanager
npm run path:avdmanager

# or save it to shell config file (~/.bashrc, ~/.zshrc)
export PATH=$ANDROID_HOME/tools/bin:$PATH
```

## Path

**Shell**

```bash
# check shell
echo $SHELL

# if you use bash
# default mac shell for now, but it will be changed
vi ~/.bashrc

# or if you use zsh
# it will be default shell for mac as they announced
vi ~/.zshrc
```

**If installed by `brew`**

```bash
export ANDROID_HOME=/usr/local/share/android-sdk
```

**If installed by Android Studio**

- run Android Studio, press `configure`, press `SDK manager`
- then you can see `Android SDK Location: `

```bash
export ANDROID_HOME=[android_sdk_location_here]
```

Afterwards, add the following lines

```bash
export ANT_HOME=/usr/local/opt/ant
export MAVEN_HOME=/usr/local/opt/maven
export GRADLE_HOME=/usr/local/opt/gradle
# before set JAVA_HOME, please check exact path
export JAVA_HOME=/Library/Java/JavaVirtualMachine/adoptopenjdk-8.jdk/Contents/Home
```

```bash
export PATH=$JAVA_HOME/bin:$PATH
export PATH=$ANT_HOME/bin:$PATH
export PATH=$MAVEN_HOME/bin:$PATH
export PATH=$GRADLE_HOME/bin:$PATH
export PATH=$ANDROID_HOME/platform-tools:$PATH
```

---

*Note: VI commands*

- when editor opened
- press `i` (edit mode)
- press `esc` (finish edit mode)
- press `:` (commands mode, then put `wq`)

---

After you finish adding the lines in bash, execute the following commands

```bash
source ~/.bashrc # or ~/.zshrc
```

## SSH

If you clone Github repo to local, you need put password. But once they can recognize your local computer, you don't have to put password anymore. To do this, you can use SSH.

```bash
ssh-keygen -t rsa -b 4096 -C "<your_email>"
pbcopy < ~/.ssh/id_rsa.pub
```

After then, your ssh-key will be saved on clipboard. Then, go to Github and click avatar and go setting. Go `SSH and GPG keys` and press `new SSH key` button and paste it. Once finished, you can clone without password.

## Node.js

```bash
brew install node # it will install `npm` also
```

## Packages

```bash
rm -rf app/*
mv ~/Downloads/app-release.apk ./app/app-debug.apk
mv ~/Downloads/EmployeeFrontend.app ./app/app-debug.app
```
Note: You need to download the app and apk files in GoCD (https://ci.cxapalawandev.com)

## Run tests

If you run CI script, it will launch (si|e)mulator automatically. Otherwise, you should run it manually.

```bash
# run test scripts
npm run ios
npm run android

# run CI script on local
npm run ci:android
npm run ci:ios

# run suite only
# you should set `claims` script in config file (`config/wdio.shared.conf.js`)
npm run ios -- --suite claims
npm run ci:android -- --suite claims
```

## Scripts

Document [`here`](./scripts/README.md)

## Troubleshooting

- Installing `idevicelocation`

We can easily install by using `brew` with `--HEAD` argument. Please use `--HEAD` if you're using latest MacOS.

```bash
brew install idevicelocation --HEAD
```

We can install manually with sources. You can follow [here](https://github.com/JonGabilondoAngulo/idevicelocation). But if you got error while running `sudo make install` like this,

```
install: /usr/bin/idevicelocation: Operation not permitted
```

Because you cannot install directly to `/usr/bin` in macOS, we should install into `/usr/local` directory instead.

```bash
./configure --prefix=/usr/local
```

- Installing `bundletool.jar`

You can download [here](https://github.com/google/bundletool/releases). Once you've download finished, you can rename as `bundletool.jar` and put into `$ANDRIOD_SDK/bundle-tools/bundletool.jar`. Then, make sure the file is applied in `$PATH`.

- 'RoutingHTTPServer/RoutingConnection.h' file not found FBWebServer.m

If you see this error message when testing iOS, WebDriver dependencies is not install properly. You can follow this,

```bash
cd ./node_modules/appium/node_modules/appium-xcuitest-driver/WebDriverAgent
./Scripts/bootstrap.sh -d
```

Then, it will build again.

## Heap Snapshot (Advanced)

Once you have finished running scripts, you can save `.heapsnapshot` and you can debug from Chrome. Run this command after finished,

```bash
ps -a
```

Then, you can find process of Appium scripts, and put process id(number),

```bash
kill -USR2 <pid>
```

Once you tried, it automatically generating `.heapsnapshot` on the repo. Now, open Chrome browser and open `inspector`. Go to `memory` tab then press `Load` button. Now, you can see memory information, which is useful when we faced memory leaks issue.
