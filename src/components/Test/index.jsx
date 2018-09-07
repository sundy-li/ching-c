import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Table } from 'antd';
import Http from 'core/http';

import "./Test.scss"

// 表格列定义
const tableColumns = [
  {
    title: '名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '价格',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: '存库',
    dataIndex: 'count',
    key: 'count',
  },
];

class Test extends Component {
  static propTypes = {
    // 接口地址
    api: PropTypes.string,
  }

  static defaultProps = {
    // @TODO: 这里使用一个接口平台的模拟接口，请替换为自己的接口地址
    api: 'https://easy-mock.com/mock/58ff54b3739ac16852059e2a/example/test',
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
      console.log(res);
      this.setState({
        list: res.items,
      });
    });

  }

  render() {
    const { list } = this.state;

    return (
      <div className="Test-block-view">
        <Button onClick={this.onFetchData}>点我获取数据</Button>

        {
          (list && list.length > 0) &&
            <Table dataSource={list} columns={tableColumns} />
        }
      </div>
    )
  }
}

export default Test;
