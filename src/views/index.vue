<template>
  <v-container grid-list-lg>
    <VueSlickCarousel v-bind="settings">
      <div><h1>1</h1></div>
      <div><h1>2</h1></div>
      <div><h1>3</h1></div>
      <div><h1>4</h1></div>
    </VueSlickCarousel>
  </v-container>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'

export default {
  name: 'MyComponent',
  components: { VueSlickCarousel },
  data() {
    return {
      settings: {
        dots: true,
        focusOnSelect: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        touchThreshold: 5
      }
    }
  },
  mounted() {
    /*let res = `<note>
<to>Tove</to>
<from>Jani</from>
<heading>Reminder</heading>
<body>Don't forget me this weekend!</body>
</note>`
    let jsonObj = this.$x2js.xml2js(res) //res (xml data)
    console.log(jsonObj)*/
    let val = '2020-01-01'
    let val1 = 'edfsdfsdfsdf.vue'
    let val2 = 'dfgssrty.js'
    let val3 = '20200101'
    console.log('/[^0-9]/g,', val.replace(/[^0-9]/g, ''))
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
    console.log('pattern 날짜', val3, /^(19|20)\d{2}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[0-1])$/.test(val3))
  }
}
</script>
<style lang="scss" scoped></style>
