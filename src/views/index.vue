<template>
  <v-container grid-list-lg>
    {{ text }} <br />
    {{ text1 }} <br />
    {{ text2 }} <br />
    <DBInput type="number" v-model="text" mask="########-##-#-####" />
    <DBInput v-model="text1" maxlength="7" search readonly />
    <DBInput type="number" v-model="text1" maxlength="7" />
  </v-container>
</template>

<script>
export default {
  name: 'MyComponent',
  data() {
    return {
      text: '',
      text1: '',
      text2: ''
    }
  },
  watch: {
    text(val) {
      console.log('watch text', val)
      this.text2 = val
    }
  },
  methods: {
    keyupTest(e) {
      let val = e.target.value
      console.log('keyupTest ======>', val)
      val = val.replace(/[^\.|^0(0)+|^0-9\.]/g, '')
      this.text = val
    }
  },
  mounted() {
    let val = '2020-01-01'
    let val1 = 'edfsdfsdfsdf.vue'
    let val2 = 'dfgssrty.js'
    let val3 = '20200101'
    let val4 = '20.200.101'
    console.log('/[^0-9]/g,', val.replace(/[^0-9]/g, ''))
    console.log('/[^\.|^0(0)+|^0-9\.]/g', val4.replace(/[^\.|^0(0)+|^0-9\.]/g, ''))
    val = '234234234234234234'
    console.log('사업자번호하이픈테스트', val.replace(/([0-9]{3})([0-9]+)/, '$1-$2'))
    console.log('사업자번호하이픈테스트', val.replace(/([0-9]{3})([0-9]{2})([0-9]+)/, '$1-$2-$3'))
    console.log('주민번호마스킹', val.replace(/./g, '*'))
    console.log('숫자', /^[0-9]$/g.test(val))
    console.log('파일명1', val1.replace(/^\.\//, '').replace(/\.\w+$/, ''))
    console.log('파일명2', val2.replace(/(\.\/|\.js)/g, ''))
    console.log('사업자', val.match(/d{1}/g))
    console.log('comma', val.replace(/\B(?=(\d{3})+(?!\d))/g, ','))
    console.log('trim', val.replace(/^\s*/, ''))
    console.log('pattern 한글', val3, /^([^ㄱ-ㅎ|ㅏ-ㅣ|가-힣])+$/.test(val3))
    console.log(
      'pattern 날짜',
      val3,
      /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/.test(val3)
    )
  }
}
</script>
<style lang="scss" scoped></style>
