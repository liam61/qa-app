export type msgType = 'text' | 'emoji' | 'file'

export interface IMessage {
  _id?: string
  from: string
  to: string
  content: string
  type: msgType
  createdAt?: string
}
