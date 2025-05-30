<template>
  <div class="px-4 md:px-10">
    <h2 class="text-2xl font-bold mb-6 text-green-800 text-center">Huella de Carbono por Categoría</h2>

    <!-- Contenedor responsive -->
    <div class="mx-auto" style="max-width: 600PX; height: 300px;">
      <Bar :data="chartData" :options="chartOptions" />
    </div>

    <!-- Gráficos de pastel -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
      <div v-if="transportData" class="w-full">
        <h3 class="text-lg font-semibold text-green-700 mb-2 text-center">Transporte</h3>
        <div class="w-full flex justify-center">
          <div class="w-full max-w-[250px] aspect-square">
            <Pie :data="transportData" :options="pieOptions" />
          </div>
        </div>
      </div>

      <div v-if="foodData" class="w-full">
        <h3 class="text-lg font-semibold text-green-700 mb-2 text-center">Alimentación</h3>
        <div class="w-full flex justify-center">
          <div class="w-full max-w-[250px] aspect-square">
            <Pie :data="foodData" :options="pieOptions" />
          </div>
        </div>
      </div>

      <div v-if="energyData" class="w-full">
        <h3 class="text-lg font-semibold text-green-700 mb-2 text-center">Consumo Energético</h3>
        <div class="w-full flex justify-center">
          <div class="w-full max-w-[250px] aspect-square">
            <Pie :data="energyData" :options="pieOptions" />
          </div>
        </div>
      </div>

      <div v-if="wasteData" class="w-full">
        <h3 class="text-lg font-semibold text-green-700 mb-2 text-center">Residuos</h3>
        <div class="w-full flex justify-center">
          <div class="w-full max-w-[250px] aspect-square">
            <Pie :data="wasteData" :options="pieOptions" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { Bar, Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { useSurveyStore } from '../../services/surveyStore.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartDataLabels
)

const chartData = ref({ labels: [], datasets: [] })
const transportData = ref(null)
const foodData = ref(null)
const energyData = ref(null)
const wasteData = ref(null)

function scaleToHundreds(obj) {
  return Object.fromEntries(
    Object.entries(obj).map(([key, val]) => [key, Math.round(val / 10)])
  )
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Distribución de Huella de Carbono',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: function (value) {
          return value + ' c'
        },
      },
    },
  },
}

const pieOptions = {
  responsive: true,
  aspectRatio: 1,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      align: 'center',
      labels: {
        boxWidth: 16,
        padding: 10,
        usePointStyle: true,
        font: {
          size: 12,
          family: 'Poppins',
        },
      },
    },
    datalabels: {
      display: false,
    },
  },
}

const surveyStore = useSurveyStore()

function updateChartsFromData(data) {
  if (!data) return

  const transport = scaleToHundreds(data.transport)
  const food = scaleToHundreds(data.food)
  const energy = scaleToHundreds(data.energy)
  const waste = scaleToHundreds(data.waste)

  chartData.value = {
    labels: ['Transporte', 'Alimentación', 'Consumo Energético', 'Residuos'],
    datasets: [
      {
        label: 'Impacto (centenas)',
        backgroundColor: ['#FAFDE0', '#FFEFEF', '#FFF8EB', '#EAF4FF'],
        data: [
          Object.values(transport).reduce((a, b) => a + b, 0),
          Object.values(food).reduce((a, b) => a + b, 0),
          Object.values(energy).reduce((a, b) => a + b, 0),
          Object.values(waste).reduce((a, b) => a + b, 0),
        ],
      },
    ],
  }

  const formatLabels = (keys, values) =>
    keys.map((key, index) => `${key}: ${values[index]}`)

  const transportKeys = [
    'Auto (km)',
    'Vuelos nacionales',
    'Vuelos internacionales',
    'Transporte público (km)',
  ]
  const foodKeys = ['Lácteos', 'Carne roja', 'Vegetariano', 'Carne blanca']
  const energyKeys = [
    'Electrodomésticos',
    'Tanques de gas',
    'Climatización',
    'Bombillos',
  ]
  const wasteKeys = [
    'Desperdicio de comida',
    'Paquetes de papel',
    'Botellas plásticas',
    'Bolsas de basura',
  ]

  const transportValues = Object.values(transport)
  const foodValues = Object.values(food)
  const energyValues = Object.values(energy)
  const wasteValues = Object.values(waste)

  transportData.value = {
    labels: formatLabels(transportKeys, transportValues),
    datasets: [
      {
        label: 'Transporte',
        data: transportValues,
        backgroundColor: ['#FFCDD2', '#F8BBD0', '#E1BEE7', '#D1C4E9'],
      },
    ],
  }

  foodData.value = {
    labels: formatLabels(foodKeys, foodValues),
    datasets: [
      {
        label: 'Alimentación',
        data: foodValues,
        backgroundColor: ['#C8E6C9', '#DCEDC8', '#F0F4C3', '#FFF9C4'],
      },
    ],
  }

  energyData.value = {
    labels: formatLabels(energyKeys, energyValues),
    datasets: [
      {
        label: 'Energía',
        data: energyValues,
        backgroundColor: ['#B2EBF2', '#B2DFDB', '#C8E6C9', '#D7CCC8'],
      },
    ],
  }

  wasteData.value = {
    labels: formatLabels(wasteKeys, wasteValues),
    datasets: [
      {
        label: 'Residuos',
        data: wasteValues,
        backgroundColor: ['#FFECB3', '#FFE0B2', '#FFCCBC', '#D7CCC8'],
      },
    ],
  }
}

onMounted(() => {
  updateChartsFromData(surveyStore.forwardedResponse)
})

watch(
  () => surveyStore.forwardedResponse,
  (newVal) => {
    updateChartsFromData(newVal)
  }
)
</script>


<style scoped>
canvas {
  width: 100% !important;
  height: auto !important;
  max-height: 300px;
}

.aspect-square {
  aspect-ratio: 1;
}
</style>
