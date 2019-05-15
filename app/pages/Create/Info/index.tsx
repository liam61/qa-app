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
import { IFile } from '../interface'

import './index.scss'

@inject(injector)
@observer
class Info extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'page-create-info',
  }

  constructor(props: IProps) {
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

  handleTitleChange = (val: string | undefined = '') => {
    this.setState({ title: val })
  }

  handleContentChange = (val: string | undefined = '') => {
    this.setState({ content: val })
  }

  // handleChangeFile = (fileId, type) => {
  //   this.setState({ files: fileId })
  // }

  handleImgClick = (
    index: number | undefined = 0,
    files: IFile[] | undefined = [],
  ) => {
    console.log(index, files)
    this.setState({
      imgUrl: files[index].url,
      imgModal: true,
    })
  }

  handleModalShow = (type: string) => {
    this.setState({ [type]: true }) // tslint:disable-line
  }

  handleModalClose = (type: string) => {
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
              className='qa-input-item'
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
              className='qa-image-picker'
              files={files}
              length='5'
              onImageClick={this.handleImgClick}
              onChange={(newFiles, type, index) =>
                this.setState({ files: newFiles as IFile[] })
              }
              multiple
              selectable={files.length < 5}
            />
          </div>
          {/* <Picker fileId={file} onChangeFile={this.handleChangeFile} /> */}
          <Button
            type='primary'
            className='qa-btn-bottom'
            disabled={!title || !content}
            onClick={() => this.handleModalShow('confirmModal')}
          >
            添加完成
            <i
              className='fa fa-angle-right btn-bottom-icon'
              aria-hidden='true'
            />
          </Button>
        </div>
        <Modal
          visible={imgModal}
          transparent
          onClose={() => this.handleModalClose('imgModal')}
          // animationType="fade"
          transitionName='am-zoom'
          className='qa-img-modal'
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
  files: IFile[]
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
