import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { InputItem, Button, Toast, WhiteSpace } from 'antd-mobile'
import InputModal, { IInputProps } from 'components/InputModal'
import PageHeader from 'components/PageHeader'
import { DELAY_TIME } from 'common'
import { IError } from '../../Login/interface'
import { noErrors } from '../../Login'
import { IRootStore, IRootAction } from 'typings'

import './index.scss'

@inject(injector)
@observer
export default class Detail extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'page-user-detail',
  }

  state = {
    inputModal: false,
    inputProps: { title: '', defaultValue: '', key: '' },
    usernameInfo: noErrors,
  }

  handleModalShow = (title: string, info: object) => {
    this.setState({
      inputProps: {
        title: `修改${title}`,
        defaultValue: Object.values(info)[0],
        key: Object.keys(info)[0],
      },
      inputModal: true,
    })
  }

  handleModalClose = (type: string) => {
    this.setState({ [type]: false })
  }

  handleErrorClick = (type: string) => {
    const { [type]: info } = this.state
    Toast.fail(info.error)
    // this.handleModalShow(title, params)
  }

  handleDetailChange = (val: string) => {
    const { action } = this.props
    const {
      inputProps: { key },
    } = this.state

    this.setState({ inputModal: false })

    action!.updateUserDataByKey(key, val, (errors: IError) =>
      this.setState({ [`${key}Info`]: errors })
    )
  }

  render() {
    const { prefixCls, onCancel, onOK, store } = this.props
    const { inputModal, inputProps, usernameInfo } = this.state

    const {
      data: { name, profile, gender, birthday },
      updating,
    } = store!

    const { hasError } = usernameInfo

    return (
      <div className={prefixCls}>
        <PageHeader text="编辑" onCancel={onCancel} />
        <WhiteSpace size="lg" />
        <div className={`${prefixCls}-main`}>
          <InputItem
            className="qa-input-item user-input text-right"
            value={name}
            editable={false}
            error={hasError}
            onErrorClick={() => this.handleErrorClick('usernameInfo')}
            onClick={() => this.handleModalShow('用户名', { name })}
          >
            <i className="fa fa-user-o blue" aria-hidden="true" />
            <span>用户名</span>
          </InputItem>
          <InputItem
            className="qa-input-item user-input text-right"
            value={profile}
            editable={false}
            onClick={() => this.handleModalShow('简介', { profile })}
            placeholder="请填写"
          >
            <i className="fa fa-list-alt" aria-hidden="true" />
            <span>简介</span>
          </InputItem>
          <InputItem
            className="qa-input-item user-input text-right"
            value={`${gender === 'male' ? '男' : '女'}`}
            editable={false}
            onClick={() => this.handleModalShow('性别', { gender })}
            placeholder="请填写"
          >
            <i className="fa fa-male warning" aria-hidden="true" />
            <span>性别</span>
          </InputItem>
          <InputItem
            className="qa-input-item user-input text-right"
            value={birthday}
            editable={false}
            onClick={() => this.handleModalShow('生日', { birthday })}
            placeholder="请填写"
          >
            <i className="fa fa-birthday-cake error" aria-hidden="true" />
            <span>生日</span>
          </InputItem>
        </div>
        <Button
          className="qa-btn-bottom"
          type="primary"
          onClick={onOK}
          loading={updating}
          disabled={updating || hasError}
        >
          提交
        </Button>
        <InputModal
          visible={inputModal}
          onOK={this.handleDetailChange}
          onCancel={() => this.handleModalClose('inputModal')}
          {...inputProps}
        />
        {/* <InfoModal visible={infoModal} {...infoProps} /> */}
      </div>
    )
  }
}

type injectorReturnType = ReturnType<typeof injector>

interface IProps extends Partial<injectorReturnType> {
  prefixCls?: string
  onCancel: () => void
  onOK: () => void
}

interface IState extends Partial<injectorReturnType> {
  inputModal: boolean
  inputProps: IInputProps
  usernameInfo: IError
}

function injector({
  rootStore,
  rootAction,
}: {
  rootStore: IRootStore
  rootAction: IRootAction,
}) {
  return {
    store: rootStore.User.userStore,
    action: rootAction.User.userAction,
  }
}
