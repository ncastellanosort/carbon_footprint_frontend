<template>
  <Navbar />
  <div class="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-6">
    <div class="max-w-7xl mx-auto">
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div v-if="!data" class="p-12 text-center text-gray-600 text-xl">
          Cargando...
        </div>

        <div v-else>
          <div id="contenido-exportable">
            <div class="relative h-48 bg-green-600">
              <img :src="result_image" alt="Paisaje natural" class="w-full h-full object-cover opacity-60" />
              <div class="absolute inset-0 flex items-center justify-center">
                <h1 class="text-4xl font-bold text-white text-center px-4">
                  Detalles de tu cálculo de huella
                </h1>
              </div>
            </div>

            <!-- Resultado total -->
            <div class="p-8 text-center">
              <div class="mb-6">
                <div class="text-7xl font-bold text-green-600">
                  {{ huellaCarbono.toFixed(1) }}
                </div>
                <div class="text-xl text-gray-600 mt-2">toneladas de CO₂ al año</div>
              </div>
              <div class="inline-block px-4 py-2 rounded-full" :class="nivelColor">
                {{ nivelTexto }}
              </div>
              <p class="mt-6 text-gray-700 text-lg">{{ interpretacionResultado }}</p>
            </div>

            <div class="h-1 bg-green-100"></div>

            <!-- Detalle respuestas -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 p-8">
              <div>
                <h2 class="text-2xl font-bold mb-6 text-green-800 text-center">Detalle de tus Respuestas</h2>
                <div class="grid grid-cols-1 gap-6 text-gray-700">
                  <div class="bg-orange-50 shadow-sm rounded-xl p-5 border border-orange-100">
                    <h3 class="text-lg font-semibold text-orange-700 mb-3">⚡ Energía</h3>
                    <ul class="space-y-1 pl-4 list-disc">
                      <li>Electrodomésticos: {{ data.energy.applianceHours }} h</li>
                      <li>Bombillos: {{ data.energy.lightBulbs }}</li>
                      <li>Cilindros de gas: {{ data.energy.gasTanks }}</li>
                      <li>Aire Acondicionado/Calefacción: {{ data.energy.hvacHours }} h</li>
                    </ul>
                  </div>

                  <div class="bg-red-50 shadow-sm rounded-xl p-5 border border-red-100">
                    <h3 class="text-lg font-semibold text-red-700 mb-3">🍽️ Alimentación</h3>
                    <ul class="space-y-1 pl-4 list-disc">
                      <li>Carne roja: {{ data.food.redMeat }} porciones</li>
                      <li>Carne blanca: {{ data.food.whiteMeat }} porciones</li>
                      <li>Lácteos: {{ data.food.dairy }} porciones</li>
                      <li>Vegetariano: {{ data.food.vegetarian }} porciones</li>
                    </ul>
                  </div>

                  <div class="bg-yellow-50 shadow-sm rounded-xl p-5 border border-yellow-100">
                    <h3 class="text-lg font-semibold text-yellow-700 mb-3">🚗 Transporte</h3>
                    <ul class="space-y-1 pl-4 list-disc">
                      <li>Km en coche: {{ data.transport.carKm }}</li>
                      <li>Km en transporte público: {{ data.transport.publicKm }}</li>
                      <li>Vuelos domésticos: {{ data.transport.domesticFlights }}</li>
                      <li>Vuelos internacionales: {{ data.transport.internationalFlights }}</li>
                    </ul>
                  </div>

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
                <Chart_display_history :data="data" />
              </div>
            </div>

            <div class="h-1 bg-green-100"></div>
          </div>

          <div class="p-8 bg-gray-50">
            <button @click="transformarColoresRGB"
              class="w-full py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-medium">
              Exportar PDF
            </button>
          </div>

          <div class="p-8 bg-gray-50">
            <router-link to="/historial">
              <button class="w-full py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-medium">
                Volver al Historial
              </button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import html2pdf from 'html2pdf.js'
import { parse, formatRgb } from 'culori'
import axiosHistory from '../services/HistoryService'
import chart_display_history from './results_display/chart_display_history.vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import result_image from '@/assets/result_image.jpg'
import Chart_display_history from './results_display/chart_display_history.vue'

const route = useRoute()
const data = ref(null)
const huellaCarbono = ref(0)

const obtenerHistorialDetalle = () => {
  const id = route.params.id
  axiosHistory.get(`/${id}/detail`)
    .then(res => {
      data.value = res.data
      huellaCarbono.value =
        res.data.energy.total +
        res.data.food.total +
        res.data.transport.total +
        res.data.waste.total
    })
    .catch(err => {
      console.error('Error obteniendo detalle del historial:', err)
    })
}

onMounted(() => {
  obtenerHistorialDetalle()
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
  if (huellaCarbono.value < 12) return 'Impacto alto. Implementa recomendaciones para reducirlo.'
  return 'Impacto muy alto. Necesitas hacer cambios importantes.'
})

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
    html2pdf().set({
      margin: [0.2, 0.2, 0.2, 0.2],
      filename: 'huella-carbono.pdf',
      image: { type: 'jpeg', quality: 2 },
      html2canvas: { scale: 3, useCORS: true },
      jsPDF: { unit: 'in', format: 'a2', orientation: 'portrait' }
    }).from(contenido).save()
  } else {
    console.error('No se encontró el contenido para exportar')
  }
}
</script>
