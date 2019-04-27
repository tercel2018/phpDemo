/*
 * @Author: 黄智强
 * @Date: 2018-02-10 17:45:06
 * @Last Modified by: 黄智强
 * @Last Modified time: 2018-12-08 10:19:05
 * @说明：文件上传组件
 */
const uploader = {
  elID: '',
  create(id, acceptArr) {
    this[this.elID] = WebUploader.create({
      // 选完文件后，是否自动上传。
      auto: true,
      // swf文件路径
      swf: '/static/webuploader/Uploader.swf',
      // 开启分片上传。
      chunked: true,
      // 分片大小 2M
      chunkSize: 2 * 1024 * 1024,
      // 某个分片由于网络问题出错，允许自动重传多少次
      chunkRetry: 5,
      // 图片接收服务端
      server: sessionStorage.uploadHost + 'upload/upload',
      // 选择文件的按钮
      pick: '#filePicker' + id,
      // 只允许选择图片文件
      accept: acceptArr,
      // 限制单个上传图片的大小 5M
      fileSingleSizeLimit: 5 * 1024 * 1024,
      // 在文件传输时提前把下一个文件准备好
      prepareNextFile: true,
      // 去重
      duplicate: true,
      // 配置生成缩略图的选项
      thumb: false
    })
  },
  fileQueued(imgArr) {
    this[this.elID].on('fileQueued', file => {
      this[this.elID].makeThumb(
        file,
        (error, src) => {
          if (error) return
          imgArr.file = file
          imgArr.src = src
        },
        1,
        1
      )
    })
  },
  getFiles() {
    return this.uploader.getFiles()
  },
  upload() {
    this.uploader.upload()
    console.log('图片上传了')
  },
  init(id, imgArr, acceptArr) {
    this.elID = 'uploader' + id
    // 初始化，创建uploader对象
    this.create(id, acceptArr)
    // 当有文件添加进来的时候，实现预览效果
    this.fileQueued(imgArr)
    // 检查文件大小或格式
    this[this.elID].on('error', file => {
      console.log('文件太大或格式不对')
    })
    // 文件上传成功
    this[this.elID].on('uploadSuccess', file => {
      console.log('上传成功')
    })
    // 文件上传失败
    this[this.elID].on('uploadError', file => {
      console.log('上传失败')
    })
    // 完成上传完了
    this[this.elID].on('uploadComplete', file => {
      console.log('上传完成')
    })
    return this[this.elID]
  }
}
const install = Vue => {
  if (install.installed) return
  install.installed = true
  Object.defineProperties(Vue.prototype, {
    $uploader: {
      get() {
        return uploader
      }
    }
  })
}

export default { install }
