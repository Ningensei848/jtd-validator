// CSS ---------------------------------------------------------------------
import 'codemirror/lib/codemirror.css'
import 'codemirror/addon/lint/lint.css'
// import 'codemirror/addon/hint/show-hint.css'

import 'codemirror/theme/material.css' // cf. https://codemirror.net/theme/
// -------------------------------------------------------------------------
// js modules --------------------------------------------------------------
import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/mode/javascript/javascript.js'
// lint ---------------------------------------------------
import 'codemirror/addon/lint/lint.js'
// import 'codemirror/addon/hint/javascript-hint.js'
// fold ---------------------------------------------------
// import 'codemirror/addon/fold/foldgutter'
// import 'codemirror/addon/fold/brace-fold'
// type definitions ---------------------------------------
import { EditorConfiguration } from 'codemirror'
// prettier -----------------------------------------------
import { format as prettier } from 'prettier/standalone'
import { Options as prettierOptions } from 'prettier'
import babelParser from 'prettier/parser-babel.js'
import React from 'react'
import { Box } from '@mui/material'
import { SxProps, Theme } from '@mui/system'

interface SchemaFormProps {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
}

const prettierOption: prettierOptions = { parser: 'json', plugins: [babelParser] }

const codeFormat = (editor: CodeMirror.Editor) => {
  try {
    const value = prettier(editor.getValue(), prettierOption)
    const { line, ch } = editor.getCursor() // prevent cursor position reflesh
    editor.setValue(value.trim())
    editor.setCursor({ line, ch }) // prevent cursor position reflesh
  } catch (e) {
    if (e instanceof Error) console.error(e.message)
    return
  }
}

const delay = 300
const codeMirrorOptions: EditorConfiguration = {
  theme: 'material',
  viewportMargin: Infinity, // cf. https://codemirror.net/demo/resize.html
  indentWithTabs: true,
  lineNumbers: true,
  autofocus: true,
  showCursorWhenSelecting: true,
  lint: {
    async: true,
    delay
  },
  gutters: ['CodeMirror-lint-markers'],
  cursorHeight: 0.85,
  mode: 'application/json',
  extraKeys: {
    'Ctrl-S': (editor: CodeMirror.Editor) => codeFormat(editor),
    'Cmd-S': (editor: CodeMirror.Editor) => codeFormat(editor)
  }
}

const SchemaForm: React.FC<SchemaFormProps> = ({ value, setValue }) => {
  // form 内のテキストの状態管理
  const [text, setText] = React.useState(value)
  // const [fontSize, setFontSize] = React.useState('1.0rem')
  // const [favariteFont, setFavFont] = React.useState("'Lucida Console'")
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setValue(text)
    }, delay)
    return () => {
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])

  const styleProps: SxProps<Theme> = {
    '.CodeMirror': {
      fontSize: '1.0rem',
      fontFamily: "'Lucida Console' !important" //`${favariteFont} !important` // [favariteFont, "'Courier New'", 'monospace']
    }
  }

  // TODO: user customize state: theme, tabSize,
  return (
    <Box sx={styleProps}>
      <CodeMirror
        value={text}
        options={codeMirrorOptions}
        // codemirror の初期化時に一回だけ呼ばれる処理
        editorDidMount={(editor) => {
          editor.setSize('100%', 'auto')
        }}
        // editor.code が更新されるたびに呼ばれる処理
        onBeforeChange={(_editor, _data, code) => {
          setText(code)
        }}
      />
    </Box>
  )
}

export default SchemaForm
