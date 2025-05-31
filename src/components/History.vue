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

          <p class="mt-6 text-sm text-gray-600">
            Para comparar dos huellas, seleccione las tarjetas correspondientes. Solo puede elegir dos.
          </p>
        </div>
      </section>

      <!-- Cards -->
      <section class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="calculo in historial"
          :key="calculo.calculoId"
          :class="[
            'relative bg-white rounded-xl shadow-md p-6 w-full transform transition-all duration-300 hover:scale-105 hover:shadow-lg animate-fade-in-up',
            isSelected(calculo.calculoId) ? 'ring-4 ring-green-500' : ''
          ]"
          @click="handleCardClick(calculo.calculoId)"
        >
          <svg
            v-if="isSelected(calculo.calculoId)"
            class="absolute top-3 right-3 w-6 h-6 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>

          <h2 class="text-lg font-semibold text-gray-800 mb-1">
            Cálculo {{ calculo.calculoId }}
          </h2>
          <p class="text-sm text-gray-500 mb-3">
            {{ new Date(calculo.fecha).toLocaleString('es-ES', {
              day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
            }) }}
          </p>

          <span class="inline-block bg-purple-200 text-purple-700 text-sm font-medium px-3 py-1 rounded-full mb-4">
            Consumo
          </span>

          <p class="text-3xl font-bold text-green-700 mb-4">
            {{ calculo.totalGeneral }} kg CO₂
          </p>

          <div class="border-t pt-3 flex justify-between text-sm text-green-700 font-medium">
            <router-link :to="`/history/${calculo.calculoId}/detail`" class="hover:underline" @click.stop>
              Ver detalles
            </router-link>
          </div>
        </div>
      </section>

      <!-- Botón Comparar -->
      <div class="text-center mt-8">
        <button
          class="px-6 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
          :disabled="selectedIds.length !== 2 || loadingCompare"
          @click="compareSelected"
        >
          {{ loadingCompare ? 'Comparando...' : 'Comparar' }}
        </button>
      </div>
    </main>
  </div>

  <!-- Modal/Popup de Comparación -->
  <Transition name="modal">
    <div v-if="showModal" class="fixed inset-0 z-50 overflow-y-auto">
      <!-- Overlay con blur -->
      <div 
        class="fixed inset-0 bg-white/30 backdrop-blur-sm transition-all duration-300" 
        @click="closeModal"
      ></div>
      
      <!-- Modal Content -->
      <div class="flex min-h-full items-center justify-center p-4">
        <div class="relative bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300">
          <!-- Close Button -->
          <button
            @click="closeModal"
            class="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-all duration-200 hover:scale-110"
          >
            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Header with gradient background -->
          <div class="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-t-2xl p-8 text-white">
            <div class="flex items-center space-x-3">
              <div class="bg-white/20 rounded-full p-3">
                <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h2 class="text-3xl font-bold">Análisis Comparativo</h2>
                <p class="text-emerald-100 mt-1">Resultados detallados de la comparación de huellas de carbono</p>
              </div>
            </div>
          </div>

          <!-- Main content -->
          <div class="bg-white rounded-b-2xl overflow-hidden">
            <!-- Category comparison cards -->
            <div class="p-8">
              <h3 class="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <div class="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full mr-3"></div>
                Comparación por Categorías
              </h3>
              
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div 
                  v-for="(data, category) in comparisonResult?.comparison" 
                  :key="category"
                  v-if="category !== 'total'"
                  class="group relative overflow-hidden rounded-xl border border-gray-200 hover:border-emerald-300 transition-all duration-300 hover:shadow-lg"
                >
                  <!-- Status indicator stripe -->
                  <div :class="{
                    'bg-gradient-to-r from-emerald-500 to-green-500': data.status === 'Mejoro',
                    'bg-gradient-to-r from-amber-500 to-yellow-500': data.status === 'No ha cambiado',
                    'bg-gradient-to-r from-red-500 to-rose-500': data.status === 'Empeoro'
                  }" class="h-1 w-full"></div>
                  
                  <div class="p-6">
                    <div class="flex items-center justify-between mb-4">
                      <h4 class="text-lg font-semibold text-gray-800 capitalize">{{ translateCategory(category) }}</h4>
                      <div :class="{
                        'bg-emerald-100 text-emerald-700': data.status === 'Mejoro',
                        'bg-amber-100 text-amber-700': data.status === 'No ha cambiado',
                        'bg-red-100 text-red-700': data.status === 'Empeoro'
                      }" class="px-3 py-1 rounded-full text-xs font-medium">
                        {{ data.status }}
                      </div>
                    </div>
                    
                    <div class="space-y-3">
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600">Diferencia:</span>
                        <span :class="{
                          'text-emerald-600 font-semibold': data.status === 'Mejoro',
                          'text-amber-600 font-semibold': data.status === 'No ha cambiado',
                          'text-red-600 font-semibold': data.status === 'Empeoro'
                        }" class="text-lg">
                          {{ data.diff > 0 ? '+' : '' }}{{ data.diff.toFixed(2) }}%
                        </span>
                      </div>
                      
                      <!-- Progress bar for visual impact -->
                      <div class="w-full bg-gray-200 rounded-full h-2">
                        <div :class="{
                          'bg-gradient-to-r from-emerald-500 to-green-500': data.status === 'Mejoro',
                          'bg-gradient-to-r from-amber-500 to-yellow-500': data.status === 'No ha cambiado',
                          'bg-gradient-to-r from-red-500 to-rose-500': data.status === 'Empeoro'
                        }" 
                        :style="{ width: Math.min(Math.abs(data.diff) * 10, 100) + '%' }"
                        class="h-2 rounded-full transition-all duration-500"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Charts section - Side by side -->
            <div class="bg-gray-50 p-8">
              <!-- Contenedor centrado para las gráficas -->
              <div class="max-w-5xl mx-auto">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <!-- Bar Chart -->
                  <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div class="flex items-center mb-6">
                      <div class="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-500 rounded-full mr-3"></div>
                      <h3 class="text-lg font-semibold text-gray-800">Diferencias por Categoría</h3>
                    </div>
                    <div class="relative">
                      <canvas id="comparisonChart" class="max-w-full h-64"></canvas>
                    </div>
                  </div>

                  <!-- Pie Chart -->
                  <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div class="flex items-center mb-6">
                      <div class="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full mr-3"></div>
                      <h3 class="text-lg font-semibold text-gray-800">Distribución del Impacto</h3>
                    </div>
                    <div class="relative">
                      <canvas id="pieChart" class="max-w-full h-64"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Summary footer -->
            <div class="bg-gradient-to-r from-gray-50 to-gray-100 p-6 border-t border-gray-200">
              <div class="flex items-center justify-center space-x-2 text-sm text-gray-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Los valores negativos indican una reducción porcentual en las emisiones (mejora)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>

  <Footer />
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { Chart, registerables } from 'chart.js'
import NavbarAuth from './authenticated/NavbarAuth.vue'
import Footer from '@/components/Footer.vue'
import axiosHistory from '../services/HistoryService'
import axios from 'axios'

