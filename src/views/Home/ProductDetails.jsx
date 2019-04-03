import React from "react";
import * as podaci from "../../data.jsx";
import { Container, Row,Col,Button,Image,Modal} from "react-bootstrap";
import Card from "../../components/Card.jsx";
import {reactLocalStorage} from "reactjs-localstorage";

class ProductDetails extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isFetch:false,            
            modalOpend:false,
            singleData:null,
            qty:1,
            selectedProduct:0,
            basket:null
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.addQty = this.addQty.bind(this);
        this.subtractQty = this.subtractQty.bind(this);

    }
   
    handleClose() {
        this.setState({ modalOpend: false });
    }    

    addQty() {
        this.setState({ qty:this.state.qty+1 });
    }  
    subtractQty() {
        this.setState({ qty:this.state.qty-1 < 1  ? 1 : this.state.qty - 1 });
    }  
    
    handleClick(){
        this.props.callbackFromParent();
    }
    componentDidMount(){
        this.setState({singleData:podaci.products.searchResult[0].item.filter(x=>x.itemId==this.props.productId)[0],isFetch:true,basket:reactLocalStorage.getObject("cart")}); 
    }
    
    componentWillUnmount(){         
         if(this.props.productId>0){ 
            this.setState({singleData:null,isFetch:false}); 
         }
         
    }
    handleAddToCart = (event) => {
        event.preventDefault();
       
        
        //console.log(productDetail);
        let list=[];
        list.push({"itemId":this.state.singleData.itemId,"name":this.state.singleData.title,"price":this.state.singleData.sellingStatus[0].currentPrice[0].value,"qty":this.state.qty})
        if(Object.entries(reactLocalStorage.getObject("cart")).length !== 0 && reactLocalStorage.getObject("cart").constructor !== Object){
            let newList=this.state.basket;
            if(newList.filter(x=>x.itemId==event.target.id)[0]==null)
                newList.push({"itemId":this.state.singleData.itemId,"name":this.state.singleData.title,"price":this.state.singleData.sellingStatus[0].currentPrice[0].value,"qty":this.state.qty});
            else{
                
                var newQty=newList.filter(x=>x.itemId==event.target.id)[0].qty + 1;
                var index=newList.indexOf(newQty);
                newList.splice(index, 1);
               // console.log("old",newList);
                newList.push({"itemId":this.state.singleData.itemId,"name":this.state.singleData.title,"price":this.state.singleData.sellingStatus[0].currentPrice[0].value,"qty":this.state.qty});
               // console.log("new",newList);
            }

            this.setState({basket:newList});
            console.log(newList);
            reactLocalStorage.setObject("cart",newList);
            alert("Succesfuly added to cart!");
        }
        else{
           // console.log(list.toString);
           this.setState({basket:list});
            reactLocalStorage.setObject("cart",list);
            alert("Succesfuly added to cart!");
        }
       // this.setState({ basket:list });
        
    }
    render(){      
        return( 
                <Container>
                    {this.state.isFetch ?
                    <Modal
                     show={this.props.isOpen}
                     onHide={this.handleClose}
                     size="lg">
                        <Modal.Header>
                        <Modal.Title>{this.state.singleData.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Card
                             key={this.state.singleData.itemId}
                             grid={false}
                             content={
                                <Row>                                    
                                    <Col md={6} xs={12}>
                                    <center>
                                    <Image src={this.state.singleData.galleryURL}  />
                                    
                                    </center>
                                    </Col>
                                    <Col md={6} xs={12}>
                                        <Row>
                                            <Col md={12}>
                                            <div className="title">
                                                {this.state.singleData.title}
                                            </div>
                                            </Col>
                                            <Col md={12}>
                                            <div className="category">
                                                {this.state.singleData.primaryCategory[0].categoryName}
                                            </div>
                                            </Col>

                                            <Col md={8} xs={12}>
                                            <div className="in-stock">
                                                {this.state.singleData.sellingStatus[0].sellingState}
                                            </div>
                                            </Col>
                                            <Col md={8} xs={12}>
                                            <div className="price">
                                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: this.state.singleData.sellingStatus[0].currentPrice[0].currencyId }).format(this.state.singleData.sellingStatus[0].currentPrice[0].value)}
                                            </div>
                                            </Col>
                                            <Col md={6}  xs={12}>
                                                <Button variant="light" size="sm" onClick={this.subtractQty} >
                                                    <i className="pe-7s-angle-down"></i> 
                                                </Button>
                                                <input type="text" className="input" value={this.state.qty} />
                                                
                                                <Button variant="light" size="sm" onClick={this.addQty} >
                                                    <i className="pe-7s-angle-up"></i> 
                                                </Button>
                                                
                                            </Col>
                                            <Col md={6} xs={12} className="add-to-cart">
                                                <Button variant="link" size="md" block onClick={this.handleAddToCart}>
                                                <i className="pe-7s-cart"></i> Add to cart
                                                </Button>
                                            </Col>  
                                            <Col></Col>
                                        </Row>                                    
                                    </Col>    
                                    <Col md={12}>
                                    <div className="description">
                                        <h2>More details</h2>
                                        <hr/>
                                        <p>Shipping : {this.state.singleData.shippingInfo[0].shippingType[0]==="Free" ? this.state.singleData.shippingInfo[0].shippingType : new Intl.NumberFormat('en-US', { style: 'currency', currency: this.state.singleData.shippingInfo[0].shippingServiceCost[0].currencyId }).format(this.state.singleData.shippingInfo[0].shippingServiceCost[0].value) } </p>
                                        <p>Shipping location : {this.state.singleData.shippingInfo[0].shipToLocations}</p>
                                        <hr/>
                                        <p>Condition : {this.state.singleData.condition[0].conditionDisplayName} </p>
                                    </div>
                                    </Col>                                                                  
                                </Row> 
                             }
                            />
                                
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="light" onClick={this.handleClick}>
                            Close
                            </Button>                            
                        </Modal.Footer>
                        </Modal>     
                        :null}                          
                </Container>              
        )
        
        
    }
}

export default ProductDetails;