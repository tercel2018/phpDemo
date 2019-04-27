/*
 * @Author: 陈航
 * @Date: 2018-12-21 14:57:33
 * @Last Modified by: 陈航
 * @Last Modified time: 2018-12-21 15:43:19
 * @Desc: 部分css、js延迟加载
 */

// 根据需求生成对应资源
var sourceReduceDOM = (function () {
  var reduceArray = []
  return {
    add: function(type, fn) {
      if (arguments.length >=2 && typeof reduceArray[type] === 'undefined' && typeof fn === 'function') {
        reduceArray[type] = fn
      }
    },
    reduce: function(type, args) {
      if (arguments.length !==2 || typeof args !== 'object' || !(args instanceof Object)) return
      var source = {
        'url': args['url'] || [],
        'parent': args['parent'] || 'body'
      }
      reduceArray[type] && reduceArray[type].call(this, source)
    }
  }
})()
// 加入css资源生成规则
sourceReduceDOM.add('css', function(source) {
  if (!source['url'].length) return
  var fragment = document.createDocumentFragment()
  var parent = document.querySelector(source['parent'])
  for (var idx = 0; idx < source['url'].length; idx++) {
    var _dom = fragment.appendChild(document.createElement('link'))
    _dom.setAttribute('rel', 'stylesheet')
    _dom.setAttribute('href', source['url'][idx])
  }
  if (parent) {
    parent.appendChild(fragment)
  }
})
// 加入js资源生成规则
sourceReduceDOM.add('js', function(source) {
  if (!source['url'].length) return
  var fragment = document.createDocumentFragment()
  var parent = document.querySelector(source['parent'])
  for (var idx = 0; idx < source['url'].length; idx++) {
    var _dom = fragment.appendChild(document.createElement('script'))
    _dom.setAttribute('type', 'text/javascript')
    _dom.setAttribute('src', source['url'][idx])
  }
  if (parent) {
    parent.appendChild(fragment)
  }
})

// 需要延迟加载的资源, 数据结构 Array:[{'type' => type, 'url' => Array, 'parent' => parent}]
var global_source = [
  {'type':'css', 'source': {'url': ['/static/css/webuploader.css'], 'parent': 'head'}},
  {
    'type':'js',
    'source': {
      'url': [
        '/static/js/webuploader.min.js',
        '/static/js/NativeShare.js',
        '/static/js/clipboard.min.js'
      ], 
      'parent': 'body'
    }
  }
]
for (var _source_index = 0; _source_index < global_source.length; _source_index++) {
  sourceReduceDOM.reduce(global_source[_source_index]['type'], global_source[_source_index]['source'])
}