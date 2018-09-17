import React, { Component } from "react";
import PropTypes from "prop-types";
import Http from 'core/http';
import { Icon, Button, Input, AutoComplete } from 'antd';


import "./Complete.scss"

const Option = AutoComplete.Option;



// 自动完全组件
class Complete extends Component {
  static propTypes = {
    name : PropTypes.string,
    // 接口地址
    completeApi: PropTypes.string,
    placeholder: PropTypes.string,
    styles: PropTypes.object,
    onSelect : PropTypes.func,
  }

  static defaultProps = {
    // @TODO: 这里使用一个接口平台的模拟接口，请替换为自己的接口地址
    name : '',
    completeApi: 'https://easy-mock.com/mock/58ff54b3739ac16852059e2a/example/complete',
    placeholder: '请输入城市',
    styles: { width: 300, marginTop : 20}
  }

  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
    };
  }

  renderOption = (item) => {
      return (
        <Option key={item.city} text={item.city}>
          <span className="global-search-item-count">{item.province}</span>  
          
          <a> - </a>
          
          <span className="global-search-item-count">{item.city}</span>
        </Option>
      );
  }

  handleSearch = (value) => {
    //complete api
    Http.get(this.props.completeApi, { 'city' : value} ).then((res) => {
      console.log(res);
      this.setState({
        dataSource: res,
      });
    });
  }

  // onSelect = (name, option) => {
  //   console.log("on select" + name);
  //   this.setState({ param: name });
  // }

  render() {
    const { dataSource } = this.state;
    return (
      <div className="global-search-wrapper" style={this.props.styles}>
        <AutoComplete
          className="global-search"
          style={{ width: '100%' }}
          dataSource={dataSource.map(this.renderOption)}
          onSelect={this.props.onSelect}
          onSearch={this.handleSearch}
          placeholder={this.props.placeholder}
          optionLabelProp="text"
          >
            <Input suffix={<Icon type="search" className="certain-category-icon" />} />
            </AutoComplete>
      </div>
    )
  }
}
export default Complete;
