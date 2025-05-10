<template>
  <div class="px-4 md:px-10">
    <h2 class="text-xl font-bold text-green-800 mb-4 text-center">Huella de Carbono por Categoría</h2>
    <div class="w-full max-w-4xl mx-auto">
      <Bar :data="chartData" :options="chartOptions" />
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
      <div v-if="transportData" class="w-full">
        <h3 class="text-lg font-semibold text-green-700 mb-2 text-center">Transporte</h3>
        <div class="w-full max-w-xs mx-auto">
          <pie :data="transportData" :options="pieOptions" />
        </div>
      </div>

      <div v-if="foodData" class="w-full">
        <h3 class="text-lg font-semibold text-green-700 mb-2 text-center">Alimentación</h3>
        <div class="w-full max-w-xs mx-auto">
          <Pie :data="foodData" :options="pieOptions" />
        </div>
      </div>

      <div v-if="energyData" class="w-full">
        <h3 class="text-lg font-semibold text-green-700 mb-2 text-center">Consumo Energético</h3>
        <div class="w-full max-w-xs mx-auto">
          <Pie :data="energyData" :options="pieOptions" />
        </div>
      </div>

      <div v-if="wasteData" class="w-full">
        <h3 class="text-lg font-semibold text-green-700 mb-2 text-center">Residuos</h3>
        <div class="w-full max-w-xs mx-auto">
          <Pie :data="wasteData" :options="pieOptions" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
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
import { getfakedata } from './results_from_calculator.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale
)

const chartData = ref({
  labels: [],
  datasets: [],
})

const transportData = ref(null)
const foodData = ref(null)
const energyData = ref(null)
const wasteData = ref(null)

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
    },
  },
}

const pieOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
}

onMounted(async () => {
  const data = await getfakedata()
  if (data) {
    chartData.value = {
      labels: ['Transporte', 'Alimentación', 'Consumo Energético', 'Residuos'],
      datasets: [
        {
          label: 'Impacto',
          backgroundColor: ['#FAFDE0', '#FFEFEF', '#FFF8EB', '#EAF4FF'],
          data: [
            Object.values(data.transport).reduce((a, b) => a + b, 0),
            Object.values(data.food).reduce((a, b) => a + b, 0),
            Object.values(data.energy).reduce((a, b) => a + b, 0),
            Object.values(data.waste).reduce((a, b) => a + b, 0),
          ],
        },
      ],
    }

    transportData.value = {
      labels: Object.keys(data.transport),
      datasets: [
        {
          label: 'Transporte',
          data: Object.values(data.transport),
          backgroundColor: ['#FFCDD2', '#F8BBD0', '#E1BEE7', '#D1C4E9'],
        },
      ],
    }

    foodData.value = {
      labels: Object.keys(data.food),
      datasets: [
        {
          label: 'Alimentación',
          data: Object.values(data.food),
          backgroundColor: ['#C8E6C9', '#DCEDC8', '#F0F4C3', '#FFF9C4'],
        },
      ],
    }

    energyData.value = {
      labels: Object.keys(data.energy),
      datasets: [
        {
          label: 'Energía',
          data: Object.values(data.energy),
          backgroundColor: ['#B2EBF2', '#B2DFDB', '#C8E6C9', '#D7CCC8'],
        },
      ],
    }

    wasteData.value = {
      labels: Object.keys(data.waste),
      datasets: [
        {
          label: 'Residuos',
          data: Object.values(data.waste),
          backgroundColor: ['#FFECB3', '#FFE0B2', '#FFCCBC', '#D7CCC8'],
        },
      ],
    }
  }
})
</script>

<style scoped>

canvas {
  width: 100% ;
  height: auto ;
}
</style>