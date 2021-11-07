// import Ajv from 'ajv/dist/jtd'
import { isSchema, isValidSchema } from 'jtd'
import json5 from 'json5'
import React from 'react'

/*
1. 入力された値を JSON.parse() する
2.1. エラーが出なければ次の手順へ進む
2.2. エラーが出た場合，入力値を JSON5 で無理やり JavaScript Object として読み込み，Warning を出す
3. JavaScript Object を ajv.compile() する
4. エラーが出るかどうかで判定する
*/

type status = 'OK' | 'WARNING' | 'ERROR'
type result = {
  isValidSchema: boolean
  status: status
  message: string
}

const FAILURE = {
  isValidSchema: false,
  status: 'ERROR',
  message: 'Input value nether has JSON string nor JavaScript Object .'
}

// const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

// const varidationConfig: ValidationConfig = {
//   maxDepth: 32,
//   maxErrors: 1
// }

export const isValidated = (schema: unknown) => {
  if (!isSchema(schema) || !isValidSchema(schema)) {
    return false
  } else {
    return true
  }
}

// cf. https://github.com/jsontypedef/json-typedef-js#advanced-usage-handling-untrusted-schemas
// const validateUntrusted = (schema: unknown, data: unknown): boolean => {
//   if (!isSchema(schema) || !isValidSchema(schema)) {
//     throw new Error('invalid schema')
//   }

//   // You should tune maxDepth to be high enough that most legitimate schemas
//   // evaluate without errors, but low enough that an attacker cannot cause a
//   // denial of service attack.
//   return validate(schema, data, varidationConfig).length === 0
// }

// const pattern_mustache = /^{[^]*}$/g  // TODO: format のタイミングで適用

const convertToJson = (value: string) => {
  const trimValue = value.trim()

  try {
    return {
      schema: JSON.parse(trimValue),
      status: 'OK',
      message: 'Input value has standard JSON syntax .'
    }
  } catch (e) {
    if (e instanceof Error) {
      console.warn(
        `[JSON.parse() is failed, so we use JSON5 alternatively] ${e.name}: ${e.message}`
      )
    }
    return {
      schema: json5.parse(trimValue),
      status: 'WARNING',
      message:
        'Input value does not have standard JSON syntax, but `relaxed` one (cf. http://relaxedjson.org ).'
    }
  }
}

export default function JTDValidator(value: string | Object): result {
  const elem: { schema: any; status: status; message: string } = {
    schema: {},
    status: 'OK',
    message: 'Input value has been validated .'
  }

  // args validation -----------------------------------------------------------------------
  if (typeof value === 'string') {
    try {
      const res = convertToJson(value)
      Object.assign(elem, res)
    } catch (e) {
      if (e instanceof Error) {
        console.error(`${e.name}: ${e.message}`)
        // FAILURE.message = e.message
      }
      return FAILURE as result
    }
  } else if (Object.prototype.toString.call(value).slice(8, -1).toLowerCase() == 'object') {
    // cf. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString#using_tostring_to_detect_object_class
    elem.schema = { ...value }
  } else {
    console.error('value is neather string nor JSON Object')
    return FAILURE as result
  }
  // ---------------------------------------------------------------------------------------
  // schema validation ---------------------------------------------------------------------
  if (!isValidated(elem.schema)) {
    return {
      isValidSchema: false,
      status: 'ERROR',
      message: 'Accepted JSON, but invalid JTD syntax detected .'
    }
  } else {
    return { isValidSchema: true, status: elem.status, message: elem.message }
  }
  // ---------------------------------------------------------------------------------------
}

const delay = 850 // mili seconds
export const useJTDValidation = (value: string): result => {
  // debounce の対象 state と setter
  const [debouncedValue, setDebouncedValue] = React.useState(JTDValidator(value))

  React.useEffect(() => {
    // delay 後 debounce の対象 state をアップデート
    const timer = setTimeout(() => {
      setDebouncedValue(JTDValidator(value))
    }, delay)

    // 次の effect が実行される直前に timer キャンセル
    return () => {
      clearTimeout(timer)
    }

    // value、delay がアップデートするたびに effect 実行
  }, [value])

  // 最終的にアップデートされた state をリターン
  return debouncedValue
}