Chart.register(...registerables)

const historial = ref([])
const selectedIds = ref([])
const loadingCompare = ref(false)
const comparisonResult = ref(null)
const showModal = ref(false)
let chartInstance = null
let pieInstance = null

// Función para traducir categorías
const translateCategory = (category) => {
  const translations = {
    'waste': 'Residuos',
    'transport': 'Transporte',
    'energy': 'Consumo Energético',
    'food': 'Alimentación'
  }
  return translations[category] || category
}

const obtenerHistorial = () => {
  axiosHistory
    .get('/history')
    .then((res) => {
      historial.value = res.data
      console.log('Historial obtenido:', historial.value)
    })
    .catch((err) => {
      console.error('Error obteniendo historial:', err)
    })
}



const closeModal = () => {
  showModal.value = false
  // Limpiar gráficas al cerrar
  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }
  if (pieInstance) {
    pieInstance.destroy()
    pieInstance = null
  }
}

onMounted(() => {
  obtenerHistorial()
})

watch(comparisonResult, async (newVal) => {
  if (newVal && newVal.comparison && showModal.value) {
    await nextTick()

    const ctx = document.getElementById('comparisonChart')
    const pieCtx = document.getElementById('pieChart')

    if (!ctx || !pieCtx) {
      console.warn('No se encontró el canvas para los gráficos.')
      return
    }

    if (chartInstance) chartInstance.destroy()
    if (pieInstance) pieInstance.destroy()

    const categories = Object.keys(newVal.comparison).filter(k => k !== 'total')
    const diffs = categories.map(c => parseFloat(newVal.comparison[c].diff.toFixed(2)))

    // Enhanced Bar Chart with beautiful colors
    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: categories.map(c => translateCategory(c)),
        datasets: [
          {
            label: 'Diferencia (%)',
            data: diffs,
            backgroundColor: diffs.map(v => 
              v < 0 ? 'rgba(16, 185, 129, 0.8)' : 
              v === 0 ? 'rgba(245, 158, 11, 0.8)' : 
              'rgba(239, 68, 68, 0.8)'
            ),
            borderColor: diffs.map(v => 
              v < 0 ? 'rgba(16, 185, 129, 1)' : 
              v === 0 ? 'rgba(245, 158, 11, 1)' : 
              'rgba(239, 68, 68, 1)'
            ),
            borderWidth: 2,
            borderRadius: 8,
            borderSkipped: false,
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { 
            display: false 
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: 'white',
            bodyColor: 'white',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
            cornerRadius: 8,
            callbacks: {
              label: ctx => `${ctx.parsed.y > 0 ? '+' : ''}${ctx.parsed.y}%`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: { 
              display: true, 
              text: 'Porcentaje (%)',
              color: '#6B7280',
              font: { weight: 'bold' }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              color: '#6B7280',
              callback: function(value) {
                return value + '%';
              }
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#6B7280',
              font: { weight: '500' }
            }
          }
        }
      }
    })

    // Enhanced Pie Chart with beautiful gradient colors
    const pieLabels = categories.map(c => translateCategory(c))
    const pieColors = [
      '#FAFDE0',   // Transporte
      '#FFEFEF',   // Alimentación  
      '#FFF8EB',   // Consumo Energético
      '#EAF4FF',   // Residuos
    ]
    
    pieInstance = new Chart(pieCtx, {
      type: 'doughnut',
      data: {
        labels: pieLabels,
        datasets: [
          {
            label: 'Impacto por Categoría',
            data: diffs.map(v => Math.abs(v)),
            backgroundColor: pieColors.slice(0, categories.length),
            borderColor: [
              '#D4D4AA',   // Borde más oscuro para Transporte
              '#FFCCCC',   // Borde más oscuro para Alimentación
              '#FFE4B8',   // Borde más oscuro para Consumo Energético
              '#B8D4FF',   // Borde más oscuro para Residuos
            ].slice(0, categories.length),
            borderWidth: 3,
            hoverOffset: 10
          }
        ]
      },
      options: {
        responsive: true,
        cutout: '60%',
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              padding: 20,
              usePointStyle: true,
              pointStyle: 'circle',
              font: { weight: '500' },
              color: '#6B7280'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: 'white',
            bodyColor: 'white',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
            cornerRadius: 8,
            callbacks: {
              label: ctx => `${ctx.label}: ${ctx.parsed.toFixed(2)}%`
            }
          }
        }
      }
    })
  }
})

