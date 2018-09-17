import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Card, Row, Col } from 'antd';

import "./MyCard.scss"
import Http from 'core/http';


class MyCard extends Component {
  static propTypes = {
    api: PropTypes.string,
    cardTitle: PropTypes.string,
    cardTitleImg : PropTypes.string,
    grideStyle: PropTypes.object,
    params: PropTypes.object,
    styles: PropTypes.object,
    imgStyle: PropTypes.object,
    renderOption : PropTypes.func,
  }

  static defaultProps = {
    api: 'https://easy-mock.com/mock/58ff54b3739ac16852059e2a/example/card',
    cardTitle: '生活指数',
    cardTitleImg : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    grideStyle : {
      width: '33%',
      textAlign: 'center'
    },
    imgStyle: {
      maxWidth: '100%',
      maxHeight: '100%',
    },
    params: {},
    styles: {},

    renderOption: (item, index) => {
      return (
        <Row>
          <Col span={12} >
            <img src={item.img} />
          </Col>
  
          <Col span={12} >
            <dl>
              <dt>{item.status}</dt>
              <dd>{item.msg}</dd>
            </dl>
          </Col>
        </Row>
      )
      },
  }

  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

 
  chkProps(props){
    // do some thing
    Http.get(props.api, props.params).then((res) => {
      this.setState({items : res})
    })
    this.props = props;
  }

  componentWillMount() {
    this.chkProps(this.props)
  }

  componentWillReceiveProps(nextProps) {
      this.chkProps(nextProps)
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
    var renderItem = (item, index) => {
      return (
        <Card.Grid style={this.props.grideStyle} key={index}>
           {this.props.renderOption(item, index)}
        </Card.Grid>)
    }

    return (
        <div className="MyCard-block-view" >
        <Card title={ this.renderTitle() }

        style={this.props.styles}>
        {
          items.map(renderItem)
        }
        </Card>
      </div>
    )
  }
}

export default MyCard;
