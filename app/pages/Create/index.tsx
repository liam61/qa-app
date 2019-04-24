import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Button, ActionSheet, Switch, Toast } from 'antd-mobile'
import { fromJS } from 'immutable'
import { IRootStore, IRootAction } from '../../typings'
import { QUESTION_TYPES, DELAY_TIME } from '../../common/global'
import { IQuestion } from './stores/createStore'
import { getUid } from '../../utils'

import './index.scss'

import addQuestionIcon from '../../assets/images/add-question.png'

// const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent)
// let wrapProps
// if (isIPhone) {
//   wrapProps = {
//     onTouchStart: e => e.preventDefault(),
//   };
// }

let timerId

@inject(injector)
@observer
export default class Create extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'page-create',
  }

  constructor(props) {
    super(props)

    const { store } = props

    this.state = {
      questions: store!.createStore.cached
        ? fromJS(store!.createStore.questions).toJS() // 深拷贝
        : ([] as IQuestion[]),
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
      },
      index => {
        if (index === -1) {
          return
        }

        const { action } = this.props
        const { questions } = this.state

        questions.push({
          id: getUid(),
          type: types[index].key,
          Element: require(`../../components/${types[index].key}Question`)
            .default,
        })

        action!.createAction.updateQuestions(questions)
        this.setState({ questions })
      },
    )
  }

  // handleFinished = () => {
  //   const { action } = this.props
  //   const { questions } = this.state
  //   const qstArr: IQstToSubmit[] = []
  //   const flag = questions.some((qst, index) => {
  //     const { id, type } = qst
  //     // console.log(this[`question${index}`].wrappedInstance)
  //     const { title, required, options } = this[
  //       `question${index}`
  //     ].getQuestion()

  //     qstArr.push({
  //       // id,
  //       type,
  //       title,
  //       required,
  //       options,
  //     })

  //     return !title || options.length === 0 // title 不能为空，单选题的选项不能未空
  //   })

  //   if (flag) {
  //     Toast.fail('请检查以上字段！', DELAY_TIME)
  //     return
  //   }

  //   action!.createAction.submitQuestions(qstArr)
  // }

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
      Toast.fail('请检查以上字段！', DELAY_TIME)
      qstArr = []
      return
    }

    action!.createAction.submitQuestions(qstArr)
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

  removeQstByIdx = (index: number) => {
    const { questions } = this.state
    questions.splice(index, 1)

    this.setState({ questions })
  }

  renderQsts = (questions: IQuestion[], cached: boolean) =>
    questions.map((qst, index) => {
      const { id, Element, options, title, required } = qst
      const props = Object.assign({
        num: index + 1,
        // onRemove: () => this.handleModalShow(index),
        // TODO: modal 判断
        title,
        options,
        required,
        cached,
        onRemove: () => this.removeQstByIdx(index),
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
    const { prefixCls, store, action } = this.props
    const {
      questions,
      questions: { length },
    } = this.state

    return (
      <div className={prefixCls}>
        <div>
          <Switch
            // disabled={length === 0}
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
          onClick={this.handleFinished}
        >
          添加完成
        </Button>
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
