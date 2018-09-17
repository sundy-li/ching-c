import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, List, Avatar, Col } from 'antd';

import "./MyList.scss"
import Http from 'core/http';


class MyList extends Component {
  static propTypes = {
    api: PropTypes.string,
    cardTitle: PropTypes.string,
    grideStyle: PropTypes.object,
    params: PropTypes.object,
    styles : PropTypes.object,

    renderOption : PropTypes.func,

  }

  static defaultProps = {
    api: '',
    cardTitle: '生活指数',
    grideStyle : {
      width: '25%',
      textAlign: 'center'
    },
    params: {},
    styles: {},
    renderOption :  (item, index) => (
      <List.Item key={index}>
        <List.Item.Meta
          avatar={<Avatar src={item.img} />}
          title={<a href={item.href}>{item.title}</a>}
          description={item.desc}
        />
      </List.Item>
    ),
  }

  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

 
  chkProps(props){
    // do some thing
    if (props.api == '') {
      const data = [{ "img": "http://pez4aloa4.bkt.clouddn.com/forecast/news1.png", "title": "09月13日：未来三天全国天气预报", "desc": "中央气象台2018年09月13日07时发布未来三天全国天气预报。", "href": "http://www.weather.com.cn/index/zxqxgg1/new_wlstyb.shtml" }, { "img": "http://pez4aloa4.bkt.clouddn.com/forecast/news2.png", "title": "09月13日：未来十天天气预报", "desc": "中央气象台2018年09月13日10时发布未来十天全国天气趋势预报。", "href": "http://www.weather.com.cn/index/zxqxgg1/new_wlshtyb.shtml" }, { "img": "http://pez4aloa4.bkt.clouddn.com/forecast/news3.png", "title": "09月12日：全国主要公路气象预报", "desc": "中国气象局与交通运输部2018年09月12日20时联合发布全国主要公路气象预报。", "href": "http://www.weather.com.cn/index/zxqxgg1/jtqxyb.shtml" }, { "img": "http://pez4aloa4.bkt.clouddn.com/forecast/news4.png", "title": "09月13日：全国最高气温预报", "desc": "中央气象台2018年09月13日12时发布全国最高气温预报。", "href": "http://products.weather.com.cn/product/Index/index/procode/YB_WD_ZG24.shtml" }, { "img": "http://pez4aloa4.bkt.clouddn.com/forecast/news5.png", "title": "09月13日：强对流天气公报", "desc": "中央气象台2018年09月13日10时发布强对流天气公报。", "href": "http://www.weather.com.cn/index/zxqxgg1/qdltqyb.shtml" }];

      this.setState({ items: data });
      this.props = props;
      return;
    }
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

  render() {
    const { items } = this.state;

    return (
      <div className="MyList-block-view" >
        <List
            itemLayout="horizontal"
            dataSource={items}
            renderItem={this.props.renderOption} 
        />
      </div>
    )
  }
}

export default MyList;
