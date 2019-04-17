import React, { PureComponent } from 'react'
import { observer } from 'mobx-react'


@observer
class MobxCom extends PureComponent {
  render() {
    return (
      <p>this is mobx component</p>
    )
  }
};

export default MobxCom
