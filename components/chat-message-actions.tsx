'use client'

import { type Message } from 'ai'

import { Button } from '@/components/ui/button'
import { IconCheck, IconCopy, IconThumbDown, IconThumbUp } from '@/components/ui/icons'
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard'
import { cn } from '@/lib/utils'

interface ChatMessageActionsProps extends React.ComponentProps<'div'> {
  messageId: string
  message: Message
}

export function ChatMessageActions({
  messageId,
  message,
  className,
  ...props
}: ChatMessageActionsProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })

  const onCopy = () => {
    if (isCopied) return
    copyToClipboard(message.content)
  }

  const sendFeedback = async (feedback: number) => {
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messageId: messageId,
          feedback: feedback,
        }),
      });
      const data = await response.json();
      console.log('Feedback sent:', data);
    } catch (error) {
      console.error('Error sending feedback:', error);
    }
  }
  return (
    <div
      className={cn(
        'flex items-center justify-end transition-opacity group-hover:opacity-100 md:absolute md:-right-10 md:-top-2 md:opacity-0',
        className
      )}
      {...props}
    >
      <Button variant="ghost" size="icon" onClick={onCopy}>
        {isCopied ? <IconCheck /> : <IconCopy />}
        <span className="sr-only">Copy message</span>
      </Button>
      <Button variant="ghost" size="icon" onClick={() => sendFeedback(1)}>
        <IconThumbUp />
        <span className="sr-only">Like</span>
      </Button>
      <Button variant="ghost" size="icon" onClick={() => sendFeedback(0)}>
        <IconThumbDown />
        <span className="sr-only">Dislike</span>
      </Button>
    </div>
  )
}
