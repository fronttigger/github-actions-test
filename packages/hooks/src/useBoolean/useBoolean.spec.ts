import { renderHook, act } from '@testing-library/react-hooks'

import useBoolean from '.'

describe('useBoolean', () => {
  it('기본 값 value false', () => {
    const { result } = renderHook(() => useBoolean())

    expect(result.current.value).toBeFalsy()
  })

  it('토글시 value true', () => {
    const { result } = renderHook(() => useBoolean())

    act(() => result.current.toggle())

    expect(result.current.value).toBeTruthy()
  })

  it('setFalse 함수 호출시 value false', () => {
    const { result } = renderHook(() => useBoolean())

    act(() => result.current.setFalse())

    expect(result.current.value).toBeFalsy()
  })

  it('setTrue 함수 호출시 value true', () => {
    const { result } = renderHook(() => useBoolean())

    act(() => result.current.setTrue())

    expect(result.current.value).toBeTruthy()
  })

  it('setValue 함수에 false 넘길시 value false', () => {
    const { result } = renderHook(() => useBoolean())

    act(() => result.current.setValue(false))

    expect(result.current.value).toBeFalsy()
  })

  it('setValue 함수에 true 넘길시 value true', () => {
    const { result } = renderHook(() => useBoolean())

    act(() => result.current.setValue(true))

    expect(result.current.value).toBeTruthy()
  })
})
