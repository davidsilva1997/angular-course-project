export class User {
    constructor(
        public email: string,
        public id: string,
        private _token: string,
        private _tokenExperiationDate: Date) { }

    get token() {
        if (!this._tokenExperiationDate || new Date() > this._tokenExperiationDate) {
            return null;
        }
        
        return this._token;
    }
}