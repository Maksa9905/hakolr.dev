'use client'

import { useSearchParams } from 'next/navigation'
import { useMemo, useCallback, useState, useRef, useEffect } from 'react'

export enum QueryParamType {
  STRING = 'string',
  NUMBER = 'number',
  ARRAY = 'array',
}

type QueryParam<T extends QueryParamType> = {
  type: T
  defaultValue: T extends QueryParamType.STRING
    ? string
    : T extends QueryParamType.NUMBER
    ? number
    : T extends QueryParamType.ARRAY
    ? string[]
    : number[]
}

type ParsedValue<T extends QueryParamType> = T extends QueryParamType.STRING
  ? string
  : T extends QueryParamType.NUMBER
  ? number
  : T extends QueryParamType.ARRAY
  ? string[]
  : never

type ParsedParams<T extends Record<string, QueryParam<QueryParamType>>> = {
  [K in keyof T]: ParsedValue<T[K]['type']>
}

export const useQueryParams = <
  T extends Record<string, QueryParam<QueryParamType>>,
>(
  schema: T,
): [ParsedParams<T>, (updates: Partial<ParsedParams<T>>) => void] => {
  const searchParams = useSearchParams()

  const [pendingUpdates, setPendingUpdates] = useState<Partial<
    ParsedParams<T>
  > | null>(null)
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current)
      }
    }
  }, [])

  const queryParams = useMemo(() => {
    const result = {} as ParsedParams<T>

    for (const [key, config] of Object.entries(schema)) {
      const value = searchParams.get(key)

      if (value === null) {
        result[key as keyof T] = config.defaultValue as ParsedParams<T>[keyof T]
        continue
      }

      switch (config.type) {
        case QueryParamType.STRING:
          result[key as keyof T] = value as ParsedParams<T>[keyof T]
          break
        case QueryParamType.NUMBER:
          const numberValue = Number(value)
          result[key as keyof T] = (
            isNaN(numberValue) ? config.defaultValue : numberValue
          ) as ParsedParams<T>[keyof T]
          break
        case QueryParamType.ARRAY:
          const allValues = searchParams.getAll(key)
          if (allValues.length > 1) {
            result[key as keyof T] = allValues as ParsedParams<T>[keyof T]
          } else {
            result[key as keyof T] = value
              .split(',')
              .filter(Boolean) as ParsedParams<T>[keyof T]
          }
          break
        default:
          result[key as keyof T] =
            config.defaultValue as ParsedParams<T>[keyof T]
      }
    }

    return result
  }, [searchParams, schema])

  const effectiveParams = useMemo(() => {
    if (!pendingUpdates) return queryParams

    return {
      ...queryParams,
      ...pendingUpdates,
    } as ParsedParams<T>
  }, [queryParams, pendingUpdates])

  useEffect(() => {
    if (pendingUpdates) {
      const allUpdatesApplied = Object.entries(pendingUpdates).every(
        ([key, value]) => {
          const currentValue = queryParams[key as keyof T]

          if (Array.isArray(value) && Array.isArray(currentValue)) {
            return (
              JSON.stringify(value.sort()) ===
              JSON.stringify(currentValue.sort())
            )
          }

          return currentValue === value
        },
      )

      if (allUpdatesApplied) {
        setPendingUpdates(null)
      }
    }
  }, [queryParams, pendingUpdates])

  const setQueryParams = useCallback(
    (updates: Partial<ParsedParams<T>>) => {
      setPendingUpdates((prev) => ({
        ...prev,
        ...updates,
      }))

      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current)
      }

      updateTimeoutRef.current = setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString())

        for (const [key, value] of Object.entries(updates)) {
          if (value === undefined || value === null) {
            params.delete(key)
            continue
          }

          const config = schema[key]
          if (!config) continue

          switch (config.type) {
            case QueryParamType.STRING:
              if (value === config.defaultValue) {
                params.delete(key)
              } else {
                params.set(key, String(value))
              }
              break
            case QueryParamType.NUMBER:
              if (value === config.defaultValue) {
                params.delete(key)
              } else {
                params.set(key, String(value))
              }
              break
            case QueryParamType.ARRAY:
              params.delete(key)
              const arrayValue = value as string[]
              if (
                arrayValue.length === 0 ||
                JSON.stringify(arrayValue) ===
                  JSON.stringify(config.defaultValue)
              ) {
              } else {
                arrayValue.forEach((item) => params.append(key, item))
              }
              break
          }
        }

        const url = params.toString()
          ? `${window.location.pathname}?${params.toString()}`
          : window.location.pathname

        window.history.replaceState(null, '', url)
      }, 100)
    },
    [searchParams, schema],
  )

  return [effectiveParams, setQueryParams]
}
