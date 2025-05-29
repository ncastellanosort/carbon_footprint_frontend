<template>
  <div class="px-4 md:px-10">
    <h2 class="text-2xl font-bold mb-6 text-green-800 text-center">Huella de Carbono por Categoría</h2>

    <div class="mx-auto" style="max-width: 600px; height: 300px;">
      <Bar :data="chartData" :options="chartOptions" />
    </div>

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
import { ref, watch } from 'vue'
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

const props = defineProps({
  data: Object
})


console.log("chart_display_his data", props.data)

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
    legend: { position: 'top' },
    title: { display: true, text: 'Distribución de Huella de Carbono' },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: value => value + ' c',
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
        font: { size: 12, family: 'Poppins' },
      },
    },
    datalabels: { display: false },
  },
}

watch(
  () => props.data,
  (newData) => {
    if (!newData) return

    const transport = {
      carKm: newData.transport.carKm,
      publicKm: newData.transport.publicKm,
      domesticFlights: newData.transport.domesticFlights,
      internationalFlights: newData.transport.internationalFlights,
    }

    const food = {
      redMeat: newData.food.redMeat,
      whiteMeat: newData.food.whiteMeat,
      dairy: newData.food.dairy,
      vegetarian: newData.food.vegetarian,
    }

    const energy = {
      applianceHours: newData.energy.applianceHours,
      lightBulbs: newData.energy.lightBulbs,
      gasTanks: newData.energy.gasTanks,
      hvacHours: newData.energy.hvacHours,
    }

    const waste = {
      trashBags: newData.waste.trashBags,
      foodWaste: newData.waste.foodWaste,
      plasticBottles: newData.waste.plasticBottles,
      paperPackages: newData.waste.paperPackages,
    }

    chartData.value = {
      labels: ['Transporte', 'Alimentación', 'Consumo Energético', 'Residuos'],
      datasets: [
        {
          label: 'Impacto (valor real)',
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

    transportData.value = {
      labels: [
        `Auto (km): ${transport.carKm}`,
        `Transporte público (km): ${transport.publicKm}`,
        `Vuelos nacionales: ${transport.domesticFlights}`,
        `Vuelos internacionales: ${transport.internationalFlights}`,
      ],
      datasets: [
        {
          label: 'Transporte',
          data: [
            transport.carKm,
            transport.publicKm,
            transport.domesticFlights,
            transport.internationalFlights,
          ],
          backgroundColor: ['#FFCDD2', '#F8BBD0', '#E1BEE7', '#D1C4E9'],
        },
      ],
    }

    foodData.value = {
      labels: [
        `Carne roja: ${food.redMeat}`,
        `Carne blanca: ${food.whiteMeat}`,
        `Lácteos: ${food.dairy}`,
        `Vegetariano: ${food.vegetarian}`,
      ],
      datasets: [
        {
          label: 'Alimentación',
          data: [food.redMeat, food.whiteMeat, food.dairy, food.vegetarian],
          backgroundColor: ['#C8E6C9', '#DCEDC8', '#F0F4C3', '#FFF9C4'],
        },
      ],
    }

    energyData.value = {
      labels: [
        `Electrodomésticos: ${energy.applianceHours}`,
        `Bombillos: ${energy.lightBulbs}`,
        `Tanques de gas: ${energy.gasTanks}`,
        `Climatización: ${energy.hvacHours}`,
      ],
      datasets: [
        {
          label: 'Energía',
          data: [
            energy.applianceHours,
            energy.lightBulbs,
            energy.gasTanks,
            energy.hvacHours,
          ],
          backgroundColor: ['#B2EBF2', '#B2DFDB', '#C8E6C9', '#D7CCC8'],
        },
      ],
    }

    wasteData.value = {
      labels: [
        `Bolsas de basura: ${waste.trashBags}`,
        `Desperdicio de comida: ${waste.foodWaste}`,
        `Botellas plásticas: ${waste.plasticBottles}`,
        `Paquetes de papel: ${waste.paperPackages}`,
      ],
      datasets: [
        {
          label: 'Residuos',
          data: [
            waste.trashBags,
            waste.foodWaste,
            waste.plasticBottles,
            waste.paperPackages,
          ],
          backgroundColor: ['#FFECB3', '#FFE0B2', '#FFCCBC', '#D7CCC8'],
        },
      ],
    }
  },
  { immediate: true }
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
