export interface User {
  id: string;
  fullName: string;
  email: string;
  password: string;
}

export interface Weather {
  coord: Coord;
  weather?: (WeatherEntity)[] | null;
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface Coord {
  lon: number;
  lat: number;
}

export interface WeatherEntity {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

export interface Clouds {
  all: number;
}

export interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface LocalizacionJson {
  place_id: number;
  licence: string;
  powered_by: string;
  osm_type?: string | null;
  osm_id?: number | null;
  boundingbox?: (string)[] | null;
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
}
