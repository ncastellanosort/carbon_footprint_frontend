<template>
  <div class="carbon-tracker">
    <header class="bg-green-700 text-white p-6 shadow-md">
      <h1 class="text-2xl font-bold">Mi Huella de Carbono</h1>
      <p class="text-sm opacity-80">Historial de cálculos realizados</p>
    </header>

    <div class="p-6">
      <!-- Summary Section -->
      <div class="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Resumen</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-green-50 p-4 rounded-md border border-green-200">
            <p class="text-sm text-gray-600">Total de Emisiones</p>
            <p class="text-2xl font-bold text-green-800">{{ totalEmissions }} kg CO₂</p>
          </div>
          <div class="bg-green-50 p-4 rounded-md border border-green-200">
            <p class="text-sm text-gray-600">Promedio Mensual</p>
            <p class="text-2xl font-bold text-green-800">{{ averageMonthly }} kg CO₂</p>
          </div>
          <div class="bg-green-50 p-4 rounded-md border border-green-200">
            <p class="text-sm text-gray-600">Cálculos Realizados</p>
            <p class="text-2xl font-bold text-green-800">{{ calculations.length }}</p>
          </div>
        </div>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap gap-4 mb-6">
        <div class="relative">
          <select v-model="categoryFilter"
            class="bg-white border border-gray-300 rounded-md py-2 px-4 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-green-500">
            <option value="">Todas las categorías</option>
            <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
          </select>
        </div>
        <div class="relative">
          <select v-model="timeFilter"
            class="bg-white border border-gray-300 rounded-md py-2 px-4 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-green-500">
            <option value="all">Todo el tiempo</option>
            <option value="month">Último mes</option>
            <option value="quarter">Último trimestre</option>
            <option value="year">Último año</option>
          </select>
        </div>
      </div>

      <!-- Calculations List -->
      <h2 class="text-xl font-semibold text-gray-800 mb-4">Historial de Cálculos</h2>
      <div v-if="filteredCalculations.length === 0" class="text-center py-10 bg-gray-50 rounded-lg">
        <p class="text-gray-500">No hay cálculos que coincidan con los filtros seleccionados</p>
      </div>
      <div v-else class="grid grid-cols-1 gap-4">
        <div v-for="(calc, index) in filteredCalculations" :key="index"
          class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
          <div class="p-6">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="text-lg font-semibold text-gray-800">{{ calc.title }}</h3>
                <p class="text-sm text-gray-600 mt-1">{{ formatDate(calc.date) }}</p>
              </div>
              <span class="px-3 py-1 text-sm rounded-full" :class="getCategoryClass(calc.category)">
                {{ calc.category }}
              </span>
            </div>

            <div class="mt-4 flex justify-between items-center">
              <div>
                <p class="text-gray-700">{{ calc.description }}</p>
                <div class="mt-2 flex items-center">
                  <span class="text-xs text-gray-500 mr-2">Fuente:</span>
                  <span class="text-xs text-gray-700">{{ calc.source }}</span>
                </div>
              </div>
              <div class="text-right">
                <p class="text-2xl font-bold text-green-800">{{ calc.value }} kg CO₂</p>
              </div>
            </div>
          </div>

          <div class="border-t border-gray-100 bg-gray-50 px-6 py-3 flex justify-between">
            <button class="text-sm text-green-700 hover:text-green-900 font-medium" @click="toggleDetails(index)">
              {{ expandedItems.includes(index) ? 'Ocultar detalles' : 'Ver detalles' }}
            </button>
            <button class="text-sm text-gray-600 hover:text-gray-800 font-medium flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
              Exportar
            </button>
          </div>

          <!-- Expanded Details -->
          <div v-if="expandedItems.includes(index)" class="bg-gray-50 px-6 py-4 border-t border-gray-100">
            <h4 class="font-medium text-gray-800 mb-2">Desglose detallado</h4>
            <div class="space-y-2">
              <div v-for="(detail, detailIndex) in calc.details" :key="detailIndex" class="flex justify-between">
                <span class="text-sm text-gray-600">{{ detail.name }}</span>
                <span class="text-sm font-medium text-gray-800">{{ detail.value }} kg CO₂</span>
              </div>
            </div>

            <div class="mt-4 pt-4 border-t border-gray-200">
              <h4 class="font-medium text-gray-800 mb-2">Metodología</h4>
              <p class="text-sm text-gray-600">{{ calc.methodology }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Sample data
const calculations = ref([
  {
    id: 1,
    title: 'Viaje en avión Madrid-Barcelona',
    date: new Date('2023-10-15'),
    category: 'Transporte',
    value: 120.5,
    description: 'Vuelo de ida y vuelta para conferencia de trabajo',
    source: 'Calculadora ICAO',
    methodology: 'Basado en la distancia recorrida, tipo de avión y factor de emisión promedio para vuelos domésticos.',
    details: [
      { name: 'Distancia total', value: 1000 },
      { name: 'Factor de emisión', value: 0.12 },
      { name: 'Ocupación promedio', value: 0.85 }
    ]
  },
  {
    id: 2,
    title: 'Consumo eléctrico mensual',
    date: new Date('2023-11-05'),
    category: 'Hogar',
    value: 85.2,
    description: 'Consumo eléctrico del hogar durante octubre',
    source: 'Factura eléctrica',
    methodology: 'Calculado multiplicando kWh consumidos por el factor de emisión de la red eléctrica española.',
    details: [
      { name: 'Consumo total (kWh)', value: 320 },
      { name: 'Factor de emisión (kg CO₂/kWh)', value: 0.25 },
      { name: 'Ajuste por energías renovables', value: 0.95 }
    ]
  },
  {
    id: 3,
    title: 'Dieta semanal',
    date: new Date('2023-11-12'),
    category: 'Alimentación',
    value: 28.7,
    description: 'Impacto de la dieta durante la semana pasada',
    source: 'Calculadora MyClimate',
    methodology: 'Basado en el consumo de diferentes grupos de alimentos y su huella de carbono asociada.',
    details: [
      { name: 'Productos animales', value: 18.5 },
      { name: 'Frutas y verduras', value: 4.2 },
      { name: 'Procesados y envasados', value: 6.0 }
    ]
  },
  {
    id: 4,
    title: 'Desplazamiento diario al trabajo',
    date: new Date('2023-11-20'),
    category: 'Transporte',
    value: 42.3,
    description: 'Trayectos en coche durante el mes de noviembre',
    source: 'Registro personal',
    methodology: 'Calculado en base a kilómetros recorridos, eficiencia del vehículo y tipo de combustible.',
    details: [
      { name: 'Distancia total (km)', value: 320 },
      { name: 'Consumo medio (l/100km)', value: 6.5 },
      { name: 'Factor de emisión diésel', value: 2.68 }
    ]
  },
  {
    id: 5,
    title: 'Compra de ropa',
    date: new Date('2023-12-03'),
    category: 'Consumo',
    value: 35.8,
    description: 'Adquisición de prendas nuevas',
    source: 'Estimación basada en tipo de prendas',
    methodology: 'Calculado según el tipo de material, proceso de fabricación y transporte asociado a cada prenda.',
    details: [
      { name: 'Camisetas de algodón (2)', value: 8.4 },
      { name: 'Pantalón vaquero', value: 20.5 },
      { name: 'Accesorios varios', value: 6.9 }
    ]
  }
]);

// Filters
const categoryFilter = ref('');
const timeFilter = ref('all');
const expandedItems = ref([]);

// Computed properties
const categories = computed(() => {
  const uniqueCategories = new Set();
  calculations.value.forEach(calc => uniqueCategories.add(calc.category));
  return Array.from(uniqueCategories);
});

const filteredCalculations = computed(() => {
  let filtered = [...calculations.value];

  // Apply category filter
  if (categoryFilter.value) {
    filtered = filtered.filter(calc => calc.category === categoryFilter.value);
  }

  // Apply time filter
  const now = new Date();
  if (timeFilter.value === 'month') {
    const oneMonthAgo = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    filtered = filtered.filter(calc => calc.date >= oneMonthAgo);
  } else if (timeFilter.value === 'quarter') {
    const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
    filtered = filtered.filter(calc => calc.date >= threeMonthsAgo);
  } else if (timeFilter.value === 'year') {
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
    filtered = filtered.filter(calc => calc.date >= oneYearAgo);
  }

  // Sort by date (newest first)
  return filtered.sort((a, b) => b.date - a.date);
});

const totalEmissions = computed(() => {
  return filteredCalculations.value.reduce((sum, calc) => sum + calc.value, 0).toFixed(1);
});

const averageMonthly = computed(() => {
  if (filteredCalculations.value.length === 0) return '0.0';

  // Group by month and calculate average
  const monthlyTotals = {};
  filteredCalculations.value.forEach(calc => {
    const monthKey = `${calc.date.getFullYear()}-${calc.date.getMonth()}`;
    if (!monthlyTotals[monthKey]) monthlyTotals[monthKey] = 0;
    monthlyTotals[monthKey] += calc.value;
  });

  const months = Object.keys(monthlyTotals).length;
  const total = Object.values(monthlyTotals).reduce((sum, val) => sum + val, 0);
  return (total / Math.max(1, months)).toFixed(1);
});

// Methods
function formatDate(date) {
  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date);
}

function getCategoryClass(category) {
  const classes = {
    'Transporte': 'bg-blue-100 text-blue-800',
    'Hogar': 'bg-yellow-100 text-yellow-800',
    'Alimentación': 'bg-green-100 text-green-800',
    'Consumo': 'bg-purple-100 text-purple-800'
  };

  return classes[category] || 'bg-gray-100 text-gray-800';
}

function toggleDetails(index) {
  const position = expandedItems.value.indexOf(index);
  if (position === -1) {
    expandedItems.value.push(index);
  } else {
    expandedItems.value.splice(position, 1);
  }
}
</script>

<style>
.carbon-tracker {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  background-color: #f9fafb;
  min-height: 100vh;
}
</style>
