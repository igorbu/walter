import React from "react";
import { Navbar,Nav,Container,Badge } from "react-bootstrap"
import { reactLocalStorage } from "reactjs-localstorage";
import ShopingCart from "../views/ShopingCart/Cart.jsx";
//import {reactLocalStorage} from 'reactjs-localstorage';
class Header extends React.Component {
   constructor(props){
     super(props);
     this.state={
       isCartOpen:false,
       basket:reactLocalStorage.getObject("cart")
     }
     this.handleOpen=this.handleOpen.bind(this);
     this.handleCloseCart=this.handleCloseCart.bind(this);
   }
  handleOpen(){
    this.setState({isCartOpen:true});
  }
  handleCloseCart() {
    this.setState({basket:reactLocalStorage.getObject("cart"), isCartOpen: false});
}
  render() {
    return (
      <Container>
        {this.state.isCartOpen ? 
          <ShopingCart {...this.props}  isOpenCart={this.state.isCartOpen} callbackFromParentCart={this.handleCloseCart}  />   
          :null}
      
      <Navbar bg="light" expand="sm" sticky="top" fixed="top" >
      <Navbar.Brand  href="#homepage">Walter - Web Shop</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#homepage"><i className="pe-7s-home"></i> </Nav.Link>
                
        </Nav>    
        <Nav className="mr-1">         
          <Nav.Link  onClick={this.handleOpen}><i className="pe-7s-cart"></i> Shopping cart  </Nav.Link>          
        </Nav>     
      </Navbar.Collapse>
    </Navbar>
    </Container>
    );
  }
}

export default Header;


