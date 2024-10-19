'use client'

import { useState } from 'react'
import { ActionType } from '../actions'
import SendForm from './SendForm'
import SendOptions from './SendOptions'

interface SendTokenProps {
  setCurrent: (action: ActionType | null) => void
}
export default function SendToken({ setCurrent }: SendTokenProps) {
  const [typeOfSend, setTypeOfSend] = useState<'tiplink' | 'wallet' | null>(
    null,
  )

  return (
    <>
      {!typeOfSend ? (
        <SendOptions
          key="options"
          setTypeOfSend={setTypeOfSend}
          setCurrent={setCurrent}
        />
      ) : (
        <SendForm
          key="form"
          type={typeOfSend}
          onBack={() => setTypeOfSend(null)}
        />
      )}
    </>
  )
}
