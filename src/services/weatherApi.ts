import { apiGet } from "@/services/apiClient";

type WeatherSnapshot = {
  temperatureC: number;
  humidity: number;
  pressure: number;
};

export function getWeather(zipCode: string) {
  return apiGet<WeatherSnapshot>("/weather", { query: { zip: zipCode } });
}
