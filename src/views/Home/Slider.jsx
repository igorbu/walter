import React from "react";
import { Col,Carousel } from "react-bootstrap"

class Slider extends React.Component {
   
  
  render() {
    return (  
           
            <Col>
                <Carousel>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="images/iphone.png"
                        alt="Iphone"
                        />
                        <Carousel.Caption>
                        <h3>New Iphone</h3>
                    
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="images/galaxy.png"
                        alt="Samsung galaxy"
                        />

                        <Carousel.Caption>
                        <h3>New Samsung galaxy</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
            
                </Carousel>
            </Col>
       

    );
  }
}

export default Slider;


