
12/29/2021
1) install software to ec2
1.5) copy in changes to webpack.config.js   to node_module/react_scripts/config/webpack.config.js
2) start ganache
3) run commands (below) to 'touch' personal blockchain on ec2 with web3
4) start up App.js (w/ changes from below)
5) make sure ganache is running
6) make sure React is up and serving
7) import your account to metamask
8) log on to metamask
9) connect to your private network with metamask
10) run app.






so far this is the winning install w/ the following webpack.config mods  - allowing for web3 and App.css files to be included: 






    1  sudo apt-get update
    2  sudo apt-get install nodejs
    3  sudo apt install npm
    4  npm install webpack@3.0.0
    5  npm install webpack-cli@3.0.8
    6  npm install ganache-cli
    7  npm install node-gyp@3.6.2
    8  npm install truffle@5.1.39
    9  npm install web3@1.0.0-beta.37
   10  npm install create-react-app
   11  curl -sL https://deb.nodesource.com/setup_14.x -o nodesource_setup.sh        <- do not run node16 or suffer module not found error!!!!!!
   12  sudo bash nodesource_setup.sh
   13  sudo apt install nodejs
   14  ubuntu@ip-172-31-16-17:~$
   15  ./node_modules/.bin/create-react-app  packt
   16  ls
   17  cd packt
   18  npm install
   19  npm start
   20  history



don't forget to npm intall defnitions      ........




copy in webpack.config.js

here are the changes to your standard webpack.config.js


##### change one...

   resolve: {
      // This allows you to set a fallback for where webpack should look for modules.
      // We placed these paths second because we want `node_modules` to "win"
      // if there are any conflicts. This matches Node resolution mechanism.
      // https://github.com/facebook/create-react-app/issues/253


extensions: [ '.ts', '.js', '.css'],
        fallback: {
      fs: false,
      assert: require.resolve("assert/"),
      os: require.resolve("os-browserify/browser"),
      constants: require.resolve("constants-browserify"),
      stream: require.resolve("stream-browserify"),
      crypto: require.resolve("crypto-browserify"),
      http: require.resolve("stream-http"),
      https: require.resolve("https-browserify"),
   // "os": false, 
   // "https": false,
//		"http": false,
//		"stream": false,
//		"crypto": false,
//		"assert": false,
		"url": false,
//		"buffer": false,
 "buffer": require.resolve("buffer"),
//"buffer": require.resolve("buffer/"),
		//       assert: require.resolve('assert'),
     //       crypto: require.resolve('crypto-browserify'),
     //       http: require.resolve('stream-http'),
     //       https: require.resolve('https-browserify'),
     //       os: require.resolve('os-browserify/browser'),
         stream: require.resolve('stream-browserify'),
	definitions: require.resolve('definitions'),
//
//

//
process: require.resolve("process/browser"),  // <- this
        },







      modules: ['node_modules', paths.appNodeModules].concat(
        modules.additionalModulePaths || []
      ),

###### end of change one





#### change two...

            // "file" loader makes sure those assets get served by WebpackDevServer.
            // When you `import` an asset, you get its (virtual) filename.
            // In production, they would get copied to the `build` folder.
            // This loader doesn't use a "test" so it will catch all modules
            // that fall through the other loaders.
            {
              // Exclude `js` files to keep "css" loader working as it injects
              // its runtime that would otherwise be processed through "file" loader.
              // Also exclude `html` and `json` extensions so they get processed
              // by webpacks internal loaders.
              exclude: [/^$/, /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              type: 'asset/resource',
            },
            // ** STOP ** Are you adding a new loader?
            // Make sure to add the new loader(s) before the "file" loader.
          ],
        },
      ].filter(Boolean),
    },
    plugins: [

// * 
new webpack.ProvidePlugin({
	Buffer: ['buffer','Buffer'],
}),
//        new webpack.ProvidePlugin({
//            Buffer: ['buffer', 'Buffer'],
//        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
	    React: "react",
//	    definitions: "definitions",
        }),

//definitions: {},





      // Generates an `index.html` file with the <script> injected.
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: paths.appHtml,
          },
          isEnvProduction
            ? {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true,
                },
              }
            : undefined
        )
      ),
      // Inlines the webpack runtime script. This script is too small to warrant
      // a network request.
      // https://github.com/facebook/create-react-app/issues/5358
      isEnvProduction &&
        shouldInlineRuntimeChunk &&
        new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime-.+[.]js/]),
      // Makes some environment variables available in index.html.
      // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
      // <link rel="icon" href="%PUBLIC_URL%/favicon.ico">
      // It will be an empty string unless you specify "homepage"
      // in `package.json`, in which case it will be the pathname of that URL.
      new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
      // This gives some necessary context to module not found errors, such as
      // the requesting resource.
      new ModuleNotFoundPlugin(paths.appPa



#### change two end.....





./node_modules/.bin/ganache-cli --port 8545  --chainId 5777  -h  ec2-54-184-221-155.us-west-2.compute.amazonaws.com



./node_modules/.bin/ganache-cli --port 8545  --chainId 5777  -h  ec2-54-184-221-155.us-west-2.compute.amazonaws.com


now, step in with web3: 


(ok, so lets warm up by dumping some basic blockchain data to the web...via web3)

web3 = new Web3( new Web3.providers.HttpProvider("http://ec2-54-184-221-155.us-west-2.compute.amazonaws.com:8545"));

> Web3 = require("web3")

> network = web3.eth.net.getNetworkType()


> network
Promise {
  'private',
  [Symbol(async_id_symbol)]: 999,
  [Symbol(trigger_async_id_symbol)]: 998,
  [Symbol(destroyed)]: { destroyed: false }
}
>

> accounts = web3.eth.getAccounts()

Promise {
  [
    '0x8E53407B2bf0f4Eb7148b14F2e35F123FC9e2529',
    '0x3A572268afBB98D12E8996c394FC2dC70b4b9a3e',
    '0x9f3C6Dd1273e39b42438670eA5C5F6038009B928',
    '0x9f39b75514672ecaBd69f9b266a3A9980CA31702',
    '0x35E6475473626A1670bc6C1190A0cA97BF6F51F1',
    '0x2C26AfD2101A6010E38930ADa5b6c98079E00E10',
    '0xd8C2C5002Ef3C865FddeAAAc453A4929b4bF69a3',
    '0x0CB12F3aAf1a805a8CaebB32988CB74A81584B4B',
    '0x15019499fBD8105E986C37b590BD7C004659bA65',
    '0x18324A14351FCdA0CC3A8adE0ac306903e07922c'
  ],
  [Symbol(async_id_symbol)]: 917,
  [Symbol(trigger_async_id_symbol)]: 5,
  [Symbol(destroyed)]: { destroyed: false }






import React, { Component } from 'react'
import Web3 from 'web3'
import logo from './logo.svg';
import './App.css';


class App extends Component {

	state = { account: '' }
	componentWillMount(){
		this.loadBlockchainData()
	}

	async loadBlockchainData(){
		const web3 = new Web3(new Web3.providers.HttpProvider("http://ec2-54-184-221-155.us-west-2.compute.amazonaws.com:8545"))
		const network = await web3.eth.net.getNetworkType()
		console.log(network)
		const accounts = await web3.eth.getAccounts()
		console.log(accounts)
		this.setState({account: accounts[0]})
	}
		

render(){
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
	<p> Your account:  { this.state.account}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
}
export default App;






