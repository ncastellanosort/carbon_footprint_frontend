<template>
  <Navbar />
  <div class="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-6">
    <div class="max-w-3xl mx-auto">
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div class="relative h-48 bg-orange-600">
          <img
            src="https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            alt="Paisaje natural" class="w-full h-full object-cover opacity-60" />
          <div class="absolute inset-0 flex items-center justify-center">
            <h1 class="text-4xl font-bold text-white text-center px-4">Tu Huella de Carbono</h1>
          </div>
        </div>

        <div class="p-8 text-center">
          <div class="mb-6">
            <div class="text-7xl font-bold text-orange-600">{{ huellaCarbono.toFixed(1) }}</div>
            <div class="text-xl text-gray-600 mt-2">toneladas de CO₂ al año</div>
          </div>

          <div class="inline-block px-4 py-2 rounded-full" :class="nivelColor">
            {{ nivelTexto }}
          </div>

          <p class="mt-6 text-gray-700 text-lg">
            {{ interpretacionResultado }}
          </p>
        </div>
        <div class="h-1 bg-orange-100"></div>

        <div class="p-8">
          <h2 class="text-2xl font-bold text-orange-800 mb-6 text-center">Recomendaciones Clave</h2>

          <div class="grid gap-4 md:grid-cols-2">
            <div v-for="(recomendacion, index) in recomendacionesSimples" :key="index"
              class="p-4 bg-orange-50 rounded-lg flex items-start gap-3">
              <div class="flex-shrink-0 h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center mt-0.5">
                <span class="text-orange-600 font-medium">{{ index + 1 }}</span>
              </div>
              <p class="text-gray-700">{{ recomendacion }}</p>
            </div>
          </div>
        </div>

        <div class="p-8 bg-gray-50">
          <router-link to="/">

            <button @click="volverAlInicio"
              class="w-full py-4 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-lg font-medium">
              Volver al inicio
            </button>
          </router-link>

          <p class="text-center text-gray-500 text-sm mt-4">
            Calcula tu huella de nuevo en unos meses para ver tu progreso
          </p>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, computed } from 'vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

// Datos de ejemplo - en una aplicación real estos vendrían de los componentes anteriores
const huellaCarbono = ref(8.2)

// Nivel de impacto simplificado
const nivelTexto = computed(() => {
  if (huellaCarbono.value < 5) return 'Impacto Bajo'
  if (huellaCarbono.value < 8) return 'Impacto Moderado'
  if (huellaCarbono.value < 12) return 'Impacto Alto'
  return 'Impacto Muy Alto'
})

const nivelColor = computed(() => {
  if (huellaCarbono.value < 5) return 'bg-green-100 text-green-800'
  if (huellaCarbono.value < 8) return 'bg-yellow-100 text-yellow-800'
  if (huellaCarbono.value < 12) return 'bg-orange-100 text-orange-800'
  return 'bg-red-100 text-red-800'
})

// Interpretación del resultado simplificada
const interpretacionResultado = computed(() => {
  if (huellaCarbono.value < 5) {
    return '¡Felicidades! Tu impacto ambiental es bajo. Estás contribuyendo positivamente a la protección del planeta.'
  } else if (huellaCarbono.value < 8) {
    return 'Tu impacto ambiental es moderado. Con algunos ajustes en tus hábitos diarios, podrías reducirlo aún más.'
  } else if (huellaCarbono.value < 12) {
    return 'Tu impacto ambiental es considerable. Implementar las recomendaciones te ayudará a reducirlo significativamente.'
  } else {
    return 'Tu impacto ambiental es elevado. Es importante que consideres hacer cambios en tus hábitos para reducir tu huella.'
  }
})

// Recomendaciones simplificadas
const recomendacionesSimples = [
  'Reduce el uso de electrodomésticos y apágalos cuando no los uses',
  'Utiliza transporte público o comparte coche cuando sea posible',
  'Separa correctamente tus residuos y reduce el uso de plásticos',
  'Consume productos locales y de temporada para reducir emisiones'
]

// Función para volver al inicio
const volverAlInicio = () => {
  // En una aplicación real, aquí iría la navegación
  console.log('Volviendo al inicio...')
}
</script>

