import React from "react";
import * as podaci from "../../data.jsx";
import { Container, Row,Col,Button,Image} from "react-bootstrap";
import Card from "../../components/Card.jsx";
import ProductDetails from "./ProductDetails.jsx";

import { reactLocalStorage } from "reactjs-localstorage";
import Slider from "./Slider";

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state={
            isFetch:false,
            data:[],
            initData:[],
            modalOpend:false,
            cartOpend:false,
            pickedProductId:0,
            basket:[],
           
        }
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        
        this.searchList=this.searchList.bind(this);

    }
    componentDidMount(){
        //console.log(podaci.products.searchResult[0].item[0]);
        this.setState({data:podaci.products.searchResult[0].item,initData:podaci.products.searchResult[0].item,basket:reactLocalStorage.getObject("cart"),isFetch:true});               
    }

    handleClose() {
        this.setState({ modalOpend: false,pickedProductId:0 ,basket:reactLocalStorage.getObject("cart")});
        
    }
    
    handleShow(event) {
        console.log(event.target.id)
        this.setState({pickedProductId:event.target.id});
        this.setState({modalOpend:true});
    }
    handleAddToCart = (event) => {
        event.preventDefault();
        this.setState({basket:reactLocalStorage.getObject("cart")})
        console.log("Add to cart",this.state.basket);
        var productDetail=podaci.products.searchResult[0].item.filter(x=>x.itemId==event.target.id)[0];
        console.log(productDetail);
        let list=[];
        list.push({"itemId":productDetail.itemId,"name":productDetail.title,"price":productDetail.sellingStatus[0].currentPrice[0].value,"qty":1})
        console.log(list);
        if(this.state.basket!=null && Object.entries(reactLocalStorage.getObject("cart")).length !== 0 && reactLocalStorage.getObject("cart").constructor !== Object){
            let newList=this.state.basket;
           
            if(newList.filter(x=>x.itemId==event.target.id)[0]==null)
                newList.push({"itemId":productDetail.itemId,"name":productDetail.title,"price":productDetail.sellingStatus[0].currentPrice[0].value,"qty":1});
            else{
                
                var newQty=newList.filter(x=>x.itemId==event.target.id)[0].qty + 1;
                var index=newList.indexOf(newQty);
                newList.splice(index, 1);
               // console.log("old",newList);
                newList.push({"itemId":productDetail.itemId,"name":productDetail.title,"price":productDetail.sellingStatus[0].currentPrice[0].value,"qty":Number(newQty)});
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
       // 
        
    }

    searchList(event){        
        let text=event.target.value;        
        let filtered = this.state.initData;
       // console.log(filtered);
        filtered = filtered.filter((search) => {
        let term = search.title[0].toLowerCase()
        return term.indexOf(
            text.toLowerCase()) !== -1
        })        
        this.setState({data:filtered}); 
    }
    
    render(){
        if(this.state.isFetch)
        return( 
                <Container>
                    {this.state.pickedProductId > 0 ?
                         <ProductDetails {...this.state} isOpen={this.state.modalOpend} callbackFromParent={this.handleClose} productId={this.state.pickedProductId} />
                    :null}                        
                    <Row>
                        <Slider/>
                        <Col md={12} xs={12}>                           
                            <div className="search">
                                <div className="col-md-4">
                                    <input  type="text"   placeholder="Search terms.."   name="name" className="form-control" onChange={this.searchList} />         
                                </div>  
                            </div> 
                        </Col>
                        {this.state.data.map((item,key)=>
                        <Col md={3} sm={4} xs={12} key={key}>
                            <Card
                            key={key}
                            grid
                            content={
                                <Row>                                    
                                    <Col md={12}>
                                    <center>
                                    <Image src={item.galleryURL} rounded />
                                       
                                    </center>
                                    </Col>
                                    <Col md={12}>
                                    <div className="title">
                                    {item.title}
                                    </div>
                                    </Col>
                                    <Col md={8} xs={6}>
                                    <div className="price">
                                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: item.sellingStatus[0].currentPrice[0].currencyId }).format(item.sellingStatus[0].currentPrice[0].value)}
                                    </div>
                                    </Col>
                                    <Col md={4} xs={6}>
                                     <Button variant="primary" size="md" title="Details" id={item.itemId} onClick={this.handleShow}>
                                       <i className="pe-7s-search" id={item.itemId}></i>
                                    </Button>
                                    </Col>                                   
                                       
                                    <Col md={12} xs={12} className="add-to-cart"  >
                                    <Button variant="link" size="md" block id={item.itemId} onClick={this.handleAddToCart} >
                                    <i className="pe-7s-cart" id={item.itemId}></i> Add to cart
                                    </Button>
                                    </Col>
                                    
                                </Row>
                            }
                            />
                        </Col>
                        )}
                                    
                    </Row>                
                </Container>              
        )
        
        return(
            <div className="ajax-loading-block-window">                                   
            </div>
        )
    }
}

export default Home;