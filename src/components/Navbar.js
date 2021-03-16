import React, { Component } from 'react';
import Identicon from 'identicon.js';
import {Button,Dialog,DialogActions,DialogContent,DialogTitle,Typography} from '@material-ui/core';

class Navbar extends Component {
  constructor(props){
    super(props);
    this.state={
      dialogOpen : false
    }
    
  }

  render() {
    
    return (
 
     <nav style={{alignItems:'center',padding:'1%',fontSize:20,backgroundColor:'#985F34',fontWeight:'bold',color:'white'}}>Decentralized Library
       
        <ul className="navbar-nav px-3">
          <li>
            <small id="account">
              <a target="_blank"
                 alt=""
                 style={{color:'#43493D'}}
                // className="text-white"
                 rel="noopener noreferrer"
                 href={"https://etherscan.io/address/" + this.props.account}>
                You:{this.props.account}
              </a>
              <div>
        <Button onClick={this.props.onClick} style={{alignSelf:'flex-end'}} variant="contained">My Books</Button>
      
        </div>
            </small>
           
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;