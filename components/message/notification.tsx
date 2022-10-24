import React, { Component } from 'react'
import { createRoot } from 'react-dom/client'

import styled from 'styled-components'
import ToastMessage, { ToastMsgBaseProps } from './message'

const getTime = () => Date.now()
const getUuid = () =>
  `Id_${Math.random().toString(36).replace('.', '')}_${getTime()}`

const NotificationWrapper = styled.div`
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 8px;
  pointer-events: none;
`

class Notification extends Component<
  any,
  {
    notices: Array<ToastMsgBaseProps & { noticeKey: string }>
  }
> {
  static newInstance: (
    properties: any,
    callback: (instance: Notification) => void
  ) => void

  constructor(props: any) {
    super(props)
    this.state = {
      notices: [],
    }
  }

  add = (newNotice: ToastMsgBaseProps) => {
    const noticeKey = getUuid()
    this.setState({
      notices: [...this.state.notices, { ...newNotice, noticeKey }],
    })
  }

  remove = (noticeKey: string) => {
    const updatedNotices = this.state.notices.filter(
      (notice) => notice.noticeKey !== noticeKey
    )
    this.setState({ notices: updatedNotices })
  }

  render() {
    return (
      <NotificationWrapper>
        {this.state.notices.map((notice) => (
          <ToastMessage
            {...notice}
            key={notice.noticeKey}
            onClose={this.remove}
          />
        ))}
      </NotificationWrapper>
    )
  }
}

export default Notification

Notification.newInstance = (props, callback) => {
  let called = false
  // Ref function is used to set the instance of Notification Component
  const ref = (notificationInstance: Notification) => {
    if (called) return
    called = true
    callback(notificationInstance)
  }

  const host = document.createElement('div')
  host.setAttribute('id', 'notification')

  document.body.appendChild(host)

  // Mount host to the div element that was created
  const root = createRoot(host)
  root.render(<Notification {...props} ref={ref} />)
}
