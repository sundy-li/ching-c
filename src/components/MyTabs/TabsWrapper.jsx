import React, { Component } from "react"

const editMode = window.ching ? window.ching.editMode : false

class TabsWrapper extends Component {
    constructor(props) {
        super(props)
    }

    static defaultProps = {
        tabName: [],
    }

    
    render() {
        const { tabName, key } = this.props;
      
        if (editMode) {
            return (
                <TabPane tab={tabName} key={key} />
            )
        }
        return null
    }
}

const exportComponent = window.ComponentWrapper
  ? window.ComponentWrapper(TabsWrapper, "TabsWrapper")
  : TabsWrapper

export default exportComponent
// export default ColWrapper
