<template>
  <div class="home">
    <GetStarted title="Hola mi amigo!" message="Welcome to El Gato Blanco: The premier tapas restaurant in town." />
  </div>
</template>

<script lang="ts">
import GetStarted from '@/components/get-started.vue'; // @ is an alias to /src

export default {
  components: {
    GetStarted,
  },
}
</script>