const totalEmisiones = computed(() =>
  historial.value.reduce((acc, calc) => acc + calc.totalGeneral, 0)
)
const cantidadCalculos = computed(() => historial.value.length)
const promedioMensual = computed(() => {
  if (historial.value.length === 0) return 0

  const emisionesPorMes = {}
  historial.value.forEach((calc) => {
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

const isSelected = (id) => selectedIds.value.includes(id)

const handleCardClick = (id) => {
  if (isSelected(id)) {
    selectedIds.value = selectedIds.value.filter((x) => x !== id)
  } else if (selectedIds.value.length < 2) {
    selectedIds.value.push(id)
  }
}

const compareSelected = () => {
  if (selectedIds.value.length !== 2) return
  loadingCompare.value = true
  const [prev, curr] = selectedIds.value

  axios
    .get('https://footprint-comparison-service.onrender.com/compare_service', {
      params: { prev, curr }
    })
    .then((res) => {
      comparisonResult.value = res.data
      selectedIds.value = []
      showModal.value = true // Mostrar el modal cuando se obtienen los resultados
    })
    .catch((err) => {
      console.error('Error comparando huellas:', err)
    })
    .finally(() => {
      loadingCompare.value = false
    })
}
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

/* Animaciones del modal */
.modal-enter-active, .modal-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

.modal-enter-from .bg-white {
  transform: scale(0.9) translateY(20px);
}

.modal-leave-to .bg-white {
  transform: scale(0.95) translateY(-10px);
}

.modal-enter-active .bg-white,
.modal-leave-active .bg-white {
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
</style>
