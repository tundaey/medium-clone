function EditorConfig($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.editor', {
    url: '/editor/:slug',
    controller: 'EditorCtrl',
    controllerAs: '$ctrl',
    templateUrl: 'editor/editor.html',
    title: 'Editor',
    resolve:{
      auth: function(User) {
        return User.ensureAuthIs(true);
    },
    article: function(Article, User, $state, $stateParams) {
        if($stateParams.slug){
            console.log($stateParams.slug);
            return Article.get($stateParams.slug).then(
                (article) => {
                    console.log(article);
                    if(User.current.username === article.author.username){
                        return article;
                    }else{
                        $state.go('app.home');
                    }
                },

                (err) => $state.go('app.home')

            );
        }else{
            console.log("no slug");
            return null;
        }
    }
}
  });

}

export default EditorConfig;
