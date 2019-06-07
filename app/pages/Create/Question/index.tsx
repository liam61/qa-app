import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { toJS } from 'mobx'
import { withRouter } from 'react-router-dom'
import { Button, ActionSheet, Switch, Toast, WhiteSpace } from 'antd-mobile'
// import { fromJS } from 'immutable'
import ConfirmModal, { IConfirmProps } from 'components/ConfirmModal'
import PageHeader from 'components/PageHeader'
import { renderSteps } from '../index'
import { IRootStore, IRootAction } from 'typings'
import { QUESTION_TYPES, DELAY_TIME } from 'common'
import { IQuestion } from '../interface'
import { getUid, emptyFn } from 'utils'

import './index.scss'

import addQstIcon from 'assets/images/add-question.png'

// tslint:disable-next-line: no-empty

// const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent)
// let wrapProps
// if (isIPhone) {
//   wrapProps = {
//     onTouchStart: e => e.preventDefault(),
//   };
// }

// type modalType = 'infoModal' | 'confirmModal'
let timerId: number | undefined

@inject(injector)
@observer
class Question extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'page-create-question',
  }

  constructor(props: IProps) {
    super(props)

    const { store } = props

    this.state = {
      questions: store!.cached
        ? // ? fromJS(store!.questions).toJS() // 深拷贝
          toJS(store!.questions)
        : ([] as IQuestion[]),
      confirmModal: false,
      confirmProps: { title: '', onOK: emptyFn },
    }
  }

  componentDidMount() {
    const { store, history, onCancel } = this.props

    if (store!.cached) {
      this.handleQstsCached(true) // 数据恢复完后开启缓存（此时只是设置了 setInterval）
    }

    history.listen((params: object, type: string) => {
      const { pathname, search } = params

      if (pathname === '/create' && search === '?steps=info' && type === 'POP') {
        onCancel()
      }
    })
  }

  componentWillUnmount() {
    // this.handleQstsCached()
    clearInterval(timerId)
  }

  showActionSheet = () => {
    const types = QUESTION_TYPES
    ActionSheet.showActionSheetWithOptions(
      {
        options: types.map(type => type.value),
        message: '请选择题目类型',
        maskClosable: true,
        className: 'qa-action-sheet',
      },
      index => {
        if (index === -1) {
          return
        }

        const { action } = this.props
        const { questions } = this.state
        const { key } = types[index]

        questions.push({
          id: getUid(),
          type: key,
          Element: require(`components/${key === 'Multiple' || key === 'Vote' ? 'Single' : key}Question`)
            .default,
        })

        action!.updateQuestions(questions)
        this.setState({ questions })
      }
    )
  }

  onEnterExtraPage = () => {
    const { action, onOK, history } = this.props
    const { questions } = this.state
    let qstArr: IQuestion[] = []
    const flag = questions.some((qst, index) => {
      // console.log(this[`question${index}`])
      const extraProps = this[`question${index}`].wrappedInstance.getQuestion() // NOTE: 为啥要用 wrappedInstance
      const { title, options } = extraProps

      qstArr.push(Object.assign({}, qst, extraProps))

      return !title || (options && options.length === 0) // title 不能为空，单选题的选项不能未空
    })

    this.handleModalClose('confirmModal')

    if (flag) {
      Toast.fail('「题目」必填，「选项」至少一项（判断题两个选项必填）！', DELAY_TIME)
      qstArr = []
      return
    }

    clearInterval(timerId)
    action!.updateQuestions(qstArr)
    history.push('/create?steps=extra')
    onOK()
  }

  handleQstsCached = (fromHooks: boolean) => {
    const { action, store } = this.props
    const { questions } = this.state

    if (!fromHooks) {
      action!.cachedChange()
    }

    if (store!.cached) {
      timerId = setInterval(() => {
        const qsts = questions.map((qst, index) => {
          const extraProps = this[`question${index}`].wrappedInstance.getQuestion() // NOTE: 为啥要用 wrappedInstance

          return Object.assign({}, qst, extraProps)
        })

        action!.updateQuestions(qsts)
      }, 1000)
    } else {
      clearInterval(timerId)
    }
  }

  handleConfirmModalShow = (props: IConfirmProps) => {
    // ev.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      confirmModal: true,
      confirmProps: props,
    })
  }

  handleModalClose = (type: string) => {
    this.setState({ [type]: false }) // tslint:disable-line
  }

  removeQstByIdx = (index: number) => {
    const { questions } = this.state
    questions.splice(index, 1)

    this.setState({ questions })

    this.handleModalClose('confirmModal')
  }

  renderQsts = (questions: IQuestion[], cached: boolean) =>
    questions.map((qst, index) => {
      const { id, Element, ...restProps } = qst
      const props = Object.assign({
        num: index + 1,
        cached,
        ...restProps,
        onRemove: () =>
          this.handleConfirmModalShow({
            title: `你确定要删除第 ${index + 1} 题吗`,
            onOK: () => this.removeQstByIdx(index),
          }),
      })

      return (
        <React.Fragment key={id}>
          {index === 0 ? null : <WhiteSpace size="lg" />}
          <Element ref={(node: React.ReactNode) => (this[`question${index}`] = node)} {...props} />
        </React.Fragment>
      )
    })

  render() {
    const { prefixCls, store, title, onCancel } = this.props
    const {
      questions,
      questions: { length },
      confirmModal,
      confirmProps,
    } = this.state

    return (
      <div className={prefixCls}>
        <PageHeader text="创建问题" onCancel={onCancel} />
        {renderSteps(1)}
        <WhiteSpace size="lg" />
        <div className="page-create-header qa-border-1px-bottom">
          <span className="header-title">
            标题：
            {title}
          </span>
          {length ? (
            <React.Fragment>
              <Switch checked={store!.cached} onChange={ev => this.handleQstsCached(false)} />
              <span className="header-cached">缓存</span>
            </React.Fragment>
          ) : null}
        </div>
        {length ? (
          <React.Fragment>
            {this.renderQsts(questions, store!.cached)}
            <Button className="add-question" onClick={this.showActionSheet}>
              <i className="fa fa-plus" aria-hidden="true" />
              <span>添加问题</span>
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h1 className="title">请添加题目</h1>
            <div className="desc">根据需求选择你要添加的题目类型，可添加多个问题</div>
            <div className="add-img">
              <img src={addQstIcon} alt="addQuestion" onClick={this.showActionSheet} />
            </div>
          </React.Fragment>
        )}
        <Button
          type="primary"
          className="qa-btn-bottom"
          disabled={length === 0}
          onClick={() =>
            this.handleConfirmModalShow({
              title: '你确定完成题目创建吗？',
              onOK: this.onEnterExtraPage,
            })
          }
        >
          添加完成
          <i className="fa fa-angle-right btn-bottom-icon" aria-hidden="true" />
        </Button>
        <ConfirmModal visible={confirmModal} onCancel={() => this.handleModalClose('confirmModal')} {...confirmProps} />
      </div>
    )
  }
}

type injectorReturnType = ReturnType<typeof injector>

interface IProps extends Partial<injectorReturnType> {
  prefixCls?: string
  onOK: () => void
  onCancel: () => void
  history: {
    push: (path: string) => void
    listen: (cb: (params: object, type: string) => void) => void
  }
}

interface IState extends Partial<injectorReturnType> {
  questions: IQuestion[]
  confirmModal: boolean
  confirmProps: IConfirmProps
}

function injector({ rootStore, rootAction }: { rootStore: IRootStore; rootAction: IRootAction }) {
  return {
    store: rootStore.Create.questionStore,
    action: rootAction.Create.questionAction,
    title: rootStore.Create.infoStore.title,
  }
}

export default withRouter(Question)
