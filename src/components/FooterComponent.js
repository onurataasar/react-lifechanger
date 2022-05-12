import React from 'react';
import Footer from "rc-footer";
import 'rc-footer/assets/index.css';
import { Link } from 'react-router-dom';

export default function FooterComponent() {
    return (
        <Footer theme="dark" backgroundColor="#e5155c" columnLayout="space-between" maxColumnsPerRow="3" className="footer"

            columns={[
                {
                    /*                     icon: (
                                            <img src="https://www.svgrepo.com/show/415888/emotcon-mobile-ui.svg" />
                                        ),
                                        title: 'LifeChanger', */
                    items: [{
                        title: 'Login',
                        url: 'http://localhost:3000/sign-in',
                        openExternal: false,
                        style: {
                            marginTop: '150%',
                        }

                    }],

                    description: 'Change your Life',
                    openExternal: true,
                    className: "footer-columns"
                }, {

                    items: [{
                        title: 'Github',
                        url: 'https://github.com/onurataasar/react-lifechanger',
                        openExternal: true,
                        style: {
                            marginTop: '125%',


                        }
                    }],

                    description: 'Change your Life',
                    openExternal: true,
                    className: "footer-columns"
                },
            ]
            }


            bottom="`Made with ❤️ by Onur Ata Asar`"
        />
    )
}
