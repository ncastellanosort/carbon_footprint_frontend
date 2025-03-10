<script setup>
import Transport from '@/components/areas/Transport.vue'
import Food from '@/components/areas/Food.vue'
import Energy from '@/components/areas/Energy.vue'
import Waste from '@/components/areas/Waste.vue'
</script>

<template>
  <section class="bg-gradient-to-r from-green-100 to-blue-100 min-h-screen flex items-center justify-center p-6">
    <div class="max-w-3xl w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
      <h2 class="text-3xl font-bold text-center text-gray-700 mb-6">🌱 Calculadora de Huella de Carbono</h2>
      <div class="space-y-6" id="send_form">
        <Transport />
        <Food />
        <Energy />
        <Waste />
      </div>
    </div>
  </section>
</template>
