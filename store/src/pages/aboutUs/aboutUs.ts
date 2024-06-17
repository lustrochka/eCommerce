import Component from '../../components/component/component';
import { div, span, img, p, ul, li, a } from '../../components/tags/tags';
import './aboutUs.css';
// import rs from '../../assets/images/logo_rs.svg';

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
                        img('photo__img', 'https://image.ibb.co/fvekrc/action_adult_art_673649.jpg', 'Olga'),
                        p('photo__name', 'Olga')
                    )
                ),
                div(
                    'person-description',
                    p('person-description__name', 'Olga'),
                    ul(
                        'person-description__list',
                        li(
                            'person-description__item',
                            '',
                            span('person-description__subtitle', 'Position: '),
                            span('person-description__text', 'Team Lead')
                        ),
                        li(
                            'person-description__item',
                            '',
                            span('person-description__subtitle', 'GitHub profile: '),
                            a('person-description__link', 'https://github.com/lustrochka', 'lustrochka')
                        ),
                        li(
                            'person-description__item',
                            '',
                            span('person-description__subtitle', 'Biography: '),
                            span('person-description__text', '__')
                        ),
                        li(
                            'person-description__item',
                            '',
                            span('person-description__subtitle', 'Contribution: '),
                            span(
                                'person-description__text',
                                `Developed the core architecture of our web application and implemented many key features. Creating a registration page, user profile.`
                            )
                        )
                    )
                )
            ),
            div(
                'person-block',
                div(
                    'person-description',
                    p('person-description__name', 'Pavel Konstantinovich'),
                    ul(
                        'person-description__list',
                        li(
                            'person-description__item',
                            '',
                            span('person-description__subtitle', 'Position: '),
                            span('person-description__text', 'Middle Frontend Developer')
                        ),
                        li(
                            'person-description__item',
                            '',
                            span('person-description__subtitle', 'GitHub profile: '),
                            a(
                                'person-description__link',
                                'https://github.com/PavelKonstantinovich',
                                'PavelKonstantinovich'
                            )
                        ),
                        li(
                            'person-description__item',
                            '',
                            span('person-description__subtitle', 'Biography: '),
                            span('person-description__text', '__')
                        ),
                        li(
                            'person-description__item',
                            '',
                            span('person-description__subtitle', 'Contribution: '),
                            span(
                                'person-description__text',
                                `Setting up the project collector. Worked in the eCommerce platform when creating products. Created login page, catalog page, ...`
                            )
                        )
                    )
                ),
                div(
                    'photo__wrapper',
                    div(
                        'photo',
                        img('photo__img', 'https://image.ibb.co/fvekrc/action_adult_art_673649.jpg', 'Pavel'),
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
                        img('photo__img', 'https://image.ibb.co/fvekrc/action_adult_art_673649.jpg', 'Mikhail'),
                        p('photo__name', 'Khilman Mikhail')
                    )
                ),
                div(
                    'person-description',
                    p('person-description__name', 'Khilman Mikhail'),
                    ul(
                        'person-description__list',
                        li(
                            'person-description__item',
                            '',
                            span('person-description__subtitle', 'Position: '),
                            span('person-description__text', 'Junior Frontend Developer')
                        ),
                        li(
                            'person-description__item',
                            '',
                            span('person-description__subtitle', 'GitHub profile: '),
                            a('person-description__link', 'https://github.com/grimpatron', 'grimpatron')
                        ),
                        li(
                            'person-description__item',
                            '',
                            span('person-description__subtitle', 'Biography: '),
                            span(
                                'person-description__text',
                                `I am 31 years old and I live in Minsk. I am interested in electronic music and modern technologies. I'm learning programming because I've always wanted to make modern websites and applications.`
                            )
                        ),
                        li(
                            'person-description__item',
                            '',
                            span('person-description__subtitle', 'Contribution: '),
                            span(
                                'person-description__text',
                                `Helped at all stages of development. Configured routing, writing home page styles, creating a product page and an about us page.`
                            )
                        )
                    )
                )
            ),
            p(
                'about-us__text',
                'Our team collaborated closely throughout the entire project. We used Trello for effective project management. We were in touch every day and this helped us stay on the same page and quickly solve problems that arose.'
            ),
            div('wrapper__rs-logo', a('rs-logo__link', 'https://rs.school/', ''), div('rs-logo')),
            p(
                'about-us__text',
                'We are proud to be part of RS School. This project was developed as part of an educational program. To find out more about this educational program, click on the logo.'
            )
        );
    }
}

export default AboutUs;
