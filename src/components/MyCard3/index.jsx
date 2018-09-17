import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Card, Avatar } from 'antd';

import "./MyCard3.scss"
import Http from 'core/http';


class MyCard3 extends Component {
  static propTypes = {
    api: PropTypes.string,
    cardTitle: PropTypes.string,
    cardTitleImg : PropTypes.string,
    grideStyle: PropTypes.object,
    imgStyle: PropTypes.object,
    params: PropTypes.object,
    styles : PropTypes.object,
  }

  static defaultProps = {
    api: 'https://easy-mock.com/mock/58ff54b3739ac16852059e2a/example/card3',
    cardTitle: '今天适合穿',
    cardTitleImg : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    grideStyle : {
      width: '33%',
      height: '300px',
      textAlign: 'center',
      padding : '12px',
    },

    imgStyle: {
      maxWidth: '100%',
      maxHeight: '100%',
    },
    params: {},
    styles: {}
  }

  constructor(props) {
    super(props);
    this.state = {
      data: {
        items : [],
      },
    };
  }

 
  chkProps(props){
    // do some thing
    Http.get(props.api, props.params).then((res) => {
      this.setState({data : res})
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
    return <Card.Grid style={this.props.grideStyle}  key={index}> 
      <img src={item} style={this.props.imgStyle}/>
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
    const { data } = this.state;
    return (
      <div className = "MyCard3-block-view" >
        <Card title={this.renderTitle()} style={this.props.styles}>
          
          <Card.Meta  avatar={<Avatar src={data.avatar} />} title={data.title} description={data.description} ></Card.Meta>
            {
              data.items.map(this.renderOption)
            }
            </Card>
      </div>
    )
  }
}

export default MyCard3;
