import { apiClient } from "@/services/apiClient";

type WeatherSnapshot = {
  temperatureC: number;
  humidity: number;
  pressure: number;
};

export function getWeather(zipCode: string) {
  return apiClient<WeatherSnapshot>(`/weather?zip=${zipCode}`);
}
