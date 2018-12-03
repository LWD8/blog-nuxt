/*
* 只在生成模式的客户端中使用
*/

if (process.env.NODE_ENV === 'production') {
  const copyText = () => {
    return [ '',
      '著作权归作者所有。',
      '商业转载请联系作者获得授权，非商业转载请注明出处。',
      '作者：凯迪Wen',
      '链接：' + location.href,
      '来源：https://liwendi.cn',
      ''
    ].join('\n')
  }

  // 拼接成html
  const buildText = content => {
    return content + copyText()
  }

  // 拼接成html
  const buildHtml = content => {
    return content + copyText()
  }
  console.log('aaaaaaaaaaaaaaaaaaaaaaaaaa')
  document.addEventListener('copy', e => {
    console.log(12312312313)
    if (!window.getSelection) return
    const content = window.getSelection().toString()
    e.clipboardData.setData('text/plain', buildText(content))
    e.clipboardData.setData('text/html', buildHtml(content))
    e.preventDefault()
  })
}
