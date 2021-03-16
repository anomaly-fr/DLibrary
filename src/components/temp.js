import React, { Component } from 'react';
import { convertBytes } from './helpers';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';

const useStyles = theme => ({
  root: {
     backgroundColor:'#E4C0A4',
     alignItems:'center',
     justifyContent:'center'
   },
   uploadBox:{
     backgroundColor:'#985F34'
   },
   heading:{
     color: '#43493D',
     alignSelf: 'center',
    // textAlign:'center'
   },
   input:{
     borderRadius:10,
     padding:'2%'
   },
   submit:{
     backgroundColor:'#A4BDBA'
   }
});
class Main extends Component {
  

  render() {
    // const nodeConsole = require('console');
    // const myConsole = new nodeConsole.Console(
    //   process.stdout,
    //   process.stderr
    // );
 //    console.log("Hey there "+this.props)
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '1024px',alignItems:'center',justifyContent:'center' }}>
            <div className="content">
              <p>&nbsp;</p>
              <div className={classes.uploadBox} style={{ maxWidth: '512px',padding:'5%',borderRadius:10,alignSelf:'center' }}>
                <h2 className={classes.heading}><b>Upload Book</b></h2>
                  <form onSubmit={(event) => {
                    event.preventDefault();
                    const bookName = this.bookName.value;
                    const bookAuthor = this.bookAuthor.value;
                    this.props.uploadFile(bookName,bookAuthor);
                  }} >
                      <div className="form-group" style={{ padding:'3%',alignItems:'center',justifyContent:'center' }}>
                        <br></br>

                          <input
                            id="bookName"
                            type="text"
                            ref={(input) => { this.bookName = input }}
                            className={classes.input}
                            placeholder="Name"
                            required />

                            <input
                            id="bookAuthor"
                            type="text"
                            ref={(input) => { this.bookAuthor = input }}
                            className={classes.input}
                            placeholder="Author"
                            required />
                      </div>
                    <input type="file" onChange={this.props.captureFile} className="text-white"/>
                    <button type="submit" className={classes.submit}><b>Upload!</b></button>
                  </form>
              </div>
              <p>&nbsp;</p>
              <table className="table-sm table-bordered text-monospace" style={{ width: '1000px', maxHeight: '450px'}}>
                <thead style={{ 'fontSize': '15px' }}>
                  <tr className="bg-dark text-white">
                  <th scope="col" style={{ width: '150px'}}>id</th>
                    <th scope="col" style={{ width: '200px'}}>name</th>
                    <th scope="col" style={{ width: '230px'}}>author</th>
                    <th scope="col" style={{ width: '120px'}}>uploader/view</th>
                    <th scope="col" style={{ width: '120px'}}>hash/view/get</th>
                  </tr>
                </thead>
                { this.props.allBooks.map((book, key) => {
                  return(
                    <thead style={{ 'fontSize': '12px' }} key={key}>
                      <tr>
                      <td>{book.bookID}</td>
                        <td>{book.name}</td>
                        <td>{book.author}</td>
                        {/* <td>{convertBytes(file.fileSize)}</td> */}
                        {/* <td>{moment.unix(file.uploadTime).format('h:mm:ss A M/D/Y')}</td> */}
                        <td>
                          <a
                            href={"https://etherscan.io/address/" + book.uploader}
                            rel="noopener noreferrer"
                            target="_blank">
                            {book.uploader}
                          </a>
                         </td>
                        <td>
                          <a
                            href={"https://ipfs.infura.io/ipfs/" + book.bookIpfsHash}
                            rel="noopener noreferrer"
                            target="_blank">
                            {book.bookIpfsHash}
                          </a>
                        </td>
                      </tr>
                    </thead>
                  )
                })}
              </table>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles) (Main);