import Component from '../../components/component/component';
import { div, img, p, ul, li, a } from '../../components/tags/tags';
import './aboutUs.css';
// import Button from '../../components/button/button';

class AboutUs extends Component {
    constructor() {
        super('div', 'about-us');
        const title = div('about-us__title');
        title.changeText('About Us');
        this.appendChildren(
            title,
            div(
                'person-block',
                div(
                    'photo__wrapper',
                    div(
                        'photo',
                        img('photo__img', 'https://image.ibb.co/fvekrc/action_adult_art_673649.jpg', 'vasia'),
                        p('photo__name', 'Olga')
                    )
                ),
                div(
                    'person-description',
                    p('person-description__name', 'Olga'),
                    ul(
                        'person-description__list',
                        li('person-description__item', 'Position: Team Lead'),
                        li('person-description__item', 'GitHub profile: https://github.com/lustrochka'),
                        li('person-description__item', 'Biography:'),
                        li(
                            'person-description__item',
                            'Contribution: Developed the core architecture of our web application and implemented many key features. Creating a registration page, user profile.'
                        )
                    )
                )
            ),
            div(
                'person-block',
                div(
                    'person-description',
                    p('person-description__name', 'Pavel'),
                    ul(
                        'person-description__list',
                        li('person-description__item', 'Position: Middle Frontend Developer'),
                        li('person-description__item', 'GitHub profile: https://github.com/PavelKonstantinovich'),
                        li('person-description__item', 'Biography:'),
                        li(
                            'person-description__item',
                            'Contribution: Setting up the project collector. Worked in the eCommerce platform when creating products. Created login page, catalog page, ...'
                        )
                    )
                ),
                div(
                    'photo__wrapper',
                    div(
                        'photo',
                        img('photo__img', 'https://image.ibb.co/fvekrc/action_adult_art_673649.jpg', 'vasia'),
                        p('photo__name', 'Pavel')
                    )
                )
            ),
            div(
                'person-block',
                div(
                    'photo__wrapper',
                    div(
                        'photo',
                        img('photo__img', 'https://image.ibb.co/fvekrc/action_adult_art_673649.jpg', 'vasia'),
                        p('photo__name', 'Khilman Mikhail')
                    )
                ),
                div(
                    'person-description',
                    p('person-description__name', 'Khilman Mikhail'),
                    ul(
                        'person-description__list',
                        li('person-description__item', 'Position: Junior Frontend Developer'),
                        li('person-description__item', 'GitHub profile: https://github.com/grimpatron'),
                        li(
                            'person-description__item',
                            `Biography: I am 31 years old and I live in Minsk. I am interested in electronic music and modern technologies. I'm learning programming because I've always wanted to make modern websites and applications.`
                        ),
                        li(
                            'person-description__item',
                            'Contribution: Helped at all stages of development. Configured routing, writing home page styles, creating a product page and an about us page.'
                        )
                    )
                )
            ),
            p(
                'about-us__text',
                'Our team collaborated closely throughout the entire project. We used Trello for effective project management. We were in touch every day and this helped us stay on the same page and quickly solve problems that arose.'
            ),
            div('rs-logo__wrapper', img('rs-logo', './assets/images/logo_rs.svg', 'rs school')),
            p(
                'about-us__text',
                'We are proud to be part of RS School. This project was developed as part of an educational program. To find out more about this educational program, click on the logo.'
            )
        );
    }
}

export default AboutUs;
