import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tabs } from 'antd';

import "./MyTabs.scss"


const TabPane = Tabs.TabPane;

class MyTabs extends Component {
  static propTypes = {
    tabNames: PropTypes.array,
  }

  static defaultProps = {
    tabNames: [],
  }

  constructor(props) {
    super(props);
    this.state = {
      currentKey: "1",
      items : this.props.tabNames,
    };
  }

  onchange(key ) {
    this.setState( {activeKey : key})
  }

  chkProps(props){
    // do some thing
    this.setState({ items: props.tabNames });
    this.props = props;
  }

  componentWillMount() {
    this.chkProps(this.props)
  }

  componentWillReceiveProps(nextProps) {
      this.chkProps(nextProps)
  }

  render() {
    const { children, style } = this.props;
    const { currentKey, items, activeKey } = this.state;
    return (
      <Tabs defaultActiveKey={currentKey} onChange={ onchange } style={style}> 
        {
          children != null && children.map((Child, index) => {
            // return React.createElement('TabPane', { key: index + 1, tab: items[index], forceRender: 'true' }, Child);
            
            return (
              <TabPane key={index + 1} tab={items[index]} forceRender="true">
               {Child}
               </TabPane>
            )
          })
        }

        {
          
          children == null &&  <TabPane key="1" tab="101"  > afsafdsa  </TabPane>
        }

        </Tabs>
      )
  }
}

export default MyTabs;
