<template>
  <div v-if="generated">

    <h2>Организация</h2>

    <p>{{ generated.organization[1] }}</p>

    <h2>Поля</h2>

    <div
      v-for="field in generated.fields"
      :key="field.code"
    >
        <p>{{ field.name }}</p>
        <p>{{ field.group }}</p>
        <p>{{ field.area }}</p>
    </div>

  </div>
</template>

<script>
export default {
    computed: {
        generated() {
            return this.$store.state.generator.data
        }
    },

    async mounted() {
        await this.$store.dispatch("generator/loadData")
    }
}
</script>