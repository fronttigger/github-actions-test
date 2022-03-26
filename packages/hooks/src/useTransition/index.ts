import { useState, useCallback, useMemo } from 'react'

/**
 * @description
 * 비동기 함수 실행시 로딩 상태를 선언적으로 관리할 수 있도록 도와주는 훅
 * 
 * https://ko.reactjs.org/docs/concurrent-mode-patterns.html#adding-a-pending-indicator
 *
 * @returns
 *   pending: 비동기 작업이 로딩 상태
 *   startTransition: 비동기 함수
 *
 * @example
 * const [pending, startTransition] = useTransction();
 *
 * const handleSubmit = useCallback(() => {
 *   if (pending) { return }
 * 
 *   await startTransition(비동기함수());
 * }, [])
 * 
 */
function useTransition(): [boolean, <T>(promise: Promise<T>) => Promise<T>] {
    const [pending, setPending] = useState(false)

    const startTransition = useCallback(async <T>(promise: Promise<T>) => {
        try {
            setPending(true)
            const response = await promise

            return response
        } finally {
            setPending(false)
        }
    }, [])

    return useMemo(() => [pending, startTransition], [pending, startTransition])
}

export default useTransition