import React from 'react';
import { Title } from 'ui';

const Footer: React.FC = () => {
    return (
        <footer>
            <section>
                <Title as="h3" variant="h4">
                    About
                </Title>
                <ul>
                    <li>
                        <a href="#">Datenschutz</a>
                    </li>
                    <li>
                        <a href="#">Datenschutz</a>
                    </li>
                </ul>
            </section>
        </footer>
    );
};

export default Footer;
