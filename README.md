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

<img src="https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/1.png?raw=true" width="500">

- Show the QR code to a worker (or take a photo/screenshot of it to show later, for example if you test this repo from a single computer you will need this QR code on the next step)

#### As a worker

- Select a worker account from account selector (right top corner). We selected Bob.
- Tap worker tab and then "Add letter about me button"

![2 step](https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/2.png?raw=true)

- Scan the QR-code that referee showed to you

![4 step](https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/4.png?raw=true)

![5 step](https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/5.png?raw=true)

![6 step](https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/6.png?raw=true)

![7 step](https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/7.png?raw=true)

![8 step](https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/8.png?raw=true)

![9 step](https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/9.png?raw=true)

![10 step](https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/10.png?raw=true)

![11 step](https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/11.png?raw=true)

![12 step](https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/12.png?raw=true)

![13 step](https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/13.png?raw=true)

![14 step](https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/14.png?raw=true)

![15 step](https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/15.png?raw=true)

![16 step](https://github.com/slonigiraf/recommendation-letter-example-ui/blob/main/ui-examples/16.png?raw=true)
