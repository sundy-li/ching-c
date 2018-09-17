import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from 'antd';
import Http from 'core/http';


import "./Pl.scss"

class Pl extends Component {
  static propTypes = {
    api: PropTypes.string,
    params : PropTypes.object,
  }

  static defaultProps = {
    api: 'https://easy-mock.com/mock/58ff54b3739ac16852059e2a/example/pl',
    params: {},
  }

  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

 
  chkProps(props){
    // do some thing
    Http.get(props.api, props.params).then((res) => {
      this.setState({ data: res });
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
    const { data } = this.state;

    if ( !data.title) {
      return ( <a></a> );
    }

    return (
      <div className=".Pl-block-view" >
        <div className="ant-card-meta-avatar">
          <span className="ant-avatar ant-avatar-circle ant-avatar-image">
              <img src={data.img} />
            </span>
          </div>
          
          <div className="ant-card-meta-detail">
              <div className="ant-card-meta-title">{data.title}</div>
          <div className="ant-card-meta-description">{data.description}</div>
        </div>
      </div>
        
    )
  }
}

export default Pl;
