export default class UserInfo {
    constructor(selelectorObject) {
        this._userName = selelectorObject.userName;
        this._userData = selelectorObject.userData;
    }

    getUserInfo() {
        const userDataValues  = {
        userName: this._userName.textContent,
        userData: this._userData.textContent
       };

       return userDataValues;
    }

    setUserInfo(newValues) {
        this._userName.textContent = newValues.userName;
        this._userData.textContent = newValues.userData;
    }
}