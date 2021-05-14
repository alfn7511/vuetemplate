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
    let res = `<note>
<to>Tove</to>
<from>Jani</from>
<heading>Reminder</heading>
<body>Don't forget me this weekend!</body>
</note>`
    let jsonObj = this.$x2js.xml2js(res) //res (xml data)
    console.log(jsonObj)
  }
}
</script>
<style lang="scss" scoped></style>
