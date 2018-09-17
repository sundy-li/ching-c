import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from 'antd';
import Http from 'core/http';

import 'github-markdown-css'

import "./PB.scss"

class PB extends Component {
  
  static propTypes = {
    api: PropTypes.string,
    params : PropTypes.object,
  }

  static defaultProps = {
    api: 'https://easy-mock.com/mock/58ff54b3739ac16852059e2a/example/pb',
    params: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      htmlDoc: "<h4>loading</h4>",
    };
  }

 
  chkProps(props){
    // do some thing
    Http.get(props.api, props.params).then((res) => {
      this.setState({ htmlDoc: res.htmlDoc });
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
    const { htmlDoc } = this.state;
    const data = { __html: htmlDoc };
    
    return (
      <div className="markdown-body " dangerouslySetInnerHTML={data} />
    )
  }
}

export default PB;
