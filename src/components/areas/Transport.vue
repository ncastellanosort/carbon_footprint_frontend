<template>
  <NavbarAuth v-if="tieneToken" />
  <Navbar v-else />
  <div class="min-h-screen bg-gradient-to-br from-green-50 to-lime-100 p-6">
    <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <div class="flex items-center gap-4 mb-8">
          <div class="bg-yellow-100 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-yellow-600" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2">
              <path
                d="M5 17h14M5 17a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2M5 17l-2 4h18l-2-4M12 4v16" />
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-yellow-400">Transporte</h2>
        </div>

        <div class="space-y-8">
          <!-- Coche -->
          <div class="space-y-2">
            <label class="block text-lg font-medium text-gray-700">
              ¿Cuántos kilómetros recorres en coche a la semana?
            </label>
            <div class="relative pt-6">
              <input type="range" v-model="carKm" min="0" max="1000" step="10"
                class="w-full h-3 bg-green-200 rounded-lg appearance-none cursor-pointer" />
              <div class="absolute top-0 left-0 w-full flex justify-between text-sm text-gray-600">
                <span>0 km</span>
                <span>500 km</span>
                <span>1000 km</span>
              </div>
            </div>
            <p class="text-center text-lg font-semibold text-yellow-400">{{ carKm }} km</p>
          </div>

          <!-- Transporte Público -->
          <div class="space-y-2">
            <label class="block text-lg font-medium text-gray-700">
              ¿Cuántos kilómetros recorres en transporte público a la semana?
            </label>
            <div class="relative pt-6">
              <input type="range" v-model="publicKm" min="0" max="500" step="5"
                class="w-full h-3 bg-green-200 rounded-lg appearance-none cursor-pointer" />
              <div class="absolute top-0 left-0 w-full flex justify-between text-sm text-gray-600">
                <span>0 km</span>
                <span>250 km</span>
                <span>500 km</span>
              </div>
            </div>
            <p class="text-center text-lg font-semibold text-yellow-400">{{ publicKm }} km</p>
          </div>

          <!-- Vuelos Nacionales -->
          <div class="space-y-2">
            <label class="block text-lg font-medium text-gray-700">
              ¿Cuántos vuelos nacionales tomas al año?
            </label>
            <div class="relative pt-6">
              <input type="range" v-model="domesticFlights" min="0" max="20" step="1"
                class="w-full h-3 bg-green-200 rounded-lg appearance-none cursor-pointer" />
              <div class="absolute top-0 left-0 w-full flex justify-between text-sm text-gray-600">
                <span>0</span>
                <span>10</span>
                <span>20</span>
              </div>
            </div>
            <p class="text-center text-lg font-semibold text-yellow-400">{{ domesticFlights }} vuelos</p>
          </div>

          <!-- Vuelos Internacionales -->
          <div class="space-y-2">
            <label class="block text-lg font-medium text-gray-700">
              ¿Cuántos vuelos internacionales tomas al año?
            </label>
            <div class="relative pt-6">
              <input type="range" v-model="internationalFlights" min="0" max="10" step="1"
                class="w-full h-3 bg-yellow-200 rounded-lg appearance-none cursor-pointer" />
              <div class="absolute top-0 left-0 w-full flex justify-between text-sm text-gray-600">
                <span>0</span>
                <span>5</span>
                <span>10</span>
              </div>
            </div>
            <p class="text-center text-lg font-semibold text-yellow-400">{{ internationalFlights }} vuelos</p>
          </div>
        </div>

        <div class="mt-8 flex justify-between gap-4">
          <router-link to="/calculate">
            <button class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
              Atrás
            </button>
          </router-link>
          <router-link to="/food">
            <button @click="nextStep"
              class="px-6 py-3 bg-yellow-300 text-white rounded-lg hover:bg-yellow-400 transition-colors">
              Siguiente
            </button>
          </router-link>
        </div>
      </div>

      <!-- Ilustración -->
      <div class="hidden md:block">
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <img :src="transport_image" alt="Ilustración de transporte eco-amigable"
            class="w-full h-auto rounded-xl mb-6" />
          <div class="space-y-4">
            <h3 class="text-2xl font-bold text-yellow-800">Impacto del Transporte</h3>
            <p class="text-gray-600">
              El transporte es una de las principales fuentes de emisiones de CO2.
              Optar por medios de transporte sostenibles como la bicicleta, el transporte
              público o vehículos eléctricos puede reducir significativamente tu huella de carbono.
            </p>
            <div class="p-4 bg-yellow-50 rounded-lg">
              <p class="text-sm text-yellow-800">
                💡 Tip: Considera compartir coche o trabajar algunos días desde casa
                para reducir tus emisiones semanales.
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
import { ref, onMounted } from "vue";
import { useSurveyStore } from "@/services/surveyStore";
import { useRouter } from "vue-router";
import Navbar from '@/components/Navbar.vue'
import NavbarAuth from '../authenticated/NavbarAuth.vue'
import Footer from '@/components/Footer.vue'
import transport_image from '@/assets/transport_image.jpg'

const tieneToken = ref(false)

onMounted(() => {
  const token = localStorage.getItem('token')
  tieneToken.value = !!token
})

const store = useSurveyStore();
const router = useRouter();

const carKm = ref(0)
const publicKm = ref(0)
const domesticFlights = ref(0)
const internationalFlights = ref(0)

const nextStep = () => {
  store.setTransportData({
    carKm: carKm.value,
    domesticFlights: domesticFlights.value,
    internationalFlights: internationalFlights.value,
    publicKm: publicKm.value,
  });
  router.push("/Waste");
};
</script>

<style scoped>
input[type="range"] {
  -webkit-appearance: none;
  height: 12px;
  background: #e2e8f0;
  border-radius: 8px;
  background-image: linear-gradient(#ffff00, #ffff00);
  background-repeat: no-repeat;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  background: #ffff00;
  cursor: pointer;
  box-shadow: 0 0 2px 0 #555;
  transition: background .3s ease-in-out;
}

input[type="range"]::-webkit-slider-thumb:hover {
  background: #eaea09;
}

input[type="range"]::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}
</style>
