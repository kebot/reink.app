// https://api.openweathermap.org/data/2.5/weather?lat=52.5311881&lon=13.3700883&appid=4d2ef9b7e9acb58a935ad59724cfe7fa&units=metric

const weatherData = {
  coord: {
    lon: 13.3701,
    lat: 52.5312,
  },
  weather: [
    {
      id: 800,
      main: 'Clear',
      description: 'clear sky',
      icon: '01n',
    },
  ],
  base: 'stations',
  main: {
    temp: 18.89,
    feels_like: 18.24,
    temp_min: 17.89,
    temp_max: 19.5,
    pressure: 993,
    humidity: 54,
  },
  visibility: 10000,
  wind: {
    speed: 6.71,
    deg: 120,
    gust: 8.94,
  },
  clouds: {
    all: 0,
  },
  dt: 1653342740,
  sys: {
    type: 2,
    id: 2009543,
    country: 'DE',
    sunrise: 1653274767,
    sunset: 1653332842,
  },
  timezone: 7200,
  id: 2822234,
  name: 'Tiergarten',
  cod: 200,
}

const iconToImage = (icon: string) => {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`
}

async function getWeatherData () {
  return weatherData
  // const r = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=52.5311881&lon=13.3700883&appid=4d2ef9b7e9acb58a935ad59724cfe7fa&units=metric')
  // return await r.json()
}