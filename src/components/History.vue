<template>

  <NavbarAuth />

  <div class="min-h-screen bg-gradient-to-b from-green-50 to-green-100">

    <main class="container mx-auto px-4 py-12 space-y-12">

      <!-- Título + Resumen -->
      <section class="text-center">
        <h1 class="text-4xl font-bold text-green-800 mb-6">Historial</h1>

        <div class="bg-white rounded-lg shadow-md p-6 max-w-5xl mx-auto">
          <h2 class="text-left text-sm font-medium text-gray-700 mb-4">Resumen</h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div class="bg-green-100 p-4 rounded-md">
              <p class="text-sm text-gray-600">Total de emisiones</p>
              <p class="text-xl font-semibold text-green-800">{{ totalEmisiones.toFixed(1) }} kg CO₂</p>
            </div>
            <div class="bg-green-100 p-4 rounded-md">
              <p class="text-sm text-gray-600">Promedio Mensual</p>
              <p class="text-xl font-semibold text-green-800">{{ promedioMensual }} kg CO₂</p>
            </div>
            <div class="bg-green-100 p-4 rounded-md">
              <p class="text-sm text-gray-600">Cálculos Realizados</p>
              <p class="text-xl font-semibold text-green-800">{{ cantidadCalculos }}</p>
            </div>
          </div>
        </div>
      </section>




      <!-- Cards -->
      <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="calculo in historial" :key="calculo.calculoId"
          class="bg-white rounded-xl shadow-md p-6 w-full transform transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in-up">
          <h2 class="text-lg font-semibold text-gray-800 mb-1">Cálculo {{ calculo.calculoId }}</h2>
          <p class="text-sm text-gray-500 mb-3">
            {{ new Date(calculo.fecha).toLocaleString('es-ES', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            }) }}
          </p>

          <span class="inline-block bg-purple-200 text-purple-700 text-sm font-medium px-3 py-1 rounded-full mb-4">
            Consumo
          </span>

          <p class="text-3xl font-bold text-green-700 mb-4">
            {{ calculo.totalGeneral }} kg CO₂
          </p>

          <div class="border-t pt-3 flex justify-between text-sm text-green-700 font-medium">
            <a href="#" class="hover:underline">Ver detalles</a>
          </div>
        </div>
      </section>

    </main>


  </div>
  <Footer />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import NavbarAuth from "./authenticated/NavbarAuth.vue"
import Footer from '@/components/Footer.vue'

import axiosHistory from "../services/HistoryService"

const historial = ref([])

const obtenerHistorial = () => {
  axiosHistory.get('/history')
    .then(res => {
      historial.value = res.data
      console.log(historial.value)
    })
    .catch(err => {
      console.error("Error obteniendo historial:", err)
    })
}

onMounted(() => {
  obtenerHistorial()
})

// Total de emisiones
const totalEmisiones = computed(() =>
  historial.value.reduce((acc, calc) => acc + calc.totalGeneral, 0)
)

// Cálculos realizados
const cantidadCalculos = computed(() => historial.value.length)

// Promedio mensual (agrupando por mes y año)
const promedioMensual = computed(() => {
  if (historial.value.length === 0) return 0

  const emisionesPorMes = {}

  historial.value.forEach(calc => {
    const fecha = new Date(calc.fecha)
    const claveMes = `${fecha.getFullYear()}-${fecha.getMonth() + 1}`

    if (!emisionesPorMes[claveMes]) {
      emisionesPorMes[claveMes] = 0
    }
    emisionesPorMes[claveMes] += calc.totalGeneral
  })

  const totalMeses = Object.keys(emisionesPorMes).length
  const totalEmisiones = Object.values(emisionesPorMes).reduce((a, b) => a + b, 0)

  return totalMeses > 0 ? (totalEmisiones / totalMeses).toFixed(1) : 0
})
</script>


<style>
@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.5s ease-out both;
}
</style>