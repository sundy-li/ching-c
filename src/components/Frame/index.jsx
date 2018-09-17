import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button,Select,Icon,Row,Col,Divider } from 'antd';

import "./Frame.scss"

const Option = Select.Option;

class Frame extends Component {
  static propTypes = {
    src: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
  }

  static defaultProps = {
    src: 'http://www.weather.com.cn/',
    width: '100%',
    height: '1200',
    
    datas: [
      {name : '中国天气网', src : 'http://www.weather.com.cn/'},
      {name : '墨迹天气', src : 'http://tianqi.moji.com/'},
      {name : '中国气象局', src : 'http://www.cma.gov.cn/2011qxfw/2011qtqyb/'},
    ]
  }

  constructor(props) {
    super(props);
    this.state = {
      'src' : props.src,
    };
  }

  handleChange = (value) => {
    console.log("on change" + value);
    this.setState({ 'src': value });
  }


  renderOption = (item) => {
    return   <Option value={item.src}>{item.name}</Option>
  }

  goForward = () => {
    const { src } = this.state;
    window.open(src,'_blank');
  }

  render() {
    const { src } = this.state;
    return (
      <div className="Frame-block-view">
        
        <Row >

          <Col span={8}>
            <Select defaultValue={this.props.src} style={{ width: 200 }} onChange={this.handleChange}  size='large'>
            {
                this.props.datas.map(this.renderOption)
            }
            </Select>
          </Col>
      
        
          <Col span={4} offset={4} >
          <Button type="primary" onClick={this.goForward} >
            点我进入主站<Icon type="right" />
          </Button>
          </Col>

        </Row>


        <Divider> 注意：以下网页来源于三方机构，点击上面按钮可以进入主站 </Divider>
        <Row align='middle'>
          <iframe src={src} width={this.props.width} height={this.props.height} frameborder="0" scrolling="no" />
        </Row>

      </div>
    )
  }
}

export default Frame;
