<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-6">
    <div class="max-w-3xl mx-auto">
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <!-- Encabezado con imagen -->
        <div class="relative h-48 bg-green-600">
          <img
            src="https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            alt="Paisaje natural" class="w-full h-full object-cover opacity-60" />
          <div class="absolute inset-0 flex items-center justify-center">
            <h1 class="text-4xl font-bold text-white text-center px-4">Tu Huella de Carbono</h1>
          </div>
        </div>

        <!-- resultados -->
        <div>
          <div v-if="data">
            <!-- Resultado total -->
            <div class="p-8 text-center">
              <div class="mb-6">
                <div class="text-7xl font-bold text-green-600">{{ huellaCarbono.toFixed(1) }}</div>
                <div class="text-xl text-gray-600 mt-2">toneladas de CO₂ al año</div>
              </div>
              <div class="inline-block px-4 py-2 rounded-full" :class="nivelColor">
                {{ nivelTexto }}
              </div>
              <p class="mt-6 text-gray-700 text-lg">
                {{ interpretacionResultado }}
              </p>
            </div>

            <!-- Línea divisoria -->
            <div class="h-1 bg-green-100"></div>

            <!-- Resultados encuestas -->
            <div class="p-8 bg-white-50">
              <h2 class="text-2xl font-bold mb-6 text-center text-green-800">Detalle de tus Respuestas</h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
                <!-- Energía -->
                <div class="bg-orange-50 shadow-sm rounded-xl p-5 border border-orange-100">
                  <h3 class="text-lg font-semibold text-orange-700 mb-3 flex items-center gap-2">
                    ⚡ Energía
                  </h3>
                  <ul class="space-y-1 pl-4 list-disc">
                    <li>Electrodomésticos: {{ data.energy.applianceHours }} h</li>
                    <li>Bombillos: {{ data.energy.lightBulbs }}</li>
                    <li>Cilindros de gas: {{ data.energy.gasTanks }}</li>
                    <li>Aire Acondicionado/Calefacción: {{ data.energy.hvacHours }} h</li>
                  </ul>
                </div>

                <!-- Alimentación -->
                <div class="bg-red-50 shadow-sm rounded-xl p-5 border border-red-100">
                  <h3 class="text-lg font-semibold text-red-700 mb-3 flex items-center gap-2">
                    🍽️ Alimentación
                  </h3>
                  <ul class="space-y-1 pl-4 list-disc">
                    <li>Carne roja: {{ data.food.redMeat }} porciones</li>
                    <li>Carne blanca: {{ data.food.whiteMeat }} porciones</li>
                    <li>Lácteos: {{ data.food.dairy }} porciones</li>
                    <li>Vegetariano: {{ data.food.vegetarian }} porciones</li>
                  </ul>
                </div>

                <!-- Transporte -->
                <div class="bg-yellow-50 shadow-sm rounded-xl p-5 border border-yellow-100">
                  <h3 class="text-lg font-semibold text-yellow-700 mb-3 flex items-center gap-2">
                    🚗 Transporte
                  </h3>
                  <ul class="space-y-1 pl-4 list-disc">
                    <li>Km en coche: {{ data.transport.carKm }}</li>
                    <li>Km en transporte público: {{ data.transport.publicKm }}</li>
                    <li>Vuelos domésticos: {{ data.transport.domesticFlights }}</li>
                    <li>Vuelos internacionales: {{ data.transport.internationalFlights }}</li>
                  </ul>
                </div>

                <!-- Residuos -->
                <div class="bg-blue-50 shadow-sm rounded-xl p-5 border border-blue-100">
                  <h3 class="text-lg font-semibold text-blue-700 mb-3 flex items-center gap-2">
                    ♻️ Residuos
                  </h3>
                  <ul class="space-y-1 pl-4 list-disc">
                    <li>Bolsas de basura: {{ data.waste.trashBags }}</li>
                    <li>Desperdicio de comida: {{ data.waste.foodWaste }}</li>
                    <li>Botellas plásticas: {{ data.waste.plasticBottles }}</li>
                    <li>Paquetes de papel: {{ data.waste.paperPackages }}</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Línea divisoria -->
            <div class="h-1 bg-green-100"></div>

            <!-- Gráfica y resumen -->
            <div class="p-8">
              <h2 class="text-2xl font-bold text-green-800 mb-6 text-center">Resumen de Resultados</h2>
              <ChartDisplay />
            </div>

            <!-- Línea divisoria -->
            <div class="h-1 bg-green-100"></div>

            <!-- Recomendaciones -->
            <div class="p-8">
              <h2 class="text-2xl font-bold text-green-800 mb-6 text-center">Recomendaciones Clave</h2>
              <div class="grid gap-4 md:grid-cols-2">
                <div v-for="(recomendacion, index) in recomendacionesSimples" :key="index"
                  class="p-4 bg-green-50 rounded-lg flex items-start gap-3">
                  <div class="flex-shrink-0 h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                    <span class="text-green-600 font-medium">{{ index + 1 }}</span>
                  </div>
                  <p class="text-gray-700">{{ recomendacion }}</p>
                </div>
              </div>
            </div>

            <!-- Botón volver -->
            <div class="p-8 bg-gray-50">
              <router-link to="/">
                <button @click="volverAlInicio"
                  class="w-full py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-medium">
                  Volver al inicio
                </button>
              </router-link>
              <p class="text-center text-gray-500 text-sm mt-4">
                Calcula tu huella de nuevo en unos meses para ver tu progreso
              </p>
            </div>
          </div>

          <!-- Cargando... -->
          <div v-else class="text-center text-gray-500 mt-[-50] text-xl">cargando...</div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ChartDisplay from './results_display/chart_display.vue'
import { getfakedata } from './results_display/results_from_calculator.js'

const data = ref(null);
const huellaCarbono = ref(0);

onMounted(async () => {
  const datos = await getfakedata();
  if (datos) {
    data.value = datos;
    huellaCarbono.value = datos.total;
  }
});

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

const recomendacionesSimples = [
  'Reduce el uso de electrodomésticos y apágalos cuando no los uses',
  'Utiliza transporte público o comparte coche cuando sea posible',
  'Separa correctamente tus residuos y reduce el uso de plásticos',
  'Consume productos locales y de temporada para reducir emisiones'
]

const volverAlInicio = () => {
  console.log('Volviendo al inicio...')
}
</script>
