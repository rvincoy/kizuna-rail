import { getAllRoutes, getListOfRegions, getListOfSeasons } from '../../models/model.js';

export default async (req, res) => {
    const regions = await getListOfRegions();
    const routes = await getAllRoutes();
    const seasons = await getListOfSeasons();

    const region = req.query.region || '';
    const season = req.query.season || '';

    const myroutes = routes.filter(route => {
        const regionMatch = region === '' || route.region === region;
        const seasonMatch = season === '' || route.bestSeason === season;
        return regionMatch && seasonMatch;
    })

    res.render('routes/list', {
        title: 'Scenic Train Routes',
        regions,
        routes: myroutes,
        seasons
    });
};