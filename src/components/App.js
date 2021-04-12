import DLibrary from '../abis/DLibrary.json'
import React, { Component } from 'react';
import Navbar from './Navbar'
import Main from './Main'
import Web3 from 'web3';
import { Dialog, DialogTitle, DialogContent, Typography, Box } from '@material-ui/core';
import { colours } from './colours';
import { withStyles } from '@material-ui/core/styles';



const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }); // leaving out the arguments will default to these values


const styles = () => ({
  books: {
    backgroundColor: colours.books,
    borderRadius: 10,
    padding: '3%',
    margin: '3%',
    flex: 1
  },
  link: {
    color: colours.gray,
    fontSize: 15,
    padding: '1%',
    fontWeight: 'bold'

  }

});





class App extends Component {



  componentWillMount = async () => {
    const my1Func = async () => {
      //   await this.loadWeb3();
      await this.loadBlockchainData();
    }
    window.web3 = await this.loadWeb3();
    await this.loadBlockchainData();
    await window.ethereum.enable();

    window.ethereum.on('accountsChanged', function () {
      window.web3.eth.getAccounts(function (error, accounts) {
        console.log(accounts[0], 'current account after account change');
        //setTaccount(accounts[0])
        //   myFunc(accounts[0])
        my1Func();
        window.location.reload()

      });
    });





  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.web3 = null;
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
    return window.web3;
  }


  async loadBlockchainData() {
    const web3 = window.web3;
    // Load account

    const accounts = await web3.eth.getAccounts();
    console.log("Account: " + accounts)
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = DLibrary.networks[networkId]
    if (networkData) {
      // Assign contract
      const dLibrary = new web3.eth.Contract(DLibrary.abi, networkData.address)
      this.setState({ dLibrary: dLibrary })
      // Get number of books available 
      const numOfBooks = await dLibrary.methods.numOfBooks().call();
      this.setState({ numOfBooks });

      //Get books that are rented by user
      const numBooksOwned = await dLibrary.methods.numOfRentedBooks().call();
      this.setState({ numBooksOwned });
      // console.log("Owned " + this.state.numBooksOwned)
      // Load files&sort by the newest
      for (var i = 1; i <= numOfBooks; i++) {
        const book = await dLibrary.methods.allBooksAvailable(i).call();
        this.setState({
          allBooksAvailable: [...this.state.allBooksAvailable, book]
        });
      }

      const arr = [];
      for (var i = 1; i <= numBooksOwned; i++) {

        const book = await dLibrary.methods.allBooksRented(i).call();
        if (book.currentOwner === this.state.account) {

          arr.push(book);
        }



      }
      this.setState({ booksRented: arr })

    } else {
      window.alert('DLibrary contract not deployed to detected network.')
    }
  }

  // Get file from user
  captureFile = event => {
    event.preventDefault()

    const file = event.target.files[0]
    const reader = new window.FileReader()

    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      this.setState({
        buffer: Buffer(reader.result),
        type: file.type,
        name: file.name
      });
      console.log('buffer', this.state.buffer)
    }
  }
  handleClickOpen = () => {

    this.setState({ dialogOpen: true });
  };
  handleClose = () => {
    this.setState({ dialogOpen: false });
  };
  rentBook = (bookID) => {
    console.log('Renting ' + bookID);
    console.log("Acc " + this.state.account)
    this.state.dLibrary.methods.borrowBook(bookID).
      send({ from: this.state.account }).on('transactionHash', (hash) => {
        console.log("Books rented " + this.state.booksRented)

        this.setState({
          loading: false,
          type: null,
          name: null,

        })
      }).on('error', (e) => {
        window.alert('Error')
        this.setState({ loading: false })
      })


  }

  uploadFile = (bookName, bookAuthor) => {
    console.log("Submitting file to IPFS...")

    // Add file to the IPFS
    ipfs.add(this.state.buffer, (error, result) => {
      console.log('IPFS result:', result)
      if (error) {
        console.error(error)
        return
      }

      this.setState({ loading: true })
      // Assign value for the file without extension
      if (this.state.type === '') {
        this.setState({ type: 'none' })
      }
      this.state.dLibrary.methods.addBook(bookName, bookAuthor, this.state.account, result[0].hash).
        send({ from: this.state.account }).on('transactionHash', (hash) => {
          this.setState({
            loading: false,
            type: null,
            name: null
          })
          window.location.reload()
        }).on('error', (e) => {
          window.alert('Error')
          this.setState({ loading: false })
        })
    })

  };

  manageDialog = () => {
    console.log(";[")
    this.handleClickOpen();

  }


  constructor(props) {
    super(props)
    this.state = {
      account: '',
      dLibrary: null,
      allBooksAvailable: [],
      loading: false,
      type: null,
      bookName: null,
      bookAuthor: null,
      booksRented: [],
      numBooksOwned: 0,
      dialogOpen: false,
      yo: ""
    }
    this.uploadFile = this.uploadFile.bind(this)
    this.captureFile = this.captureFile.bind(this)
    // this.init = this.init.bind(this)


  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Navbar account={this.state.account} onClick={this.handleClickOpen} />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
            curUser
            allBooks={this.state.allBooksAvailable}
            captureFile={this.captureFile}
            uploadFile={this.uploadFile}
            rentBook={this.rentBook}
          />
        }
        <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.dialogOpen}>
          <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
            Rented
        </DialogTitle>
          <DialogContent dividers>
            {/* <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </Typography> */}
            {this.state.booksRented.map((book, key) => {
              //         console.log(JSON.stringify(book));
              return (
                <div className={classes.books} key={key}>
                  <Typography style={{ fontWeight: 'bold' }} >Name:   {book.name}</Typography>
                  <Typography style={{ fontWeight: 'bold' }}>Author:   {book.author}</Typography>
                  <Box style={{ fontWeight: 'bold' }}>
                    IPFS Hash:
               <a

                      href={"https://ipfs.infura.io/ipfs/" + book.bookIpfsHash}
                      rel="noopener noreferrer"
                      target="_blank">
                      <Box style={{ alignSelf: 'center', padding: '1%' }}>
                        <Typography className={classes.link} noWrap>{book.bookIpfsHash}</Typography>

                      </Box>

                    </a>
                  </Box>

                </div>
              )

            })}

          </DialogContent>

        </Dialog>
      </div>
    );
  }
}



export default withStyles(styles)(App);