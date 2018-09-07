import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button } from 'antd';

import "./Gl.scss"

class Gl extends Component {
  static propTypes = {
  }

  static defaultProps = {
  }

  render() {
    return (
      <div className="Gl-block-view">
        <Button>Click me!</Button>
      </div>
    )
  }
}

export default Gl;
