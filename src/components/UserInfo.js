export default class UserInfo {
    constructor(selelectorObject) {
        this._userName = document.querySelector(selelectorObject.userName);
        this._userData = document.querySelector(selelectorObject.userData);
        this._userAvatar = document.querySelector(selelectorObject.userAvatar);
    }

    getUserInfo() {
        const userDataValues  = {
        userName: this._userName.textContent,
        userData: this._userData.textContent,
        userAvatar: this._userAvatar.style.backgroundImage,
        id: this._id
       };

       return userDataValues;
    }

    setUserInfo(newValues) {
        this._userName.textContent = newValues.name;
        this._userData.textContent = newValues.about;
        this.setAvatar(newValues.avatar);
        this._id = newValues._id;
    }

    setAvatar(avatar) {
        this._userAvatar.style.backgroundImage = `url(${avatar})`;
    }
}