import { gfnTmsStr, CelloMessage } from '@/views/tms/TmsCommon.js'
import { security } from '@systems/utils/SecurityUtil'

const TmsCommonMixin = {
  data() {
    return {
      gridExpandableToggled: false,
      gridRefsThis: null,
      gridItemsChecked: false,
      clicks: 0,
      clickTimer: null,
      gridIsChecked: false,
      selectedRowCnt: 0
    }
  },
  watch: {
    // 팝업 열었을때  body scroll hidden 처리
    '$parent.isOpen': {
      handler(newValue) {
        if (newValue) {
          document.body.style.overflow = 'hidden'
        } else {
          document.body.style.overflow = 'inherit'
        }
      },
      deep: true
    }
  },
  methods: {
    requestTrans(url, data = {}, header = {}) {
      this.$log.debug(this.$options.name, ' | request', ' | url : ', url, ' | request header :', header, 'request data :', data)
      return new Promise((resolve, reject) => {
        CelloMessage.showLoading()
        this.requestTransaction(url, data, header)
          .then((res) => {
            this.$log.debug(this.$options.name, ' | response', ' | result :', res)
            if (header.responseType && header.responseType === 'blob') {
              if (res.status === 200) {
                this.$log.debug(this.$options.name, ' | response blob', ' | data :', res.data)
                resolve(res)
              } else {
                this.$message.alert('Error', res.statusText)
                reject(res)
              }
            } else {
              if (res.errorcode === 0) {
                this.$log.debug(this.$options.name, ' | response', ' | data :', res.data)
                resolve(res)
              } else {
                this.$log.debug(this.$options.name, ' | response', ' | errorcode :', res.errorcode, ' | errormsg :', res.errormsg)
                if (res.errormsg instanceof Object) {
                  /* 
                ERROR_CODE : {
                  SUCCESS : 0,
                  GENERAL : -1,
                  UNAUTHORIZED : -4,
                  NEED_ACCOUNT_UPDATE : -6,
                  PAGE_AJAX_UID_EXPIRED : -8,
                  SESSION_EXPIRED : -9
                },
                */
                  if (![-4, -6, -8, -9].includes(res.errorcode)) this.$message.alert('Error', this.$meta(res.errormsg.id, '', res.errormsg.args))
                } else {
                  this.$message.alert('Error', this.$meta(res.errormsg, res.errormsg))
                }
                reject(res)
              }
            }
            CelloMessage.hideLoading()
          })
          .catch((err) => {
            this.$log.debug(this.$options.name, 'err :', err)
            this.$message.alert('Error', err.message)
            reject(err)
            CelloMessage.hideLoading()
          })
      })
    },
    //requestTransactionSync
    async requestTransSync(url, data = {}, header = {}) {
      CelloMessage.showLoading()
      this.$log.debug('requestTransSync |', this.$options.name, ' | request ', '| url : ', url, ' | header : ', header, '| data :', data)
      return await this.requestTransaction(url, data, header)
        .then((res) => {
          CelloMessage.hideLoading()
          this.$log.debug(this.$options.name, ' | response | ', res)
          if (res.errorcode === 0) {
            this.$log.debug(this.$options.name, ' | response ', '| data :', res.data)
            return res
          } else {
            this.$log.debug(this.$options.name, ' | response ', '| errorcode :', res.errorcode, ' | errormsg :', res.errormsg)
            if (res.errormsg instanceof Object) {
              this.$message.alert('Error', this.$meta(res.errormsg.id, '', res.errormsg.args))
            } else {
              this.$message.alert('Error', this.$meta(res.errormsg, res.errormsg))
            }
            return false
          }
        })
        .catch((err) => {
          CelloMessage.hideLoading()
          this.$log.debug(this.$options.name, 'err :', err)
          this.$message.alert('Error', err.message)
          return false
        })
    },
    getGridData(el, params = {}) {
      // el.clearSort()
      // el.loadLocalData([])
      // el.$refs.__grid.clearFilter()
      let loadObj = el.noRange ? el.loadAll(params) : el.loadRange(params)
      CelloMessage.showLoading()
      //this.$log.debug(this.$options.name, 'ref :', el, el.grdId)
      this.$log.debug(this.$options.name, ` | ref: ${el.grdId}`, ` | noRange : `, el.noRange, ` | request :`, params)
      return new Promise((resolve, reject) => {
        loadObj
          .then((res) => {
            CelloMessage.hideLoading()
            if (res.errorcode === 0) {
              this.$log.debug(this.$options.name, ` | ref: ${el.grdId}`, ` | response :`, res.data)
              resolve(res)
            } else {
              this.$log.debug(this.$options.name, 'errorcode :', res.errorcode, ' | errormsg :', res.errormsg)
              if (res.errormsg instanceof Object) {
                this.$message.alert('Error', this.$meta(res.errormsg.id, '', res.errormsg.args))
              } else {
                this.$message.alert('Error', this.$meta(res.errormsg, res.errormsg))
              }
              reject(res)
            }
          })
          .catch((res) => {
            this.$log.debug(this.$options.name, 'err :', res)
            CelloMessage.hideLoading()
            if (res.errormsg instanceof Object) {
              this.$message.alert('Error', this.$meta(res.errormsg.id, '', res.errormsg.args))
            } else {
              this.$message.alert('Error', this.$meta(res.errormsg, res.errormsg))
            }
            reject(res)
          })
      })
    },
    saveGridData(el) {
      CelloMessage.showLoading()
      //this.$log.debug(this.$options.name, 'ref :', el, el.grdId)
      this.$log.debug(this.$options.name, ` | ref: ${el.grdId}`)
      return new Promise((resolve, reject) => {
        el.saveAll()
          .then((res) => {
            CelloMessage.hideLoading()
            this.$log.debug(this.$options.name, ` | ref: ${el.grdId}`, ` | response :`, res)
            if (res.errorcode === 0) {
              this.$log.debug(this.$options.name, ` | ref: ${el.grdId}`, ` | response data :`, res.data)
              resolve(res)
            } else {
              this.$log.debug(this.$options.name, 'errorcode :', res.errorcode, ' | errormsg :', res.errormsg)
              if (res.errormsg instanceof Object) {
                this.$message.alert('Error', this.$meta(res.errormsg.id, '', res.errormsg.args))
              } else {
                this.$message.alert('Error', this.$meta(res.errormsg, res.errormsg))
              }
              reject(res)
            }
          })
          .catch((res) => {
            this.$log.debug(this.$options.name, 'err :', res)
            CelloMessage.hideLoading()
            if (res.errormsg instanceof Object) {
              this.$message.alert('Error', this.$meta(res.errormsg.id, '', res.errormsg.args))
            } else {
              this.$message.alert('Error', this.$meta(res.errormsg, res.errormsg))
            }
            reject(res)
          })
      })
    },
    /**
     * 엑셀 파일 업로드
     * @param uploadFileList
     * @param serviceId
     * @param dataParam
     * @param callbackFn
     */
    async onExcelUpload(uploadFileList, serviceId, dataParam, callbackFn) {
      let fileUploadParam = { uploadFileList: uploadFileList, dataParam: dataParam }
      await this.requestTrans('/cello/tms/tms/service/' + serviceId, JSON.stringify(fileUploadParam))
        .then((res) => {
          callbackFn(res)
        })
        .catch(() => {})
    },
    async getDocIdbyTmpltAliasNm(aliasNm) {
      let res = await this.requestTransSync('/cello/adm/da/service/ADM_DA_02_008', {
        aliasNm: aliasNm
      })
      return res ? res.data : false
    },
    async onTemplateDownload(aliasNm) {
      let docId = await this.getDocIdbyTmpltAliasNm(aliasNm)
      if (docId) await this.$fileDownload(docId)
    },
    onExcelUploadGridPopup(arg) {
      let options = {
        title: arg.title,
        fullModal: true,
        size: 'auto',
        width: arg.width, // 임시로 고정
        height: arg.height // 임시로 고정
      }
      this.$openPopup(arg.url, options, {
        param: arg.data, // 검색 조건에 사용되는 Parameter
        callBackFnc: arg.callBackFnc // Popup  callBack Event
      })
    },

    openDriver(arg) {
      if (!arg.visible) {
        this.requestTrans('/cello/tms/tms/service/TMS_COM_CD_02', arg.param)
          .then((res) => {
            arg.callBackFnc(res.data.rows)
          })
          .catch(() => {})
      } else {
        this.$openPopup(
          '/tms/common/TmsComDriverP01',
          {
            width: 800
            // height: 735,
          },
          {
            popupTitle: gfnTmsStr.isEmptyObject(arg.title) ? 'Driver Search' : arg.title,
            visible: arg.visible,
            multiCheck: arg.multiCheck,
            param: arg.param, // 검색 조건에 사용되는 Parameter
            callBackFnc: arg.callBackFnc // Popup  callBack Event
          }
        )
      }
    },
    openVehicle(arg) {
      if (!arg.visible) {
        arg.param.isExcelYn = 'Y'
        this.requestTrans('/cello/tms/tms/service/TMS_COM_05_001', arg.param)
          .then((res) => {
            arg.callBackFnc(res.data.rows)
          })
          .catch(() => {})
      } else {
        this.$openPopup(
          '/tms/common/TmsComVhclP01',
          {
            width: 1000,
            height: 800
          },
          {
            popupTitle: gfnTmsStr.isEmptyObject(arg.title) ? 'Vehicle' : arg.title,
            visible: arg.visible,
            multiCheck: arg.multiCheck,
            param: arg.param, // 검색 조건에 사용되는 Parameter
            callBackFnc: arg.callBackFnc // Popup  callBack Event
          }
        )
      }
    },
    openExcelDownloadReason(arg) {
      this.$openPopup(
        '/tms/common/TmsExcelDownReasonP01',
        {
          title: 'Reason',
          width: 500,
          height: 280
        },
        {
          srchVo: arg.param,
          keyName: arg.keyName,
          keyList: arg.keyList,
          callBackFnc: arg.callBackFnc
        }
      )
    },
    async onExcelDown(url, parameter) {
      if (this.checkAllHide(parameter.headers)) {
        this.$message.alert('Alert', this.$meta('C00060', 'Please Check columns', ['columns']))
        return
      }
      console.log('onExcelDown reason', parameter.reason)
      await this.requestTrans(url, parameter, { responseType: 'blob' })
        .then(async (response) => {
          const type = response.data['type']
          if (type == 'application/json') {
            // let text = await new Response(response.data).text()
            // let result = JSON.parse(text)
          } else {
            const blob = new Blob([response.data], { type: type, encoding: 'UTF-8' })
            let fileName = security.base64.decode(response.headers['content-disposition']).split('filename=')[1]
            if (window.navigator.msSaveOrOpenBlob) {
              window.navigator.msSaveOrOpenBlob(blob, fileName)
            } else {
              const link = document.createElement('a')
              link.href = window.URL.createObjectURL(blob)
              link.download = security.base64.decode(response.headers['content-disposition']).split('filename=')[1]
              link.click()
            }
          }
        })
        .catch(() => {})
    },
    checkAllHide(headers) {
      if (!gfnTmsStr.isEmpty(headers)) {
        let check = JSON.parse(headers).some((columns) => columns.hide === false)
        let allHide = true
        if (check) allHide = false
        return allHide
      }
      return false
    },
    gridExpand(grd) {
      this.gridExpandableToggled = !this.gridExpandableToggled
      if (this.gridExpandableToggled) {
        grd.options.height += 310
      } else {
        grd.options.height -= 310
      }
    },
    gridCheckClick(ref) {
      this.gridRefsThis = this.getRef(ref)
      let checkedRows = this.gridRefsThis.getSelected()
      this.gridItemsChecked = checkedRows.length ? true : false
    },
    gridCheckedDel() {
      let checkedRows = this.gridRefsThis.getSelected()
      console.log('gridCheckedDel =====>', checkedRows)
      this.gridRefsThis.$refs.__grid.mx_removeRows(checkedRows)
      this.gridRefsThis.rowCount = this.gridRefsThis.getData().length
      this.gridRefsThis.resetSelect()
      this.gridItemsChecked = false
    },
    updateCount(ref) {
      this.gridRefsThis = this.getRef(ref)
      this.totalCnt = this.gridRefsThis.getData().length
      this.successCnt = this.gridRefsThis.getData().filter((item) => item.validYn).length
      this.failCnt = this.totalCnt - this.successCnt
    },
    openP13nPopup(ref) {
      this.getRef(ref).openP13nPopup()
    },
    onlyClick() {
      return new Promise((resolve) => {
        this.clicks++
        if (this.clicks === 1) {
          let _this = this
          this.clickTimer = setTimeout(() => {
            _this.clicks = 0
            resolve()
          }, 400)
        } else {
          clearTimeout(this.clickTimer)
          this.clicks = 0
        }
      })
    },
    initGridScroll(ref) {
      // console.log(ref)
      ref.$refs.__grid.mx_eventBus.$emit('scroll-adjust')
    }
  }
}

export default TmsCommonMixin
