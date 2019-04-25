import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Button, ActionSheet, Switch, Toast } from 'antd-mobile'
import { fromJS } from 'immutable'
import InfoModal, { InfoTypes } from '../../components/InfoModal'
import ConfirmModal from '../../components/ConfirmModal'
import { IRootStore, IRootAction } from '../../typings'
import { QUESTION_TYPES, DELAY_TIME } from '../../common/global'
import { IQuestion } from './stores/createStore'
import { getUid } from '../../utils'

import './index.scss'

import addQuestionIcon from '../../assets/images/add-question.png'

// tslint:disable-next-line: no-empty

// const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent)
// let wrapProps
// if (isIPhone) {
//   wrapProps = {
//     onTouchStart: e => e.preventDefault(),
//   };
// }

type modalType = 'infoModal' | 'confirmModal'
// type modalType = Pick<IState, 'infoModal' | 'confirmModal'>

let timerId

@inject(injector)
@observer
export default class Create extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'page-create',
  }

  // TODO: modalProps 的工厂
  // modalPropsFactory = {
  //   info() {
  //     init: {
  //       type: 'warning', title: '', content: ''
  //     }

  //   },
  //   confirm(type, ) {
  //     const init = {
  //       title: '', onOK: () => {}
  //     }
  //     submit: {
  //       title: '你确定要提交题目吗？',
  //             onOK: this.handleFinished,
  //     },
  //     remove: {
  //       title: '你确定要删除该题目吗',
  //       onOK: () => this.removeQstByIdx(index),
  //     }
  //   }
  // }

  constructor(props) {
    super(props)

    const { store } = props

    this.state = {
      questions: store!.createStore.cached
        ? fromJS(store!.createStore.questions).toJS() // 深拷贝
        : ([] as IQuestion[]),
      infoModal: false,
      infoProps: { type: 'warning', title: '', content: '' },
      confirmModal: false,
      confirmProps: { title: '', onOK: () => console.log('aa') },
    }
  }

  componentDidMount() {
    const { store } = this.props

    if (store!.createStore.cached) {
      this.handleQstsCached(true) // 数据恢复完后开启缓存（此时只是设置了 setInterval）
    }
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
        // wrapProps,
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
          Element: require(`../../components/${
            key === 'Multiple' || key === 'Vote' ? 'Single' : key
          }Question`).default,
        })

        action!.createAction.updateQuestions(questions)
        this.setState({ questions })
      },
    )
  }

  handleFinished = () => {
    const { action } = this.props
    const { questions } = this.state
    let qstArr: IQuestion[] = []
    const flag = questions.some((qst, index) => {
      // console.log(this[`question${index}`])
      const extraProps = this[`question${index}`].wrappedInstance.getQuestion() // NOTE: 为啥要用 wrappedInstance
      const { title, options } = extraProps

      qstArr.push(Object.assign({}, qst, extraProps))

      return !title || options.length === 0 // title 不能为空，单选题的选项不能未空
    })

    if (flag) {
      this.handleModalClose('confirmModal')
      Toast.fail('请检查以上字段！', DELAY_TIME)
      qstArr = []
      return
    }

    clearInterval(timerId)
    action!.createAction.submitQuestions(qstArr, (/* result */) => {
      // TODO: 上传之后的提示联动
      this.handleModalClose('confirmModal')
      // this.handleInfoModalShow(getProps[result])
    })
  }

  handleQstsCached = fromHooks => {
    const { action, store } = this.props
    const { questions } = this.state

    if (!fromHooks) {
      action!.createAction.cachedChange()
    }

    if (store!.createStore.cached) {
      timerId = setInterval(() => {
        const qsts = questions.map((qst, index) => {
          const extraProps = this[
            `question${index}`
          ].wrappedInstance.getQuestion() // NOTE: 为啥要用 wrappedInstance

          return Object.assign({}, qst, extraProps)
        })

        action!.createAction.updateQuestions(qsts)
      }, 1000)
    } else {
      clearInterval(timerId)
    }
  }

  handleInfoModalShow = (props: IInfoProps) => {
    this.setState({
      infoModal: true,
      infoProps: props,
    })
  }

  handleConfirmModalShow = (props: IConfirmProps) => {
    // ev.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      confirmModal: true,
      confirmProps: props,
    })
  }

  handleModalClose = (type: modalType) => {
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
      // const { id, Element, options, title, required, type } = qst
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
        <Element
          key={id}
          ref={node => (this[`question${index}`] = node)}
          {...props}
        />
      )
    })

  render() {
    const { prefixCls, store } = this.props
    const {
      questions,
      questions: { length },
      infoModal,
      infoProps,
      confirmModal,
      confirmProps,
    } = this.state

    return (
      <div className={prefixCls}>
        <div>
          <Switch
            checked={store!.createStore.cached}
            onChange={ev => this.handleQstsCached(false)}
          />
          缓存
        </div>
        {length ? (
          <React.Fragment>
            {this.renderQsts(questions, store!.createStore.cached)}
            <Button className='add-question' onClick={this.showActionSheet}>
              <i className='fa fa-plus' aria-hidden='true' />
              <span>添加问题</span>
            </Button>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h1 className='title'>请添加题目</h1>
            <div className='desc'>
              根据需求选择你要添加的题目类型，可添加多个问题
            </div>
            <div className='add-img'>
              <img
                src={addQuestionIcon}
                alt='addQuestion'
                onClick={this.showActionSheet}
              />
            </div>
          </React.Fragment>
        )}
        <Button
          type='primary'
          className='add-finish'
          disabled={length === 0}
          onClick={() =>
            this.handleConfirmModalShow({
              title: '你确定创建完题目吗？',
              onOK: this.handleFinished,
            })
          }
        >
          <div>
            添加完成
            <i className='fa fa-angle-right add-finish-icon' aria-hidden='true' />
          </div>
        </Button>
        <InfoModal
          visible={infoModal}
          onClose={() => this.handleModalClose('infoModal')}
          {...infoProps}
        />
        <ConfirmModal
          visible={confirmModal}
          onCancel={() => this.handleModalClose('confirmModal')}
          {...confirmProps}
        />
      </div>
    )
  }
}

type injectorReturnType = ReturnType<typeof injector>

interface IProps extends Partial<injectorReturnType> {
  prefixCls?: string
  [k: string]: any
}

interface IState extends Partial<injectorReturnType> {
  questions: IQuestion[]
  infoModal: boolean
  infoProps: IInfoProps
  confirmModal: boolean
  // confirmProps: { title: React.ReactNode, onOK: () => void }
  confirmProps: IConfirmProps
}

interface IConfirmProps {
  title: React.ReactNode
  onOK: () => void
}

interface IInfoProps {
  type: InfoTypes
  title: React.ReactNode
  content: React.ReactNode
}

function injector({
  rootStore,
  rootAction,
}: {
  rootStore: IRootStore
  rootAction: IRootAction,
}) {
  return {
    store: rootStore.Create,
    action: rootAction.Create,
  }
}
