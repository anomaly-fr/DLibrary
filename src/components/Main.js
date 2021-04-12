import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import { colours } from '../components/colours';


const styles = () => ({
  root: {
    background: colours.background,
    alignItems: 'center',
    justifyContent: 'center'
  },
  uploadBox: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: '6%',
    borderRadius: 10
  },
  heading: {
    color: colours.text,
    fontWeight: 'bold',
    marginBottom: 30
  },
  input: {
    borderRadius: 6,
    padding: '1%',

    // margin:'3%'
  },
  submit: {
    backgroundColor: colours.text,
    color: 'white',
    margin: '1%',
    //  fontWeight:'bold'
  },
  books: {
    backgroundColor: colours.books,
    borderRadius: 10, padding: '3%',
    margin: '3%',
    flex: 1
  },
  inputBox: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row'
  },
  rent: {
    backgroundColor: colours.text,
    color: 'white',
    marginTop: '2%',
    fontWeight: 'bold'

  },
});
class Main extends Component {

  render() {

    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div>
          <div>

            <div className={classes.uploadBox}>
              <h2 className={classes.heading}><b>Upload Book</b></h2>
              <div>
                <form>
                  <div>

                    <div className={classes.inputBox}>
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
                  </div>
                  <input type="file" onChange={this.props.captureFile} />
                  <Button onClick={() => {
                    const bookName = this.bookName.value;
                    const bookAuthor = this.bookAuthor.value;
                    this.props.uploadFile(bookName, bookAuthor);
                  }} className={classes.submit}><b>Upload</b></Button>
                </form>
              </div>
            </div>

            <div>
              {this.props.allBooks.map((book, key) => {
                console.log(JSON.stringify(book));

                return (<div className={classes.books} key={key}>
                  <Typography style={{ fontWeight: 'bold' }}>Name:   {book.name}</Typography>
                  <Typography style={{ fontWeight: 'bold' }}>Author:   {book.author}</Typography>
                  <Button className={classes.rent} disabled={!book.avail} onClick={() => {

                    this.props.rentBook(book.bookID)
                  }} variant='contained'>{book.avail ? "Rent" : "Unavailable"}</Button>
                </div>)



              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Main);