import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { ListView, PullToRefresh, WhiteSpace } from 'antd-mobile'
import ListViewItem from '../ListViewItem'
import { TYPE_OPTIONS, TIME_OPTIONS } from '../../common/global'
import { IList, IData } from '../../pages/Todo/stores/todoStore'
import { IRootStore, IRootAction } from '../../typings'

import './index.scss'

interface IDataSource {
  [key: string]: any
}

function parseDataToListView(dataList: IList[]) {
  const dataSource: IDataSource = {}
  const sectionIDs: string[] = []
  const rowIDs: string[][] = []

  dataList.forEach((list, i) => {
    const { section, data } = list
    const sectionName = `section${i}`

    sectionIDs.push(sectionName)
    dataSource[sectionName] = section
    rowIDs[i] = []

    for (let j = 0, len = data.length; j < len; j += 1) {
      const rowName = `S${i}-R${j}`
      rowIDs[i].push(rowName)
      dataSource[rowName] = data[j]
    }
  })

  return { dataSource, sectionIDs, rowIDs }
}

// function getSectionsOfDate(dataList: IList[]) {
//   return dataList.reduce((res, data) => {
//     const [year, month] = data.date.split('-')
//     if (!res[`${year}${month}`]) {
//       res[`${year}${month}`] = 0
//     }
//     res[`${year}${month}`] += 1
//     return res
//   }, {})
// }

@inject(injector)
@observer
export default class QaListView extends React.Component<IProps, IState> {
  static defaultProps = {
    prefixCls: 'component-qa-list-view',
  }

  constructor(props: IProps) {
    super(props)

    const origin = new ListView.DataSource({
      getRowData: (
        dataSource: IDataSource,
        _sectionID: string | number,
        rowID: string | number,
      ) => dataSource[rowID],
      getSectionHeaderData: (
        dataSource: IDataSource,
        sectionID: string | number,
      ) => dataSource[sectionID],
      rowHasChanged: (row1: IData, row2: IData) => row1 !== row2, // 当行数据放生变化时，只更新变化的行数据 cloneRows
      sectionHeaderHasChanged: (s1: string | number, s2: string | number) =>
        s1 !== s2,
    })

    this.state = { dataSource: origin, count: 0 }
  }

  componentWillReceiveProps(nextProps: IProps) {
    const { dataList, refreshing } = nextProps
    const { dataSource, count } = this.state
    const totalCount = dataList.reduce((sum, list) => sum + list.data.length, 0)
    // console.log(count, totalCount, loading, refreshing)

    if (totalCount && (count < totalCount || refreshing)) {
      // 获取新数据
      // totalCount && count < totalCount 加载下一页
      // totalCount && refreshing 刷新
      this.handleUpdateData(dataSource, dataList, totalCount)
    }
  }

  handleUpdateData = (origin: any, newData: IList[], totalCount: number) => {
    const { dataSource, sectionIDs, rowIDs } = parseDataToListView(newData)

    this.setState({
      dataSource: origin.cloneWithRowsAndSections(
        dataSource,
        sectionIDs,
        rowIDs,
      ),
      count: totalCount,
    })
  }

  renderSpace = (sectionID: string | number, rowID: string | number) => (
    <WhiteSpace
      key={`${sectionID}-${rowID}`}
      size='lg'
      style={{ background: '#F5F5F9' }}
    />
  )

  renderRow = (
    rowData: IData,
    _sectionID: string | number,
    rowID: string | number,
  ) => {
    const { onClick } = this.props
    const {
      _id: id,
      title,
      files,
      user: { name: author, avatar },
      date,
      type,
      content,
      expire,
      showAuthor,
      status,
    } = rowData

    const coverFile = files.find(f => !!f.cover)

    return (
      <ListViewItem
        key={rowID}
        title={title}
        content={`${content.slice(0, 20)}...`}
        cover={coverFile ? coverFile.url : ''}
        author={showAuthor ? author : '匿名'}
        avatar={showAuthor ? avatar : 'project-icon'}
        date={date}
        type={TYPE_OPTIONS.find(t => t.key === type)!.value}
        expire={TIME_OPTIONS.find(t => t.key === expire)!.value}
        status={status}
        onClick={(cover: string) => onClick(id, rowData, cover)}
      />
    )
  }

  render() {
    const {
      prefixCls,
      loading,
      onEndReached,
      refreshing,
      onRefresh,
      pageSize,
    } = this.props
    const { dataSource } = this.state

    return (
      <ListView
        className={prefixCls}
        dataSource={dataSource}
        renderFooter={() => (
          <React.Fragment>
            {loading ? '加载中...' : '没有更多数据'}
          </React.Fragment>
        )}
        renderSectionHeader={sectionData => (
          <React.Fragment>{sectionData}</React.Fragment>
        )}
        renderRow={this.renderRow}
        renderSeparator={this.renderSpace}
        pageSize={pageSize}
        scrollRenderAheadDistance={500}
        onEndReached={onEndReached}
        onEndReachedThreshold={10}
        pullToRefresh={
          <PullToRefresh refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    )
  }
}

type injectorReturnType = ReturnType<typeof injector>

interface IProps extends Partial<injectorReturnType> {
  prefixCls?: string
  dataList: IList[]
  loading: boolean
  onEndReached: (event: any) => void
  refreshing: boolean
  onRefresh: () => void
  onClick: (id: string, info: IData, cover: string) => void
  pageSize: number
}

interface IState extends Partial<injectorReturnType> {
  dataSource: object
  count: number
}

function injector({
  rootStore,
  rootAction,
}: {
  rootStore: IRootStore
  rootAction: IRootAction,
}) {
  return {}
}
