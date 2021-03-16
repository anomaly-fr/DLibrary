import React, { Component } from 'react';
import { convertBytes } from './helpers';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';


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
              <div className={classes.uploadBox} style={{ maxWidth: '512px',padding:'5%',borderRadius:10,alignSelf:'center',flexDirection:'row' }}>
                <h2 className={classes.heading}><b>Upload Book</b></h2>
                  <form onSubmit={(event) => {
                    event.preventDefault();
                    const bookName = this.bookName.value;
                    const bookAuthor = this.bookAuthor.value;
                    this.props.uploadFile(bookName,bookAuthor);
                  }} >
                      <div className="form-group" style={{ padding:'3%',alignItems:'center',justifyContent:'center',flex:1 }}>
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
                <div>
              {this.props.allBooks.map((book,key)=> {
                return(<div style={{backgroundColor:'#985F34',borderRadius:10,padding:'3%',margin:'3%',flex:1}} key={key}>
                <Typography>Name: {book.name}</Typography>
                <Typography>Author: {book.author}</Typography>
                <Button onClick={() => {

                this.props.rentBook(book.bookID)}} variant='contained'>Rent!</Button>
                </div>)

              })}
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default withStyles(useStyles) (Main);