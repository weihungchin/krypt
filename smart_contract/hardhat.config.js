// https://eth-ropsten.alchemyapi.io/v2/-BWJ6PZAXvOco9gpsgp7gUwJ1eEYO7zE

require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/-BWJ6PZAXvOco9gpsgp7gUwJ1eEYO7zE',
      accounts: ['21163830dad1f3ea245ee8ef6cc993ae2a12b792286b850fc4c978caea4847cd']
    }
  }
}