<template>
  <NavbarAuth v-if="tieneToken" />
  <Navbar v-else />
  <div class="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-6">
    <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <div class="flex items-center gap-4 mb-8">
          <div class="bg-blue-100 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-blue-600" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2">
              <path d="M9 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4" />
              <path d="M18 2v4h4" />
              <path d="M18 6L9 15" />
              <path d="M21 14v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-blue-800">Residuos</h2>
        </div>

        <div class="space-y-8">
          <!-- Bolsas de basura -->
          <div class="space-y-2">
            <label class="block text-lg font-medium text-gray-700">
              ¿Cuántas bolsas de basura completas generas en una semana?
            </label>
            <div class="relative pt-6">
              <input type="range" v-model="trashBags" min="0" max="20" step="1"
                class="w-full h-3 bg-orange-200 rounded-lg appearance-none cursor-pointer" />
              <div class="absolute top-0 left-0 w-full flex justify-between text-sm text-gray-600">
                <span>0</span>
                <span>10</span>
                <span>20</span>
              </div>
            </div>
            <p class="text-center text-lg font-semibold text-blue-600">{{ trashBags }} bolsas</p>
          </div>

          <!-- Restos de comida -->
          <div class="space-y-2">
            <label class="block text-lg font-medium text-gray-700">
              ¿Cuántas bolsas de restos de comida y desechos orgánicos produces a la semana?
            </label>
            <div class="relative pt-6">
              <input type="range" v-model="foodWaste" min="0" max="20" step="1"
                class="w-full h-3 bg-orange-200 rounded-lg appearance-none cursor-pointer" />
              <div class="absolute top-0 left-0 w-full flex justify-between text-sm text-gray-600">
                <span>0</span>
                <span>10</span>
                <span>20</span>
              </div>
            </div>
            <p class="text-center text-lg font-semibold text-blue-600">{{ foodWaste }} bolsas</p>
          </div>

          <!-- Botellas de plástico -->
          <div class="space-y-2">
            <label class="block text-lg font-medium text-gray-700">
              ¿Cuántas botellas o envases de plástico tiras cada semana?
            </label>
            <div class="relative pt-6">
              <input type="range" v-model="plasticBottles" min="0" max="50" step="1"
                class="w-full h-3 bg-orange-200 rounded-lg appearance-none cursor-pointer" />
              <div class="absolute top-0 left-0 w-full flex justify-between text-sm text-gray-600">
                <span>0</span>
                <span>25</span>
                <span>50</span>
              </div>
            </div>
            <p class="text-center text-lg font-semibold text-blue-600">{{ plasticBottles }} botellas</p>
          </div>

          <!-- Paquetes de papel/cartón -->
          <div class="space-y-2">
            <label class="block text-lg font-medium text-gray-700">
              ¿Cuántos paquetes de papel/cartón desechas en una semana?
            </label>
            <div class="relative pt-6">
              <input type="range" v-model="paperPackages" min="0" max="20" step="1"
                class="w-full h-3 bg-orange-200 rounded-lg appearance-none cursor-pointer" />
              <div class="absolute top-0 left-0 w-full flex justify-between text-sm text-gray-600">
                <span>0</span>
                <span>10</span>
                <span>20</span>
              </div>
            </div>
            <p class="text-center text-lg font-semibold text-blue-600">{{ paperPackages }} paquetes</p>
          </div>
        </div>

        <div class="mt-8 flex justify-between gap-4">
          <router-link to="/energy">
            <button class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
              Atrás
            </button>
          </router-link>
          <router-link to="/result">
            <button @click="sendData"
              class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Enviar Todo
            </button>
          </router-link>
        </div>
      </div>

      <!-- Ilustración -->
      <div class="hidden md:block">
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <img :src="waste_image" alt="Ilustración de gestión de residuos" class="w-full h-auto rounded-xl mb-6" />
          <div class="space-y-4">
            <h3 class="text-2xl font-bold text-blue-800">Impacto de los Residuos</h3>
            <p class="text-gray-600">
              La gestión adecuada de residuos es fundamental para reducir nuestra huella ambiental.
              Separar correctamente los desechos, reciclar y compostar pueden disminuir significativamente
              la cantidad de basura que termina en vertederos.
            </p>
            <div class="p-4 bg-blue-50 rounded-lg">
              <p class="text-sm text-blue-800">
                💡 Tip: Considera utilizar bolsas reutilizables, reducir el consumo de plásticos
                de un solo uso y compostar los residuos orgánicos para minimizar tu impacto.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useSurveyStore } from "@/services/surveyStore";
import Navbar from '@/components/Navbar.vue'
import NavbarAuth from '../authenticated/NavbarAuth.vue'
import Footer from '@/components/Footer.vue'
import waste_image from '@/assets/waste_image.jpg'

const tieneToken = ref(false)

onMounted(() => {
  const token = localStorage.getItem('token')
  tieneToken.value = !!token
})

const store = useSurveyStore();

const trashBags = ref(0);
const foodWaste = ref(0);
const plasticBottles = ref(0);
const paperPackages = ref(0);

const sendData = () => {
  store.setWasteData({
    foodWaste: foodWaste.value,
    paperPackages: paperPackages.value,
    plasticBottles: plasticBottles.value,
    trashBags: trashBags.value,
  });
  store.sendAllData();
};
</script>

<style scoped>
input[type="range"] {
  -webkit-appearance: none;
  height: 12px;
  background: #e2e8f0;
  border-radius: 8px;
  background-image: linear-gradient(#009dff, #009dff);
  background-repeat: no-repeat;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  background: #009dff;
  cursor: pointer;
  box-shadow: 0 0 2px 0 #555;
  transition: background .3s ease-in-out;
}

input[type="range"]::-webkit-slider-thumb:hover {
  background: #1382c7;
}

input[type="range"]::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}
</style>
