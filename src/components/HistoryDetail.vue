<template>
  <Navbar />
  <div class="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden">

    
          <!-- Contenido exportable -->
          <div id="contenido-exportable">
            <!-- Encabezado con imagen -->
            <div class="relative h-48 bg-green-600">
              <img :src="result_image" alt="Paisaje natural" class="w-full h-full object-cover opacity-60" />
              <div class="absolute inset-0 flex items-center justify-center">
                <h1 class="text-4xl font-bold text-white text-center px-4">
                  Tu Huella de Carbono
                </h1>
              </div>
            </div>

            <!-- Resultado total -->
            <div class="p-8 text-center">
              <div class="mb-6">
                <div class="text-7xl font-bold text-green-600">
                  {{ huellaCarbono.toFixed(1) }}
                </div>
                <div class="text-xl text-gray-600 mt-2">
                  toneladas de CO₂ al año
                </div>
              </div>
              <div class="inline-block px-4 py-2 rounded-full" :class="nivelColor">
                {{ nivelTexto }}
              </div>
              <p class="mt-6 text-gray-700 text-lg">
                {{ interpretacionResultado }}
              </p>
            </div>

            <div class="h-1 bg-green-100"></div>

            <!-- Detalle y gráfico -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
              <!-- Detalle encuestas -->
              <div>
                <h2 class="text-2xl font-bold mb-6 text-green-800 text-center">
                  Detalle de tus Respuestas
                </h2>
                <div class="grid grid-cols-1 gap-6 text-gray-700">
                  <!-- Energía -->
                  <div class="bg-orange-50 shadow-sm rounded-xl p-5 border border-orange-100">
                    <h3 class="text-lg font-semibold text-orange-700 mb-3">⚡ Energía</h3>
                    <ul class="space-y-1 pl-4 list-disc">
                      <li>Electrodomésticos: {{ data.energy.applianceHours }} h</li>
                      <li>Bombillos: {{ data.energy.lightBulbs }}</li>
                      <li>Cilindros de gas: {{ data.energy.gasTanks }}</li>
                      <li>Aire Acondicionado/Calefacción: {{ data.energy.hvacHours }} h</li>
                    </ul>
                  </div>

                  <!-- Alimentación -->
                  <div class="bg-red-50 shadow-sm rounded-xl p-5 border border-red-100">
                    <h3 class="text-lg font-semibold text-red-700 mb-3">🍽️ Alimentación</h3>
                    <ul class="space-y-1 pl-4 list-disc">
                      <li>Carne roja: {{ data.food.redMeat }} porciones</li>
                      <li>Carne blanca: {{ data.food.whiteMeat }} porciones</li>
                      <li>Lácteos: {{ data.food.dairy }} porciones</li>
                      <li>Vegetariano: {{ data.food.vegetarian }} porciones</li>
                    </ul>
                  </div>

                  <!-- Transporte -->
                  <div class="bg-yellow-50 shadow-sm rounded-xl p-5 border border-yellow-100">
                    <h3 class="text-lg font-semibold text-yellow-700 mb-3">🚗 Transporte</h3>
                    <ul class="space-y-1 pl-4 list-disc">
                      <li>Km en coche: {{ data.transport.carKm }}</li>
                      <li>Km en transporte público: {{ data.transport.publicKm }}</li>
                      <li>Vuelos domésticos: {{ data.transport.domesticFlights }}</li>
                      <li>Vuelos internacionales: {{ data.transport.internationalFlights }}</li>
                    </ul>
                  </div>

                  <!-- Residuos -->
                  <div class="bg-blue-50 shadow-sm rounded-xl p-5 border border-blue-100">
                    <h3 class="text-lg font-semibold text-blue-700 mb-3">♻️ Residuos</h3>
                    <ul class="space-y-1 pl-4 list-disc">
                      <li>Bolsas de basura: {{ data.waste.trashBags }}</li>
                      <li>Desperdicio de comida: {{ data.waste.foodWaste }}</li>
                      <li>Botellas plásticas: {{ data.waste.plasticBottles }}</li>
                      <li>Paquetes de papel: {{ data.waste.paperPackages }}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <!-- Gráfico -->
              <div>
                <ChartDisplay />
              </div>
            </div>

            <!-- Línea divisoria -->
            <div class="h-1 bg-green-100"></div>

            <!-- Recomendaciones simples -->
            <div class="p-8">
              <h2 class="text-2xl font-bold text-green-800 mb-6 text-center">
                Recomendaciones Clave
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div v-for="(recomendacion, index) in recomendacionesSimples.slice(0, 4)" :key="'left-' + index"
                  class="p-4 bg-green-50 rounded-lg flex items-start gap-3">
                  <div class="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                    <span class="text-green-600 font-medium">{{ index + 1 }}</span>
                  </div>
                  <p class="text-gray-700">{{ recomendacion }}</p>
                </div>

                <div v-for="(recomendacion, index) in recomendacionesSimples.slice(4, 8)" :key="'right-' + index"
                  class="p-4 bg-green-50 rounded-lg flex items-start gap-3">
                  <div class="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mt-0.5">
                    <span class="text-green-600 font-medium">{{ index + 5 }}</span>
                  </div>
                  <p class="text-gray-700">{{ recomendacion }}</p>
                </div>
              </div>

              <!--recomendación global -->
              <div v-if="recomendacionGlobal"
                class="p-4 bg-green-100 rounded-lg text-center text-gray-800 font-medium max-w-2xl mx-auto">
                {{ recomendacionGlobal }}
              </div>
            </div>

          </div>

          <!-- Botón Exportar -->
          <div class="p-8 bg-gray-50">
            <button @click="transformarColoresRGB"
              class="w-full py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-medium">
              Exportar PDF
            </button>
          </div>

          <!-- Botón Volver -->
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
      </div>
    </div>
 
  <Footer />
