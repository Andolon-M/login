<script setup>
import { ref } from 'vue'

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">Iniciar con Google {{ count }}</button>
    <p>
      This is the login component.
      
    </p>
  </div>

  
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
