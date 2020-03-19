import nunjucks from 'nunjucks';

class PagesController {

    constructor(template_wrapper) {
        this.wrapper = template_wrapper;
        this.templateBase = './pages/'
    }

    // home action
    home() {
        let template = nunjucks.render(this.templateBase + 'home.html', {});
        this.wrapper.innerHTML = template;
    };
}

export default PagesController;