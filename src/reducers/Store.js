const initialState = {
    isAuth: false,
    userData: {
        displayName: '', uid: '',
        EmailUser: '', transaksi: []
    },
    userLocationData: { address: { village: '' } },
    ShowAlert: {
        show: false,
        msg: '',
        severity: ''
    },
    kontakClicked: false,
    restApi: process.env.NODE_ENV === 'development' ? 'https://rumahkontrak.com/api' : 'https://rumahkontrak.com/api'
}

const Store = (state = initialState, action) => {
    switch (action.type) {
        case 'userLocationDataSet':
            return {
                ...state,
                userLocationData: action.locationData
            }

        case 'ShowAlertSet':
            return {
                ...state,
                ShowAlert: {
                    show: action.show,
                    msg: action.msg,
                    severity: action.severity
                }
            }

        case 'isAuthSet':
            return {
                ...state,
                isAuth: action.authVal
            }

        case 'userDataSet':
            return {
                ...state,
                userData: action.userData
            }

        case 'kontakClickedSet':
            return {
                ...state,
                kontakClicked: action.kontakVal
            }
        default:
            break;
    }
    return state;
}

export default Store;