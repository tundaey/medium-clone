class ProfileCtrl {
  constructor(profile, User) {
    'ngInject';

    this.profile = profile;

    if(User.current){
        this.isUser = (this.profile.username === User.current.username);
    }else{
        this.isUser = false;
    }
  }


}


export default ProfileCtrl;
