import knex from '../database';

class CityController {
  async index(req, res) {
    try {
      const cities = await knex('cities').select('*');

      return res.json(cities);
    } catch (error) {
      return res.status(500).json({ message: 'Internal error: ', error });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const city = await knex('cities').select('*').where('id', '=', id);

      return res.json(city);
    } catch (error) {
      return res.status(500).json({ message: 'Internal error: ', error });
    }
  }

  async store(req, res) {
    try {
      const { name, latitude, longitude, gmt } = req.body;

      await knex('cities').insert({
        name,
        latitude,
        longitude,
        gmt,
      });

      return res.json({ name, latitude, longitude, gmt });
    } catch (error) {
      return res.status(500).json({ message: 'Internal error: ', error });
    }
  }
}

export default new CityController();
