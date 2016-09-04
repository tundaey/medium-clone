class FavoriteBtnCtrl {
    constructor(User, Article, $state) {
        'ngInject';
        this._User = User;
        this._Article = Article;
        this._$state = $state;
    }

    submit() {
        this.isSubmitting = true;
        if(!this._User.current){
            this._$state.go('app.register');
            return;
        }

        if(this.article.favorited){
            this._Article.unfavorite(this.article.slug).then(
                () => {
                    this.isSubmitting = false;
                    this.article.favorited = false;
                    this.article.favoritesCount--;
                }
            );
        }else{
            this._Article.favorite(this.article.slug).then(
                () => {
                    this.isSubmitting = false;
                    this.article.favorited = true;
                    this.article.favoritesCount++;
                }
            );
        }
    }
}

let FavoriteBtn = {
    bindings: {
        article: '='
    },
    transclude: true,
    controller: FavoriteBtnCtrl,
    templateUrl: 'components/buttons/favorite-btn.html'
};

export default FavoriteBtn;
