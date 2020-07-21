import axios from 'axios';

import knex from '../database';

const appid = process.env.API_ID;

class TempreatureController {
  async index(req, res) {
    try {
      const temperatures = await knex('temperatures').select('*');

      return res.json(temperatures);
    } catch (error) {
      return res.status(500).json({ message: 'Internal error: ', error });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const temperature = await knex('temperatures')
        .select('*')
        .where('temperatures.city_id', '=', id);

      return res.json(temperature);
    } catch (error) {
      return res.status(500).json({ message: 'Internal error: ', error });
    }
  }

  async store(req, res) {
    try {
      const { id } = req.body;
      const city = await knex('cities')
        .select('id', 'name', 'latitude', 'longitude')
        .where('id', '=', id);

      let temperature = {};

      Promise.all(
        city.map(async (city) => {
          const { data: response } = await axios.get(
            `${process.env.API_URL}/onecall?lat=${String(
              city.latitude,
            )}&lon=${String(
              city.longitude,
            )}&exclude=minutely,hourly&appid=${appid}&lang=pt_br`,
          );

          temperature = {
            temperature: response.current.temp - 273.15,
            max_temperature: response.daily[0].temp.max - 273.15,
            min_temperature: response.daily[0].temp.min - 273.15,
            wind_speed: response.current.wind_speed / 3.6,
            sunrise: response.current.sunrise - response.timezone_offset,
            sunset: response.current.sunset - response.timezone_offset,
            rain: response.daily[0].rain ? response.daily[0].rain : 0,
            city_id: id,
          };

          await knex('temperatures').insert(temperature);

          return res.json(temperature);
        }),
      );
    } catch (error) {
      return res.status(500).json({ message: 'Internal error: ', error });
    }
  }

  async storeAll(req, res) {
    try {
      const cities = await knex('cities').select(
        'id',
        'name',
        'latitude',
        'longitude',
      );

      Promise.all(
        cities.map(async (city) => {
          const { data: response } = await axios.get(
            `${process.env.API_URL}/onecall?lat=${String(
              city.latitude,
            )}&lon=${String(
              city.longitude,
            )}&exclude=minutely,hourly&appid=${appid}&lang=pt_br`,
          );

          await knex('temperatures').insert({
            temperature: response.current.temp - 273.15,
            max_temperature: response.daily[0].temp.max - 273.15,
            min_temperature: response.daily[0].temp.min - 273.15,
            wind_speed: response.current.wind_speed / 3.6,
            sunrise: response.current.sunrise - response.timezone_offset,
            sunset: response.current.sunset - response.timezone_offset,
            rain: response.daily[0].rain ? response.daily[0].rain : 0,
            city_id: city.id,
          });
        }),
      );

      return res.json(cities);
    } catch (error) {
      return res.status(500).json({ message: 'Internal error: ', error });
    }
  }
}

export default new TempreatureController();
