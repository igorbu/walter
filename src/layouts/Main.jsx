import React  from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import {reactLocalStorage} from 'reactjs-localstorage';
//import { Navbar,Nav } from "react-bootstrap"

import routes from "../routes/routes";
import Header from "../components/Header";

class Main extends React.Component {
  constructor(props){
    super(props);

    this.state={
      basket:reactLocalStorage.getObject("cart")
    }

  }
  componentDidMount(){    
    console.log("init",reactLocalStorage.getObject('cart'));
    console.log(this.state.basket)
    reactLocalStorage.setObject("cart",{})
    if(Object.entries(reactLocalStorage.getObject("cart")).length === 0 && reactLocalStorage.getObject("cart").constructor === Object){
      console.log("nema ništa");
      reactLocalStorage.setObject("cart",{})
    }
    else{
      alert("ima");
    }
  }  
  
  render() {  
    return (
      <div className="wrapper">   
      <Header {...this.props}/>   
          <div id="main-panel" className="main-panel" ref="">      
          <Switch>
            {routes.map((prop, key) => {              
              if (prop.redirect)
                return <Redirect from={prop.path} to={prop.to} key={key} />;
              return (
                <Route path={prop.path} component={prop.component} key={key} />
              );
            })}
          </Switch>
         
        </div>
      </div>
    );
  }
}

export default Main;
