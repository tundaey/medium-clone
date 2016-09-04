class EditorCtrl {
  constructor(Article, $state, article) {
    'ngInject';

    this._Article = Article;
    this._$state = $state;

    if(!article){
        this.article = {
            title: '',
            description: '',
            body: '',
            tagList: []
        };
    }else{
        this.article = article;
    }


  }

  addTag() {
      if(!this.article.tagList.includes(this.tagField)){
          this.article.tagList.push(this.tagField);
          this.tagField = '';
      }
  }

  removeTag(tagName) {
      this.article.tagList = this.article.tagList.filter((slug) => slug != tagName);
  }

  submit(){
      this.isSubmitting = true;
      this._Article.save(this.article).then(
          (newArticle) => {
              this._$state.go('app.article', {slug: newArticle.slug} );
          },

          (error) => {
              this.isSubmitting = false;
              this.errors = error.data.errors;
          }
      );
  }

}


export default EditorCtrl;
