import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd-mobile'

import './styles'

class Hello extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
  }

  state = {
    count: 1,
  }

  handleClick = () => {
    const { count } = this.state
    this.setState({ count: count + 1 })
  }

  render() {
    const { name } = this.props
    const { count } = this.state
    return (
      <div>
        <h1>This is from Hello component.</h1>
        <h2 className="h2">this is h2</h2>
        <div className="name">
          my name is
          {name}
        </div>
        <button className="btn" type="button" onClick={this.handleClick}>
          the count
          {count}
        </button>
        <div className="ruiwen">this is ruiwen</div>
        <Button type="primary">这是 antd 按钮</Button>
      </div>
    )
  }
}

export default Hello
