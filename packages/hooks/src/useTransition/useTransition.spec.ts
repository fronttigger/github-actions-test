import { renderHook, act } from '@testing-library/react-hooks'
import useTransition from '.'

const MOCK_FN = async () => {
  result: 'success'
}
const MOCK_FAIL_FN = () => Promise.reject(new Error('sample error'))

describe('useTransition', () => {
  it('기본 값 pending false', () => {
    const { result } = renderHook(() => useTransition())

    expect(result.current[0]).toBeFalsy()
  })
  it('요청시 pending true', async () => {
    const { result } = renderHook(() => useTransition())

    let promise: ReturnType<typeof MOCK_FN>

    act(() => {
      promise = result.current[1](MOCK_FN())
    })

    expect(result.current[0]).toBeTruthy()

    await act(async () => {
      await promise
    })
  })
  it('요청 실패시 pending false', async () => {
    const { result } = renderHook(() => useTransition())

    await act(async () => {
      await result.current[1](MOCK_FAIL_FN()).catch(() => {})
    })

    expect(result.current[0]).toBeFalsy()
  })
})
