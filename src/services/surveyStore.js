import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";
import manegetoken from "./ManageToken";

export const useSurveyStore = defineStore("survey", () => {
  const energyData = ref({});
  const foodData = ref({});
  const transportData = ref({});
  const wasteData = ref({});
  const forwardedResponse = ref(null);

  const storedResponse = localStorage.getItem("forwarded_response");
  if (storedResponse) {
    forwardedResponse.value = JSON.parse(storedResponse);
  }

  const setEnergyData = (data) => (energyData.value = data);
  const setFoodData = (data) => (foodData.value = data);
  const setTransportData = (data) => (transportData.value = data);
  const setWasteData = (data) => (wasteData.value = data);

  const setForwardedResponse = (data) => {
    forwardedResponse.value = data;
    localStorage.setItem("forwarded_response", JSON.stringify(data));
  };

  const sendAllData = async () => {
    try {
      const token = manegetoken.getToken();

      const headers = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await axios.post(
        "https://encuesta-cej0.onrender.com/data_send",
        {
          date: new Date().toISOString(),
          energy: energyData.value,
          food: foodData.value,
          transport: transportData.value,
          waste: wasteData.value,
        },
        { headers }
      );

      console.log("Datos enviados con éxito:", response.data);

      if (response.data.forwarded_response) {
        setForwardedResponse(response.data.forwarded_response);
        console.log(
          "forwarded_response guardado como JSON plano:",
          JSON.stringify(forwardedResponse.value, null, 2)
        );
      }
    } catch (error) {
      console.error(
        "Error al enviar datos:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return {
    energyData,
    foodData,
    transportData,
    wasteData,
    forwardedResponse,
    setEnergyData,
    setFoodData,
    setTransportData,
    setWasteData,
    setForwardedResponse,
    sendAllData,
  };
});
