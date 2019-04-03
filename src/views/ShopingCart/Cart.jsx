import React from "react";
import * as podaci from "../../data.jsx";
import { Container, Row,Col,Button,ButtonGroup,Modal} from "react-bootstrap";
import Card from "../../components/Card.jsx";

import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { reactLocalStorage } from "reactjs-localstorage";

const options = {
    page: 1,  // which page you want to show as default          
    sizePerPage: 10,  // which size per page you want to locate as default
    pageStartIndex: 1, // where to start counting the pages
    paginationSize: 3,  // the pagination bar size.
    prePage:"<", // Previous page button text
    nextPage: ">", // Next page button text
    firstPage: "|<", // First page button text
    lastPage: ">|", // Last page button text          
    hideSizePerPage: true,// > You can hide the dropdown for sizePerPage
    noDataText: "Cart is empty",
  };
class Cart extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isFetch:false,
            data:[],
            modalOpend:false,
            pickedProductId:0,
            basket:[],
            checkedRow:null,
            totalAmount:0
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.removeFromCart=this.removeFromCart.bind(this);
        this.emptyCart=this.emptyCart.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleChangeValuesInCart = this.handleChangeValuesInCart.bind(this);
    }
    componentDidMount(){
        //console.log(podaci.products.searchResult[0].item[0]);
        //console.log(this.state.basket);   
        if(Object.entries(reactLocalStorage.getObject("cart")).length !== 0 && reactLocalStorage.getObject("cart").constructor !== Object)
            this.setState({basket:reactLocalStorage.getObject("cart")});
        this.setState({isFetch:true});
        this.renderTotalAmount(reactLocalStorage.getObject("cart"));
    }

    handleClose() {
        this.setState({ modalOpend: false,pickedProductId:0 });
    }
    
    handleShow(event) {
        console.log(event.target.id)
        this.setState({pickedProductId:event.target.id});
        this.setState({modalOpend:true});
    }
    handleChangeValuesInCart(event){
     
        console.log(event.target.dataset.operation);
        let operation=event.target.dataset.operation;
        let list=this.state.basket;     
        
        var tmpItem=list.filter(x=>x.itemId==event.target.id)[0] ;
       
        var index=list.indexOf(tmpItem);
        if(operation==="add"){          
           
            var newQty=list.filter(x=>x.itemId==event.target.id)[0].qty+1;
           
            list[index] = {"itemId":tmpItem.itemId,"name":tmpItem.name,"price":tmpItem.price,"qty":newQty}
        }
        else{           
            var newQty=list.filter(x=>x.itemId==event.target.id)[0].qty - 1;
            if(newQty<1)
            {
                newQty=1;  
                alert("Quantity can not be less then 1. If you want remove item from cart, you can delete it.");
            }
                 
                                         
            list[index] = {"itemId":tmpItem.itemId,"name":tmpItem.name,"price":tmpItem.price,"qty":newQty}
        }   
         
        this.setState({basket:list});     
        reactLocalStorage.setObject("cart",list);
        this.renderTotalAmount(reactLocalStorage.getObject("cart"));
        
        
    }
    colFormatterInput = (cell, row) => {
        return(
            <span>
                <Button variant="light" size="sm" id={row.itemId} data-operation="sub" onClick={this.handleChangeValuesInCart} >
              
                    <i className="pe-7s-angle-down" data-operation="sub" id={row.itemId}></i> 
                </Button>
                <input type="text" className="input" value={cell} readOnly  />
                
                <Button variant="light" size="sm" data-operation="add" id={row.itemId}onClickCapture={this.handleChangeValuesInCart} >
                    <i className="pe-7s-angle-up" data-operation="add" id={row.itemId}></i> 
                </Button>
            </span>
        )
    }
      
    colFormatter = (cell, row) => {
        return (
           
             <label className="containerChk" style={{paddingLeft:0}}> 
                <input type="radio" name="checkedRow" checked={this.state.isChecked} value={cell} onChange={this.handleCheck}/>
                <span className="checkmark"></span>
            </label> 
        )
    }
    colFormatterTotal = (cell, row) => {
        return (           
            new Intl.NumberFormat('en-US', { style: 'currency', currency: "USD" }).format(Number(row.qty)*Number(row.price))
          
        )
    }
    colFormatterPrice = (cell, row) => {
        return (           
            new Intl.NumberFormat('en-US', { style: 'currency', currency: "USD" }).format(Number(cell))
          
        )
    }
    handleCheck = (event) => {     
        const { target: { name, checked,value } } = event
        //console.log(value,name);
        //this.setState({[name]: checked});    
        this.setState({[name]: value});  
        console.log(value);
       // this.generateFilteredEvents(name);
    
    }
    removeFromCart(){
        let nonDeletedRecords=this.state.basket;
        nonDeletedRecords=nonDeletedRecords.filter((e) => e.itemId != this.state.checkedRow);   
        console.log(nonDeletedRecords);     
        this.setState({basket:nonDeletedRecords});
        reactLocalStorage.setObject("cart",null);
        reactLocalStorage.setObject("cart",nonDeletedRecords);
        this.renderTotalAmount(reactLocalStorage.getObject("cart"));
        //console.log(reactLocalStorage.getObject("cart"));
    }
    emptyCart(){
        this.setState({basket:[]});
        reactLocalStorage.setObject("cart",{});
        this.renderTotalAmount(reactLocalStorage.getObject("cart"));
    }
    handleCheckout(){
       alert("You order is complete!");
    }
    handleContinue(){
        window.location.href="#/"
    }

    renderTotalAmount(list){
       console.log(list);
        let total=0;
        if(list!== null && (Object.entries(list).length !== 0 && list.constructor !== Object))
        list.map(item=>
            total+=Number(item.price) * Number(item.qty)
        );
        
        this.setState({totalAmount:total});
    }
    handleClick(){
        this.props.callbackFromParentCart();
    }
    render(){
      
        if(this.state.isFetch)
        return( 
            <Modal show={this.props.isOpenCart}
            onHide={this.handleClick}
            size="lg">
            <Modal.Header >
                <Modal.Title><i className="pe-7s-cart"></i> Shopping cart </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Container>                                  
                    <Row>
                        
                        <Col md={12} xs={12} className="rightPosition margin-bottom">
                            <ButtonGroup>   
                                {this.state.checkedRow!==null ? <Button variant="link" size="sm"  onClick={this.removeFromCart} >
                                    Remove from cart
                                </Button> :
                                    
                                    null}                             
                                
                                <Button variant="danger" size="sm"  onClick={this.emptyCart} >
                                    <i className="pe-7s-trash"></i> Empty cart
                                </Button>
                            </ButtonGroup>
                        </Col>
                        <Col md={12} sm={12} xs={12} >
                        
                            <Card                            
                            grid={false}
                            content={
                                                                  
                                <BootstrapTable 
                                    data={this.state.basket }
                                    pagination={ true } 
                                    options={ options } 
                                    ignoreSinglePage >

                                    <TableHeaderColumn isKey={true} dataField="itemId" dataSort={ false } dataFormat={ this.colFormatter } > # </TableHeaderColumn> 
                                    <TableHeaderColumn dataField="name" dataSort={ false }> Product  </TableHeaderColumn> 
                                    <TableHeaderColumn dataField="price"  dataFormat={this.colFormatterPrice} dataSort={ false }>Price</TableHeaderColumn> 
                                    <TableHeaderColumn dataField="qty"   dataFormat={this.colFormatterInput} dataSort={ false }>Qty  </TableHeaderColumn>  
                                    <TableHeaderColumn dataField="total"  dataFormat={this.colFormatterTotal} dataSort={ false }>Total price </TableHeaderColumn>  
                                
                                </BootstrapTable>
                                
                            }
                            />
                        </Col>
                        <Col md={6} xs={6}>
                        <h3>Checkout :</h3>
                        </Col>
                        <Col md={6} xs={6} className="rightPosition bold-big">
                        Total :  {new Intl.NumberFormat('en-US', { style: 'currency', currency: "USD" }).format(Number(this.state.totalAmount))}
                        <hr/>
                        <ButtonGroup>   
                                <Button variant="info" size="md"  onClick={this.handleClick} >
                                   Continue shopping
                                </Button>                                  
                                                            
                                
                                <Button variant="warning" size="md"  onClick={this.handleCheckout} >
                                    <i className="pe-7s-cash"></i> Checkout
                                </Button>
                            </ButtonGroup>
                        </Col>
                                
                    </Row>                
                </Container>              
                </Modal.Body>
            <Modal.Footer>
               
            </Modal.Footer>
            </Modal>
                
        )
        
        return(
            <div className="ajax-loading-block-window">                                   
            </div>
        )
    }
}

export default Cart;