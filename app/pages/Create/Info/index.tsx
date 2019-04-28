import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { withRouter } from 'react-router-dom'
import {
  InputItem,
  TextareaItem,
  Button,
  Toast,
  Switch,
  WhiteSpace,
  Modal,
  ImagePicker,
} from 'antd-mobile'
import { renderSteps } from '../index'
import ConfirmModal from '../../../components/ConfirmModal'
import { IRootStore, IRootAction } from '../../../typings'

import './index.scss'

@inject(injector)
@observer
class Info extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'page-create-info',
  }

  constructor(props) {
    super(props)

    this.state = {
      title: '',
      content: '',
      files: [
        {
          url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
          id: '2121',
        },
        {
          url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
          id: '2122',
        },
      ],
      imgModal: false,
      imgUrl: '',
      confirmModal: false,
      // confirmProps: { title: '你确定完成基本信息吗？', onOK }, 只有这种情况需要 confirmModal
    }
  }

  componentWillUnmount() {
    // console.log('unmount infp')
    // const { onCancel } = this.props
    // onCancel()
  }

  handleTitleChange = val => {
    this.setState({ title: val })
  }

  handleContentChange = val => {
    this.setState({ content: val })
  }

  handleChangeFile = (fileId, type) => {
    this.setState({ files: fileId })
  }

  handleImgClick = (index, files) => {
    console.log(index, files)
    this.setState({
      imgModal: true,
      imgUrl: files[index].trueUrl,
    })
  }

  handleModalShow = type => {
    this.setState({ [type]: true }) // tslint:disable-line
  }

  handleModalClose = type => {
    this.setState({ [type]: false }) // tslint:disable-line
  }

  onEnterQstPage = () => {
    const { onOK, history, action } = this.props
    const { title, content, files } = this.state

    action!.updateInfo(title, content, files)
    this.handleModalClose('confirmModal')

    history.push('/create?steps=question')
    onOK()
  }

  // handleSubmit = () => {
  //   const {
  //     title,
  //     content,
  //     file,
  //   } = this.props

  //   if (
  //     !title ||
  //     !content ||
  //     title.length > 20 ||
  //     content.length > 100 ||
  //   ) {
  //     // eslint-disable-line
  //     Toast.info('请检查以上字段', DELAY_TIME)
  //     return
  //   }

  //   // if (isLoading) {
  //   //   return;
  //   // }
  //   // this.setState({ isLoading: true });
  //   // Toast.info('正在提交', DELAY_TIME);
  //   this.bindActionCreators.submitCreateNotice({
  //     noticeData: {
  //       title,
  //       content,
  //       file,
  //       type: noticeType,
  //       receiver: {
  //         to_accounts: toAccounts,
  //         to_departments: toDepartments,
  //       },
  //       period,
  //       secret,
  //       show_author: showAuthor,
  //       questions: questions.map(qst => {
  //         const { options, type, required, title } = qst // eslint-disable-line
  //         return {
  //           options: options.map(opt => opt.value),
  //           type,
  //           required,
  //           title,
  //         }
  //       }),
  //       anonymous,
  //     },
  //     callback: this.handleModalShow,
  //   })
  // }

  render() {
    const { prefixCls } = this.props
    const {
      title,
      content,
      files,
      imgModal,
      imgUrl,
      confirmModal,
      // confirmProps,
    } = this.state

    return (
      <div className={prefixCls}>
        {renderSteps(0)}
        <div className={`${prefixCls}-main`}>
          <div className='content-title'>
            <div className='content-text'>标题</div>
            <InputItem
              placeholder='请输入标题'
              value={title}
              maxLength={20}
              onChange={this.handleTitleChange}
            />
          </div>
          <div className='content-options'>
            <div className='content-text'>内容</div>
            <div className='option-wrapper'>
              <TextareaItem
                placeholder='请输入内容（不超过80字）'
                value={content}
                autoHeight
                count={80}
                onChange={this.handleContentChange}
              />
            </div>
          </div>
          <div className='content-options'>
            <div className='content-text'>图片</div>
            <ImagePicker
              files={files}
              length={5}
              onImageClick={this.handleImgClick}
              // onAddImageClick={() }
              onChange={(newFiles, type, index) => this.setState({ files: newFiles })}
              multiple
            />
          </div>
          {/* <Picker fileId={file} onChangeFile={this.handleChangeFile} /> */}
          <Button
            type='primary'
            className='page-create-add-finish'
            disabled={!title || !content}
            onClick={() => this.handleModalShow('confirmModal')}
          >
            <div>
              添加完成
              <i
                className='fa fa-angle-right add-finish-icon'
                aria-hidden='true'
              />
            </div>
          </Button>
        </div>
        <Modal
          visible={imgModal}
          transparent
          onClose={() => this.handleModalClose('imgModal')}
          // animationType="fade"
          transitionName='am-zoom'
          className='img-modal'
          // wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <img src={imgUrl} alt='预览图片' />
        </Modal>
        <ConfirmModal
          visible={confirmModal}
          onCancel={() => this.handleModalClose('confirmModal')}
          title='你确定完成基本信息吗？'
          onOK={this.onEnterQstPage}
        />
      </div>
    )
  }
}

type injectorReturnType = ReturnType<typeof injector>

interface IProps extends Partial<injectorReturnType> {
  prefixCls?: string
  onOK: () => void
  onCancel: () => void
  history: { push: (path: string) => void }
}

interface IState extends Partial<injectorReturnType> {
  title: string
  content: string
  files: object[]
  imgModal: boolean
  imgUrl: string
  confirmModal: boolean
  // confirmProps: IConfirmProps
}

function injector({
  rootStore,
  rootAction,
}: {
  rootStore: IRootStore
  rootAction: IRootAction,
}) {
  return {
    store: rootStore.Create.infoStore,
    action: rootAction.Create.infoAction,
  }
}

export default withRouter(Info)
