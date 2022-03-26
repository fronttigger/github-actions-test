import { Dispatch, SetStateAction, useState } from 'react'

interface ReturnType {
  value: boolean
  setValue: Dispatch<SetStateAction<boolean>>
  setTrue: () => void
  setFalse: () => void
  toggle: () => void
}

// 불리언 타입을 다룰 수 있는 커스텀 훅
function useBoolean(defaultValue?: boolean): ReturnType {
  const [value, setValue] = useState(!!defaultValue)

  const setTrue = () => setValue(true)
  const setFalse = () => setValue(false)
  const toggle = () => setValue((value) => !value)

  return { value, setValue, setTrue, setFalse, toggle }
}

export default useBoolean
