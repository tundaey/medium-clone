export default class Article {
    constructor(AppConstants, $http, $q) {
        'ngInject';

        this._AppConstants = AppConstants;
        this._$http = $http;
        this._$q = $q;

    }

    query(config) {
        let request = {
            //url: this._AppConstants.api + '/articles' + ((config.type === 'feed')) ? '/feed' : '',
            url: this._AppConstants.api + '/articles' + ((config.type === 'feed') ? '/feed' : ''),
            method: 'GET',
            params: config.filters ? config.filters : null
        };
        return this._$http(request).then(
            (res) => res.data
        );
    }

    get(slug) {
        let deferred = this._$q.defer();

        if(!slug.replace(" ", "")){
            deferred.reject("Article slug is empty");
            return deferred.promise;
        }

        this._$http({
            url: this._AppConstants.api + '/articles/' + slug,
            method: 'GET',
        }).then(
            (res) => {
                deferred.resolve(res.data.article)
            },

            (error) => {
                deferred.reject(error)
            }
        );

        return deferred.promise;
    }

    destroy(slug){
        return this._$http({
            url: this._AppConstants.api + '/articles/' + slug,
            method: 'DELETE',
        })
    }

    save(article) {
        let request = {};
        if(article.slug){
            request.url = `${this._AppConstants.api}/articles/${article.slug}`;
            request.method = 'PUT';
            delete article.slug;
        }else{
            request.url = `${this._AppConstants.api}/articles`;
            request.method = 'POST';
        }

        request.data = {article: article};

        return this.$http(request).then(
            (res) => res.data.article
        );
    }

    favorite(slug) {
        return this._$http({
            url: this._AppConstants.api + '/articles/' + slug + '/favorite',
            method: 'POST',
        })
    }

    unfavorite(slug) {
        return this._$http({
            url: this._AppConstants.api + '/articles/' + slug + '/favorite',
            method: 'DELETE',
        })
    }
}
