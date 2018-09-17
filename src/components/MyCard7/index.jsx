import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Card , Avatar} from 'antd';

import "./MyCard7.scss"
import Http from 'core/http';


class MyCard7 extends Component {
  static propTypes = {
    api: PropTypes.string,
    cardTitle: PropTypes.string,
    cardTitleImg : PropTypes.string,
    grideStyle: PropTypes.object,
    imgStyle: PropTypes.object,
    params: PropTypes.object,
    styles: PropTypes.object,
  }

  static defaultProps = {
    api: 'https://easy-mock.com/mock/58ff54b3739ac16852059e2a/example/card7',
    cardTitle: '七日天气',
    cardTitleImg : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    grideStyle : {
      width: '13%',
      textAlign: 'center',
    },

    imgStyle: {
      width: '100%',
      height: '48px',
      display: 'block',
      textAlign: 'center'
    },

    params: {},
    styles: {
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      desc: {},
    };
  }

 
  chkProps(props){
    // do some thing
    Http.get(props.api, props.params).then((res) => {
      this.setState({ items: res.items });
      this.setState({ desc: res.desc });
    })
    this.props = props;
  }

  componentWillMount() {
    this.chkProps(this.props)
  }

  componentWillReceiveProps(nextProps) {
      this.chkProps(nextProps)
  }

  renderOption = (item, index) => {
    return <Card.Grid style={this.props.grideStyle} key={index} className={ item.active ? 'active' : '' }> 
      <span>{item.week}</span>
        <br/>
                          <span>{item.w1}</span>
                          <span >
                            <img style={this.props.imgStyle} src={item.img1} alt={item.w1} />
                          </span>
                          <div>
                              <p>
                                  <b>{item.temp1}</b>
                              </p>
                              <p>-</p>
                              <p>
                                  <b>{item.temp2}</b>
                              </p>
                          </div>
                          <span >
                              <img style={this.props.imgStyle} src={item.img2} alt={item.w2} />
                          </span>
                          <span>{item.w2}</span>
      <br/>
       <span>{item.day}</span>
    </Card.Grid>
  }

  renderTitle() {
    if (this.props.cardTitleImg) {
      return (
        <span><img className="icon-img" alt="example" src={this.props.cardTitleImg}/>  {this.props.cardTitle}  </span>
      )
    }
    return (this.props.cardTitle);
  }

  render() {
    const { items } = this.state;
    const { desc } = this.state;
    return (
      <div className = "MyCard7-block-view" >
        <Card title={ this.renderTitle() } style={this.props.styles}>
          
          <Card.Meta style={{paddingBottom : '13px'}}
            avatar={<Avatar src={desc.avatar} />}
            title={desc.title} description={desc.description}>
          </Card.Meta>


          
            {
            items.map(this.renderOption)
            }
            </Card>
      </div>
    )
  }
}

export default MyCard7;
