import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useSurveyStore = defineStore("survey", () => {
  const energyData = ref({});
  const foodData = ref({});
  const transportData = ref({});
  const wasteData = ref({});

  const setEnergyData = (data) => (energyData.value = data);
  const setFoodData = (data) => (foodData.value = data);
  const setTransportData = (data) => (transportData.value = data);
  const setWasteData = (data) => (wasteData.value = data);

  const sendAllData = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8080/survey", {
        date: new Date().toISOString(),
        energy: energyData.value,
        food: foodData.value,
        transport: transportData.value,
        waste: wasteData.value,
      });

      console.log("Datos enviados con éxito:", response.data);
    } catch (error) {
      console.error("Error al enviar datos:", error.response ? error.response.data : error.message);
    }
  };

  return { energyData, foodData, transportData, wasteData, setEnergyData, setFoodData, setTransportData, setWasteData, sendAllData };
});
