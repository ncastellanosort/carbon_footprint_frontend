<template>
    <div>
        <h2 class="text-xl font-bold text-green-800 mb-4">Huella de Carbono por Categoría</h2>
        <Bar :data="chartData" :options="chartOptions" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Bar } from 'vue-chartjs'
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale,
} from 'chart.js'
import { getfakedata } from './results_from_calculator.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const chartData = ref({
    labels: [],
    datasets: [],
})

const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Distribución de Huella de Carbono',
        },
    },
}

onMounted(async () => {
    const data = await getfakedata()
    if (data) {
        chartData.value = {
            labels: ['Trasporte', 'Alimentación', 'Consumo Energético', 'Residuos'],
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
    }
})
</script>
