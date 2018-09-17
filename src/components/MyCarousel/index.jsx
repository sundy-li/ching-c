import React, { Component } from "react";
import PropTypes from "prop-types";
import { Carousel } from 'antd';

import "./MyCarousel.scss"
import Http from 'core/http';


class MyCarousel extends Component {
  static propTypes = {
    items : PropTypes.array,
    grideStyle: PropTypes.object,
    styles : PropTypes.object,
  }

  static defaultProps = {
    grideStyle : {
      height: '310px',
      width: '100%',
    },
    styles: {
      textAlign : 'center'
    },
    items: [
      { desc : "全国24小时降水量预报",  src:  "http://pez4aloa4.bkt.clouddn.com/forecast/l1.jpg" },
      { desc : "祁连山下湿地 碧水绿妆如诗似画",  src:  "http://pez4aloa4.bkt.clouddn.com/forecast/l2.jpg" },
      { desc : "FY-4A中国及周边区域红外云图",  src:  "http://pez4aloa4.bkt.clouddn.com/forecast/l3.jpg" },
    ]
  }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

 
  chkProps(props){
    // do some thing
    this.props = props;
    this.setState({items : this.props.items})
  }

  componentWillMount() {
    this.chkProps(this.props)
  }

  componentWillReceiveProps(nextProps) {
      this.chkProps(nextProps)
  }

  renderOption = (item, index) => {
    return (
      <div style={ this.props.grideStyle } key={index}>
        <img  src={item.src} style={ this.props.grideStyle }  />
        <div className="wz"> <b>{item.desc}</b> </div>
      </div> 
    )
  }

  render() {
    const { items } =  this.state;
    return (
      <div className="MyCarousel-block-view" >
              <Carousel vertical autoplay>
                  {
                items.map(this.renderOption)
              }
              </Carousel>
      </div>
    )
  }
}

export default MyCarousel;
