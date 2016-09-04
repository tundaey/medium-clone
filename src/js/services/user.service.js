export default class User {
    constructor($q, JWT, AppConstants, $http, $state) {
        'ngInject';

        this.current = null;
        this._JWT = JWT;
        this._AppConstants = AppConstants;
        this._$http = $http;
        this._$state = $state;
        this._$q = $q;
    }

    attemptAuth(type, credentials) {
        let route = (type === 'login') ? '/login' : '';
        return this._$http({
            url: this._AppConstants.api + '/users' + route,
            method: 'POST',
            data: {
                user: credentials
            }
        }).then(
            (res) => {
                this._JWT.save(res.data.user.token);
                this.current = res.data.user;
                return res;
            }
        );
    }

    logout() {
        this.current = null;
        this._JWT.destroy();
        this._$state.go(this._$state.current, null, {reload: true});
    }

    verifyAuth() {
        let deferred = this._$q.defer();
        //check for Jwt token
        if(!this._JWT.get()){
            deferred.resolve(false);
            return deferred.promise;
        }

        if(this.current){
            deferred.resolve(true);
        }else{
            this._$http({
                url: this._AppConstants.api + '/user',
                method: 'GET'
            }).then(
                (res)=> {
                    this.current = res.data.user;
                    deferred.resolve(true);
                },

                (err) => {
                    this._JWT.destroy();
                    deferred.resolve(false);
                }
            );
        }
        return deferred.promise;
    }

    ensureAuthIs(bool) {
        let deferred = this._$q.defer();
        this.verifyAuth().then(
            (authValid) => {
                if(authValid !== bool){
                    this._$state.go('app.home');
                    deferred.resolve(false);
                }else{
                    deferred.resolve(true);
                }
            }
        );
        return deferred.promise;
    }

    update(fields){
        return this._$http({
            url: this._AppConstants.api + '/user',
            method: 'PUT',
            data: {user: fields}
        }).then(
            (res) => {
                console.log(res);
                this.current = res.data.user;
                return res.data.user;
            }
        );
    }
}
