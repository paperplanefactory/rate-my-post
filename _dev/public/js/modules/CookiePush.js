import Cookies from 'js-cookie'

class CookiePush {
  constructor(postID) {
    this.postID = postID;
    this.existingCookie = Cookies.get('rmp-rate');
    this.events();
  }

  events() {
    if(typeof this.existingCookie === 'undefined') {
      Cookies.set(
        'rmp-rate',
        this.postID,
        { expires: 20 }
      );
      return;
    }

    Cookies.remove('rmp-rate');

    let postsArray = this.existingCookie.split(',');
    if (postsArray.length >= 20){
      postsArray.shift();
    }
    postsArray.push(this.postID);
    let cookie = postsArray.toString();
    Cookies.set('rmp-rate', cookie, { expires: 20 });
  }

}

export default CookiePush;
