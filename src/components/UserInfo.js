export default class UserInfo {
    constructor({ userName, userData }) {
        this._userName = userName;
        this._userData = userData;
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