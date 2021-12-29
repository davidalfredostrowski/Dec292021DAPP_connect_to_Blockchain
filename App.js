
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
