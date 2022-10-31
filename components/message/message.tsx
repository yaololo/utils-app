import React, { useEffect } from 'react'

import { Container, ContentWrapper } from './styles'

const VARIANTS = {
  success: {
    color: 'green',
  },

  error: {
    color: 'red',
  },
}

export interface ToastMsgBaseProps {
  variant?: keyof typeof VARIANTS
  message: string | React.ReactNode
  duration?: number
}

interface IToastMessageProps extends ToastMsgBaseProps {
  noticeKey: string
  onClose: (key: string) => void
}

const ToastMessage = (props: IToastMessageProps) => {
  const {
    variant = 'success',
    message,
    noticeKey,
    onClose,
    duration = 5,
  } = props

  const color = VARIANTS[variant].color

  let closeTimer: number | null

  const startTimer = () => {
    closeTimer = window.setTimeout(() => {
      close()
    }, duration * 1000)
  }

  const clearCloseTimer = () => {
    if (closeTimer) {
      clearTimeout(closeTimer)
      closeTimer = null
    }
  }

  const close = (e?: React.MouseEvent<HTMLAnchorElement>) => {
    if (e) {
      e.stopPropagation()
    }
    clearCloseTimer()
    onClose(noticeKey)
  }

  useEffect(() => {
    if (closeTimer) {
      clearCloseTimer()
    }

    startTimer()

    return () => clearCloseTimer()
  }, [])

  return (
    <Container color={color}>
      <ContentWrapper>
        <div
          style={{ color, fontSize: '14px', fontWeight: 'bold', width: '100%' }}
          aria-description="message"
        >
          {message}
        </div>
      </ContentWrapper>
    </Container>
  )
}

export default ToastMessage
