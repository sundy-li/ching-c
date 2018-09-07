import React, { Component } from "react";
import PropTypes from "prop-types";
import Http from 'core/http';
import { Icon, Button, Input, AutoComplete } from 'antd';


import "./Complete.scss"

const Option = AutoComplete.Option;



// 自动完全组件
class Complete extends Component {
  static propTypes = {
    // 接口地址
    completeApi: PropTypes.string,
    placeholder: PropTypes.string,
  }

  static defaultProps = {
    // @TODO: 这里使用一个接口平台的模拟接口，请替换为自己的接口地址
    completeApi: 'https://easy-mock.com/mock/58ff54b3739ac16852059e2a/example/complete',
    placeholder : '请输入城市'
  }

  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      param: "",
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
    Http.get(this.props.completeApi, {}).then((res) => {
      console.log(res);
      this.setState({
        dataSource: res.items,
      });
    });
  }

  onSelect = (name, option) => {
    console.log("on select" + name);
    this.setState({ param: name });
  }

  render() {
    const { dataSource } = this.state;
    return (
      <div className="global-search-wrapper" style={{ width: 300 }}>
        
        <AutoComplete
          className="global-search"
          style={{ width: '100%' }}
          dataSource={dataSource.map(this.renderOption)}
          onSelect={this.onSelect}
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
