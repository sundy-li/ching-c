import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Card } from 'antd';

import "./MyCard.scss"
import Http from 'core/http';


class MyCard extends Component {
  static propTypes = {
    api: PropTypes.string,
    cardTitle: PropTypes.string,
    grideStyle: PropTypes.object,
  }

  static defaultProps = {
    api: 'https://easy-mock.com/mock/58ff54b3739ac16852059e2a/example/card',
    cardTitle: 'cardTitle',
    gridStyle : {
      width: '10%',
      textAlign: 'center',
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  async componentWillMount(){
    Http.get(this.props.api, {}).then((res) => {
      console.log(res);
      this.setState({
        items: res.items,
      });
    });
  }

  renderOption = (item) => {
    return <Card.Grid style={this.props.grideStyle}> {item.name} </Card.Grid>
  }

  render() {
    const { items } = this.state;
    return (
      <div className = "MyCard-block-view">
          <Card title={this.props.cardTitle}>
            {
            items.map(this.renderOption)
            }
            </Card>
      </div>
    )
  }
}

export default MyCard;
