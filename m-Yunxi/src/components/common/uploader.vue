/*
 * @Author: 陈航
 * @Date: 2018-12-8 9:20:55
 * @Last Modified by: 陈航
 * @说明：上传图片/文件组件
 */
<style lang="less" scoped>
.flexUi(@justify:flex-start,@align:center) {
  display: flex;
  align-items: @align;
  justify-content: @justify;
}
</style>
<template>
  <div class="uploader-wrapper">
    <template v-if="uploaderType && uploaderType==='file'">
      <div :id="'filePicker'+id" class="filePicker-file">选择文件</div>
    </template>
    <template v-else>
      <div :id="'filePicker'+id" class="filePicker-image">{{layout && layout==='normal'?'选择图片':''}}</div>
    </template>
  </div>
</template>
<script>
export default {
  props: [ 'id', 'uploaderType', 'filePath', 'layout' ],
  data() {
    return {
      // 上传的图片预览数据
      imgArr: {
        src: '',
        file: ''
      },
      // webuploader初始化对象
      uploader: null,
      // 是否上传失败
      isUploadError: false
    }
  },
  methods: {
    // 初始化图片上传
    initWebUploader() {
      // 调用插件里面的初始化
      let acceptArr = { title: 'Image', extensions: 'jpg,jpeg,png,bmp', mimeTypes: '.jpg,.jpeg,.png,.bmp' }
      if (this.uploaderType === 'file') {
        acceptArr = { title: 'file', extensions: 'rar,zip', mimeTypes: '.rar,.zip' }
      }
      this.uploader = this.$uploader.init(this.id, this.imgArr, acceptArr)
      // 捕获上传文件太大和格式不正确的错误
      this.uploader.on('error', type => {
        if (type === 'F_EXCEED_SIZE') {
          if (this.uploaderType === 'file') {
            this.$toast('文件太大，请选择小于5M的文件')
          } else {
            this.$toast('图片太大，请选择小于5M的图片')
          }
        } else if (type === 'Q_TYPE_DENIED') {
          if (this.uploaderType === 'file') {
            this.$toast('文件格式错误，请选择格式为zip或rar的文件')
          } else {
            this.$toast('图片格式错误，请选择格式为jpg，jpeg，png或bmp的图片')
          }
        }
      })
      // 上传成功
      this.uploader.on('uploadSuccess', (file, { data: { filePath } }) => {
        this.$toast('上传成功')
        this.$emit('update:filePath', filePath)
      })
      // 上传失败
      this.uploader.on('uploadError', (file, { data: { filePath } }) => {
        this.$toast('上传失败')
        this.$emit('update:filePath', 'upload-image-or-file-error')
      })
    },
    // 删除上传的图片
    deleteImg() {
      this.imgArr.src = ''
      this.$fetch.fileDelete({ filePath: this.filePath })
      if (this.uploader.getStats().successNum) this.uploader.removeFile(this.imgArr.file, true)
      this.$emit('update:filePath', '')
    }
  },
  watch: {
    filePath(val) {
      if (val === 'upload-image-or-file-error') {
        this.isUploadError = true
      } else {
        if (val !== this.imgArr.src) {
          this.imgArr.src = sessionStorage.uploadHost + val
        }
        this.isUploadError = false
      }
    }
  },
  activated() {
    this.initWebUploader()
    if (this.filePath) this.imgArr.src = sessionStorage.uploadHost + this.filePath
  }
}
</script>
