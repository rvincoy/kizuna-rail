import { getRouteById, getSchedulesByRoute } from '../../models/model.js';

const formatOperatingMonths = (months) => {
    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    return months.map(month => monthNames[month - 1]);
};

export default async (req, res) => {
    const { routeId } = req.params;
    const details = await getRouteById(routeId);
    details.schedules = await getSchedulesByRoute(routeId);

    details.formatOperatingMonths = formatOperatingMonths(details.operatingMonths);

    // TODO: getCompleteRouteDetails instead

    res.render('routes/details', { 
        title: 'Route Details',
        details
    });
};