</template>


<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { parse, formatRgb } from 'culori'
import html2pdf from 'html2pdf.js'

import ChartDisplay from './results_display/chart_display.vue'
import result_image from '@/assets/result_image.jpg'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import { obtenerRecomendaciones } from '../services/recomendations.js'
import axiosHistory from '../services/HistoryService'

const route = useRoute()
const calculoId = route.params.id

const data = ref(null)
const huellaCarbono = ref(0)

onMounted(async () => {
  try {
    const res = await axiosHistory.get(`/${calculoId}/detail`)
    data.value = res.data
    huellaCarbono.value = res.data.totalGeneral ?? res.data.total ?? 0
    console.log("Data axios:", data.value)
  } catch (err) {
    console.error('Error al obtener cálculo:', err)
  }
})

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
  if (huellaCarbono.value < 5) return '¡Felicidades! Tu impacto ambiental es bajo.'
  if (huellaCarbono.value < 8) return 'Impacto moderado. Puedes mejorar con pequeños cambios.'
  if (huellaCarbono.value < 12) return 'Impacto alto. Implementa recomendaciones.'
  return 'Impacto muy alto. Necesitas hacer cambios importantes.'
})
/*
// Recomendaciones
const recomendacionesSimples = ref([])
const recomendacionGlobal = ref('')

onMounted(async () => {
  const data = await obtenerRecomendaciones()
  if (!data) return

  if (data.global_recommendation?.suggestion) {
    recomendacionGlobal.value = data.global_recommendation.suggestion
  }

  const todas = []
  if (data.category_recommendations) {
    for (const categoria in data.category_recommendations) {
      const sugerencias = data.category_recommendations[categoria]
      sugerencias.forEach(item => {
        todas.push(item.suggestion)
      })
    }
  }

  recomendacionesSimples.value = todas
})
*/
// Exportar a PDF
const transformarColoresRGB = () => {
  const elementos = document.querySelectorAll('*')
  const propiedades = ['color', 'backgroundColor', 'borderColor']

  elementos.forEach((el) => {
    const estilos = window.getComputedStyle(el)
    propiedades.forEach((prop) => {
      const valor = estilos[prop]
      if (valor && valor !== 'transparent' && valor !== 'rgba(0, 0, 0, 0)') {
        try {
          const parsed = parse(valor)
          if (parsed) {
            const rgb = formatRgb(parsed)
            el.style[prop] = rgb
          }
        } catch (e) {
          console.warn('Error al parsear color:', e)
        }
      }
    })
  })

  const contenido = document.getElementById('contenido-exportable')
  if (contenido) {
    const opciones = {
      margin: [0.2, 0.2, 0.2, 0.2],
      filename: 'huella-carbono.pdf',
      image: { type: 'jpeg', quality: 2 },
      html2canvas: { scale: 3, useCORS: true },
      jsPDF: { unit: 'in', format: 'a2', orientation: 'portrait' }
    }

    html2pdf().set(opciones).from(contenido).save()
  }
}
</script>

