<template>
  <v-text-field
    v-model="text"
    type="number"
    :pattern="getPattern"
    :mask="mask"
    :maxlength="maxlength"
    :readonly="readonly"
  >
    <template v-slot:append v-if="search">
      <v-btn>검색</v-btn>
    </template>
  </v-text-field>
</template>

<script>
export default {
  name: 'DBInput',
  props: {
    type: {
      type: String,
      default: 'text'
    },
    value: {
      type: [String, Number]
    },
    placeholder: {
      type: String,
      default: 'text'
    },
    search: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    mask: {
      type: String,
      default: ''
    },
    maxlength: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      text: ''
    }
  },
  computed: {
    getType() {
      let type = this.type
      if (this.mask) type = 'text'
      return type
    },
    getPattern() {
      if (this.type === 'number') {
        return '[0-9]*'
      } else {
        return false
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
