import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Table } from 'antd';
import Http from 'core/http';

import "./Uwl.scss"

class Uwl extends Component {
  
  static propTypes = {
    // 接口地址
    api: PropTypes.string,
  }

  static defaultProps = {
    // @TODO: 这里使用一个接口平台的模拟接口，请替换为自己的接口地址
    api: 'https://mocks.alibaba-inc.com/mock/webide/listItem',
  }

  constructor(props) {
    super(props);

    this.state = {
      // 列表数据
      list: [],
    };
  }

  onFetchData = () => {
    Http.get(this.props.api, {}).then((res) => {
      this.setState({
        list: res.items,
      });
    });

    // this.setState({
    //   list :  [{
    //     name: '胡彦斌',
    //     price : 2.3,
    //     count : 3333
    //   }, {
    //     name: '胡彦祖',
    //     price : 33.2,
    //     count : 3333
    //   }]
    // });

  }

  render() {
    return (
      <div className="Uwl-block-view">
        <Button>兄弟，点我</Button>
      </div>
    )
  }
}

export default Uwl;
