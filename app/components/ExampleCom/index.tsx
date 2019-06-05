import * as React from 'react'

import './index.less'

interface IProps {
  name: string
}

class Hello extends React.PureComponent<IProps> {
  state = { count: 1 }

  handleClick = () => {
    const { count } = this.state
    this.setState({ count: count + 1 })
  }

  render() {
    const { name } = this.props
    const { count } = this.state
    return (
      <div>
        <h1>This is Example component.</h1>
        <div className="name">
          my name is {name}
        </div>
        <button onClick={this.handleClick}>
          the count {count}
        </button>
        <div className="ruiwen">this is ruiwen</div>
      </div>
    )
  }
}

export default Hello
