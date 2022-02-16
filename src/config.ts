// 【魚拓】Next.js の public 以下のファイルのパスを正しく扱う｜まくろぐ
// cf. https://megalodon.jp/2021-1111-1614-37/https://maku.blog:443/p/xjjbwes/

import getConfig from 'next/config'

/**
 * public ディレクトリ以下に配置したファイルを参照するための URL を取得します。
 *
 * 例: url('/img/sample.png') => /reponame/img/sample.png
 *
 * next.config.js の publicRuntimeConfig.urlPrefix プロパティで指定した文字列が、
 * filename 引数で指定された文字列のプレフィックスとして付加されます。
 * 例えば Web サイトを GitHub Pages のプロジェクトページなどで公開する場合、
 *
 *   https://username.github.io/reponame/
 *
 * のように、URL のドメイン直下がアプリのルートにならないため、
 * この URL 補正のために必要です。
 *
 * @see https://maku.blog/p/xjjbwes
 */

export function url(filename: string): string {
  const { publicRuntimeConfig } = getConfig() as {
    publicRuntimeConfig: { assetPrefix: string }
  }
  return publicRuntimeConfig.assetPrefix + filename
}
