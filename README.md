# DOM Reflector

Firefox extension that detects reflected strings or regex patterns in the live DOM of web pages, including delayed or asynchronous DOM injections using [`MutationObserver`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)

## Install

1. Clone the repository:

```console
git clone --depth=1  https://github.com/ayuxsec/domreflector
````

2. Load the extension in Firefox:

* Go to `about:debugging#/runtime/this-firefox`
* Click **Load Temporary Add-on**
* Select the `manifest.json` file

## Usage

1. Click the extension icon to open the popup
2. Enter a string or regular expression (must be valid js regexp)
3. Enable scanning and save
4. Browse normally
5. You’ll be notified when a matching reflection appears in the DOM

