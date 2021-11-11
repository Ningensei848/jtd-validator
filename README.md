# JSON Typed Definition Validator

![JSON Typed Definition Validator](https://storage.googleapis.com/zenn-user-upload/28c4a3872b4e44ea7e1d88ed.png)

See in [Vercel app](https://jtd-validator.vercel.app/) or [GitHub Pages](https://ningensei848.github.io/jtd-validator/)

# What is it ?

Online Validator for JSON Typed Definition (powered by [`jtd`](https://github.com/jsontypedef/json-typedef-js))

Built with [`Next.js`](https://nextjs.org/) + [`TypeScript`](https://www.typescriptlang.org/) + [`Mui`](https://mui.com/) + [`react-codemirror2`](https://github.com/scniro/react-codemirror2)

# How to use ?

1. Input your `schema` based on [JSON Typed Definition](https://jsontypedef.com/)
2. If your input is not correct, _"Invalid"_ will be displayed.
3. If your input is correct, _"Validated"_ will be displayed.

Note: JTD shema is derived from `JSON`, so the format needs to be recognised as standard `JSON`.

- If your input is correct but JS-object (probably without double quotes), _"Warning"_ will be displayed.

## Not implemented yet (future work)

- lint
- autocomplete
- error position display
- [codegen](https://jsontypedef.com/docs/typescript-codegen/) integration

# contribute

```bash
git clone https://github.com/Ningensei848/jtd-validator.git
cd jtd-validator
yarn install && yarn dev
```

# More info

- [Ajv × JTD で JSON の型定義とバリデータを同時に得る](https://zenn.dev/ningensei848/articles/getting-started-with-ajv-on-jtd)
- [５分で理解する JSON Type Definition](https://zenn.dev/ningensei848/articles/jtd-in-5-minutes)

# Licence

MIT

# Author

- K. Kubokawa ( [@Ningensei848](https://github.com/Ningensei848) )
- between jobs
- k.kubokawa@klis.tsukuba.ac.jp
