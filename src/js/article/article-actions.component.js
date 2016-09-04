class ArticleActionsCtrl {
    constructor(User, $state, Article) {
        'ngInject';

        this._$state = $state;
        this._Article = Article;

        if(User.current){
            this.canModify = (User.current.username === this.article.author.username);
        }else{
            this.canModify = false;
        }
    }

    deleteArticle() {
        this.isDeleting = true;
        this._Article.destroy(this.article.slug).then(
            (res) => this._$state.go('app.home'),
            (err) => this._$state.go('app.home')
        );
    }
}

let ArticleActions = {
    bindings: {
        article: '='
    },
    controller: ArticleActionsCtrl,
    templateUrl: 'article/article-actions.html'
};

export default ArticleActions;
