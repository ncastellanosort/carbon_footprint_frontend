<script setup>
import Start from '@/components/Start.vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import NavbarAuth from './authenticated/NavbarAuth.vue'
import { ref, onMounted } from 'vue'

const tieneToken = ref(false)

onMounted(() => {
  const token = localStorage.getItem('token')
  tieneToken.value = !!token
})

</script>

<template>
  <NavbarAuth v-if="tieneToken" />
  <Navbar v-else />
  <Start />
  <Footer />
</template>
