# Recommendation letter example UI

This UI shows how to create a recommendation letter that is backed by tokens that can be slashed from referee in a case of fraud.

The UI was built on top of a [Substrate Front End Template](https://github.com/substrate-developer-hub/substrate-front-end-template).

## Using The UI

### Installation

```bash
# Clone the repository
git clone https://github.com/slonigiraf/recommendation-letter-example-ui.git
cd recommendation-letter-example-ui
yarn install
```

### Usage

Start a locally running node of [recommendation-letter-example-node](https://github.com/slonigiraf/recommendation-letter-example-node)

Start the template in development mode:

```bash
yarn start
```

Or in production mode:

```bash
yarn build
```

and open `build/index.html` in your favorite browser.

### UI workflow

#### As a referee

- Select a referee account from account selector (right top corner). We selected Alice.
- Type a text of recommendation letter, paste a public key of worker and amount of token to stake on the recommendation.
- Click "Create" button.

<img alt="1 step" src="https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/1.png?raw=true" width="500">

- Show the QR code to a worker (or take a photo/screenshot of it to show later, for example if you test this repo from a single computer you will need this QR code on the next step)

#### As a worker

- Select a worker account from account selector (right top corner). We selected Bob.
- Tap worker tab and then "Add letter about me button"

<img alt="2 step" src="https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/2.png?raw=true" width="500">

- Scan the QR-code that referee showed to you

<img alt="3 step" src="https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/4.png?raw=true" width="500">

<img alt="4 step" src="https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/5.png?raw=true" width="500">

<img alt="5 step" src="https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/6.png?raw=true" width="500">

<img alt="6 step" src="https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/7.png?raw=true" width="500">

<img alt="7 step" src="https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/8.png?raw=true" width="500">

<img alt="8 step" src="https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/9.png?raw=true" width="500">

<img alt="9 step" src="https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/10.png?raw=true" width="500">

<img alt="10 step" src="https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/11.png?raw=true" width="500">

<img alt="11 step" src="https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/12.png?raw=true" width="500">

<img alt="12 step" src="https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/13.png?raw=true" width="500">

<img alt="13 step" src="https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/14.png?raw=true" width="500">

<img alt="14 step" src="https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/15.png?raw=true" width="500">

<img alt="15 step" src="https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/16.png?raw=true" width="500">
