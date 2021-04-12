import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { colours } from '../components/colours';
import { Button } from '@material-ui/core';

const styles = () => ({
  main: {
    backgroundColor: colours.books
  },
  heading: {
    color: colours.text,
    fontSize: 30,
    padding: '1%',
    fontWeight: 'bold'
  },
  button: {
    marginTop: '1%',
    backgroundColor: colours.text,
    color: 'white',
    margin: '1%',
    fontWeight: 'bold'

  },


})
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false
    }

  }

  render() {
    const { classes } = this.props;

    return (

      <div className={classes.main}>
        <h2 className={classes.heading}>Decentralized Library</h2>



        <a target="_blank"
          alt=""
          style={{ color: colours.gray, fontSize: 15, padding: '1%', fontWeight: 'bold' }}
          // className="text-white"
          rel="noopener noreferrer"
          href={"https://etherscan.io/address/" + this.props.account}>
          You: {this.props.account}
        </a>
        <div>
          <Button className={classes.button} variant="contained" onClick={this.props.onClick} variant="contained">My Books</Button>

        </div>


      </div>
    );
  }
}

export default withStyles(styles)(Navbar);