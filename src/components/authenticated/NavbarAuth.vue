<script setup>
import { ref } from "vue";
import ManageToken from "../../services/ManageToken";

const showCarbonDropdown = ref(false);
const showProfileDropdown = ref(false);

const toggleDropdown = (menu) => {
  if (menu === "carbon") {
    showCarbonDropdown.value = !showCarbonDropdown.value;
    showProfileDropdown.value = false;
  } else {
    showProfileDropdown.value = !showProfileDropdown.value;
    showCarbonDropdown.value = false;
  }
};


const logout = () => {
    ManageToken.removeToken()
    window.location.href = "/login"
}

</script>

<template>
  <header class="bg-white shadow-sm">
    <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
      <!-- Logo -->
      <div class="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-green-600" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M2 22a10 10 0 1 1 20 0" />
          <path d="M12 13V2" />
          <path d="m9 5 3-3 3 3" />
          <path d="M9 9h6" />
          <path d="M9 13h6" />
        </svg>
        <router-link to="/">
          <span class="text-xl font-bold text-green-800">EcoFootprint</span>
        </router-link>
      </div>

      <!-- Links Centrados -->
      <div class="flex space-x-6">
        <router-link to="/" class="text-green-600 hover:text-green-800">Home</router-link>

        <!-- Dropdown Huella de Carbono -->
        <div class="relative">
          <button @click="toggleDropdown('carbon')" class="text-green-800 font-bold hover:text-green-900 flex items-center">
            Carbon footprint
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M6 9l6 6 6-6"></path>
            </svg>
          </button>
          <div v-if="showCarbonDropdown"
            class="absolute bg-white shadow-md mt-2 py-2 w-48 rounded-md border border-gray-200">
            <router-link to="/calculate" class="block px-4 py-2 text-gray-700 hover:bg-green-100">Calculate footprint</router-link>
            <router-link to="/history" class="block px-4 py-2 text-gray-700 hover:bg-green-100">History</router-link>
          </div>
        </div>
      </div>

      <!-- Dropdown Perfil -->
      <div class="relative">
        <button @click="toggleDropdown('profile')" class="text-green-600 hover:text-green-800 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16c-4 0-6 2-6 4" />
            <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
          </svg>
        </button>
        <div v-if="showProfileDropdown"
          class="absolute right-0 bg-white shadow-md mt-2 py-2 w-40 rounded-md border border-gray-200">
          <router-link to="/profile" class="block px-4 py-2 text-gray-700 hover:bg-green-100">Profile</router-link>
          <router-link to="#" @Click.prevent="logout" class="block px-4 py-2 text-gray-700 hover:bg-green-100">Logout</router-link>
        </div>
      </div>
    </nav>
  </header>
</template>
