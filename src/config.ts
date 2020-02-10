import { Injectable } from '@angular/core';

@Injectable()
export class Config {
	public wordpressApiUrl = 'http://demo.titaniumtemplates.com/wordpress/?json=1';
}

export const firebaseConfig = {
	fire: {
        apiKey: "AIzaSyApXM9quU8e_ZfsiRSuzcA9AGLA9ZrWDeE",
        authDomain: "fcc-books-7fe62.firebaseapp.com",
        databaseURL: "https://fcc-books-7fe62.firebaseio.com",
        projectId: "fcc-books-7fe62",
        storageBucket: "fcc-books-7fe62.appspot.com",
        messagingSenderId: "912649527337"
	}
};
