<template>
  <Navbar />
  <div class="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-6">
    <div class="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-start">
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <div class="flex items-center gap-4 mb-8">
          <div class="bg-orange-100 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-orange-600" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <h2 class="text-3xl font-bold text-orange-800">Consumo Energético</h2>
        </div>

        <div class="space-y-8">
          <!-- Electrodomésticos y luces -->
          <div class="space-y-2">
            <label class="block text-lg font-medium text-gray-700">
              ¿Cuántas horas al día usas electrodomésticos y luces en casa?
            </label>
            <div class="relative pt-6">
              <input type="range" v-model="applianceHours" min="0" max="24" step="1"
                class="w-full h-3 bg-orange-200 rounded-lg appearance-none cursor-pointer" />
              <div class="absolute top-0 left-0 w-full flex justify-between text-sm text-gray-600">
                <span>0</span>
                <span>12</span>
                <span>24</span>
              </div>
            </div>
            <p class="text-center text-lg font-semibold text-orange-600">{{ applianceHours }} horas</p>
          </div>

          <!-- Bombillas -->
          <div class="space-y-2">
            <label class="block text-lg font-medium text-gray-700">
              ¿Cuántas bombillas tienes encendidas en promedio al mismo tiempo?
            </label>
            <div class="relative pt-6">
              <input type="range" v-model="lightBulbs" min="0" max="20" step="1"
                class="w-full h-3 bg-orange-200 rounded-lg appearance-none cursor-pointer" />
              <div class="absolute top-0 left-0 w-full flex justify-between text-sm text-gray-600">
                <span>0</span>
                <span>10</span>
                <span>20</span>
              </div>
            </div>
            <p class="text-center text-lg font-semibold text-orange-600">{{ lightBulbs }} bombillas</p>
          </div>

          <!-- Gas GLP -->
          <div class="space-y-2">
            <label class="block text-lg font-medium text-gray-700">
              ¿Cuántos tanques o garrafas de gas envasado (GLP) usas al mes?
            </label>
            <div class="relative pt-6">
              <input type="range" v-model="gasTanks" min="0" max="5" step="1"
                class="w-full h-3 bg-orange-200 rounded-lg appearance-none cursor-pointer" />
              <div class="absolute top-0 left-0 w-full flex justify-between text-sm text-gray-600">
                <span>0</span>
                <span>2</span>
                <span>5</span>
              </div>
            </div>
            <p class="text-center text-lg font-semibold text-orange-600">{{ gasTanks }} tanques</p>
          </div>

          <!-- Calefacción/Aire acondicionado -->
          <div class="space-y-2">
            <label class="block text-lg font-medium text-gray-700">
              ¿Cuántas horas al día usas calefacción o aire acondicionado?
            </label>
            <div class="relative pt-6">
              <input type="range" v-model="hvacHours" min="0" max="24" step="1"
                class="w-full h-3 bg-orange-200 rounded-lg appearance-none cursor-pointer" />
              <div class="absolute top-0 left-0 w-full flex justify-between text-sm text-gray-600">
                <span>0</span>
                <span>12</span>
                <span>24</span>
              </div>
            </div>
            <p class="text-center text-lg font-semibold text-orange-600">{{ hvacHours }} horas</p>
          </div>
        </div>

        <div class="mt-8 flex justify-between gap-4">
          <router-link to="/food">
            <button class="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors">
              Atrás
            </button>
          </router-link>
          <router-link to="/waste">

             <button @click="nextStep" class="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
              Siguiente
            </button>
          </router-link>
        </div>
      </div>

      <!-- Ilustración -->
      <div class="hidden md:block">
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <img
            src="https://previews.123rf.com/images/steinar14/steinar141704/steinar14170400059/75847974-conjunto-de-vectores-tipos-de-generaci%C3%B3n-de-energ%C3%ADa-ilustraci%C3%B3n-de-dibujos-animados-colorido.jpg"
            alt="Ilustración de energía renovable" class="w-full h-auto rounded-xl mb-6" />
          <div class="space-y-4">
            <h3 class="text-2xl font-bold text-orange-800">Impacto del Consumo Energético</h3>
            <p class="text-gray-600">
              El consumo responsable de energía es clave para reducir nuestra huella de carbono.
              Utilizar electrodomésticos eficientes, aprovechar la luz natural y mantener una
              temperatura adecuada puede ayudar a reducir significativamente nuestro consumo energético.
            </p>
            <div class="p-4 bg-orange-50 rounded-lg">
              <p class="text-sm text-orange-800">
                💡 Tip: Considera cambiar a bombillas LED, usar electrodomésticos en horas valle
                y mantener una temperatura moderada en tu hogar para ahorrar energía.
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
import { ref } from "vue";
import { useSurveyStore } from "@/Servicio_data/surveyStore";
import { useRouter } from "vue-router";
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

const store = useSurveyStore();
const router = useRouter();

const applianceHours = ref(0);
const lightBulbs = ref(0);
const gasTanks = ref(0);
const hvacHours = ref(0);

const nextStep = () => {
  store.setEnergyData({
    applianceHours: applianceHours.value,
    lightBulbs: lightBulbs.value,
    gasTanks: gasTanks.value,
    hvacHours: hvacHours.value,
  });
  router.push("/Food");
};
</script>

<style scoped>
input[type="range"] {
  -webkit-appearance: none;
  height: 12px;
  background: #e2e8f0;
  border-radius: 8px;
  background-image: linear-gradient(#ea580c, #ea580c);
  background-repeat: no-repeat;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  background: #ea580c;
  cursor: pointer;
  box-shadow: 0 0 2px 0 #555;
  transition: background .3s ease-in-out;
}

input[type="range"]::-webkit-slider-thumb:hover {
  background: #c2410c;
}

input[type="range"]::-webkit-slider-runnable-track {
  -webkit-appearance: none;
  box-shadow: none;
  border: none;
  background: transparent;
}
</style>

