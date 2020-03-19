import nunjucks from 'nunjucks';
import db from './database';

class TripsController {

    constructor(template_wrapper, router) {
        this.wrapper = template_wrapper;
        this.templateBase = 'trips/'
        this.router = router;
    }

    _renderTemplate(template) {
        this.wrapper.innerHTML = template;
        this.router.updatePageLinks();
    }

    async index() {
        let data = {
            'title': 'Alle reizen',
            'description': 'lorem ipsum'
        };

        data.trips = await this._getTrips();

        let template = nunjucks.render(this.templateBase + 'index.html', data);
        this._renderTemplate(template);
    };

    add() {
        let data = {
            'title': 'Voeg een reis toe',
            'description': 'lorem ipsum'
        };

        let template = nunjucks.render(this.templateBase + 'add.html', data);
        this._renderTemplate(template);

        // handle form submit
        let locationForm = document.getElementById('add-trip');
        locationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // validate data

            // get form data and make new trip
            let formData = new FormData(locationForm);
            this._createTrip(formData).then((id) => {
                this.router.navigate('/trips');
            })
        });
    };

    async edit(urlParams) {
        let data = {
            'title': 'Wijzig een reis',
            'description': 'lorem ipsum'
        };

        data.trip = await this._getTrip(urlParams.id);

        let template = nunjucks.render(this.templateBase + 'edit.html', data);
        this._renderTemplate(template);

        // handle form submit
        let locationForm = document.getElementById('edit-trip');
        locationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // get form data and make new trip
            let formData = new FormData(locationForm);
            this._updateTrip(formData).then((id) => {
                this.router.navigate('/trips'); 
            })
        });
    }

    async delete(urlParams) {
        const deleted = await this._deleteTrip(urlParams.id);
        if(deleted) {
            this.router.navigate('/trips');
        } else 
        {
            console.log('Record niet gevonden in tabel')
        }
    }

     // -------------- \\
    // database actions \\ 
    async _createTrip(data) {
        const trip = await db.trips.add({
            title: data.get('title'),
            location: data.get('location')
        });
        return trip;
    }

    async _updateTrip(data) {
        const id = parseInt(data.get('id'));

        const trip = await db.trips.update(id, {
            title: data.get('title'),
            location: data.get('location')
        });
        return trip;
    }

    async _deleteTrip(id) {
        const deleted = await db.trips.where('id').equals(parseInt(id)).delete()
        return deleted;
    }

    async _getTrips() {
        const trips = await db.trips.toArray();
        return trips;
    }

    async _getTrip(id) {
        id = parseInt(id);
        const trip = await db.trips.get(id);
        return trip;
    }

}

export default TripsController;