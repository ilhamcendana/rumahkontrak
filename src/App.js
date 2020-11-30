import React, { useEffect, useState } from 'react';
import './App.scss';
import { connect } from 'react-redux'
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDisclosure, Flex, Text } from '@chakra-ui/core';
import Axios from 'axios';
import firebase from './firebaseApi';
import 'firebase/auth';

//
import MyDrawer from './components/MyComponents/MyDrawer';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import { LoginModal, SignUpModal } from './components/Auth/Auth';
import MyAlert from './components/MyComponents/MyAlert';
import CariKontrakan from './pages/CariKontrakan/CariKontrakan';
import Kontrakan from './pages/Kontrakan/Kontrakan';
import Tentang from './pages/Tentang/Tentang';
import Admin from './pages/Admin/Admin';
import Disimpan from './pages/Disimpan/Disimpan';
import Transaksi from './pages/Transaksi/Transaksi';
import NotFound from './pages/NotFound/NotFound';
import AdminAuth from './pages/AdminAuth';

const App = ({ userLocationDataSet, ShowAlert, ShowAlertSet, isAuthSet, isAuth, userDataSet, userData, restApi }) => {
  useEffect(() => {

    // CheckForlocation();
    const authChange = () => {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          if (user.displayName === 'thisisadminadmin') {
            isAdminSet(true);
            isAuthSet(true);
            isReadySet(true);
          } else {
            Axios.get(`${restApi}/users/${user.uid}`)
              .then(res => {
                const { transaksi } = res.data.data;
                userDataSet({ displayName: user.displayName, uid: user.uid, EmailUser: user.email, transaksi: transaksi !== undefined ? transaksi : [] })
              })
              .then(() => {
                isAuthSet(true);
                isReadySet(true);
              })
              .catch(err => {
                console.log(err.message);
              })
            isAdminSet(false);
          }
        } else {
          userDataSet({ displayName: '', uid: '', EmailUser: '', })
          isAuthSet(false);
          isReadySet(true);
        }
      })
    }
    authChange();

    // navigator.permissions.query({
    //   name: 'geolocation'
    // }).then(function (result) {
    //   if (result.state === 'granted') {
    //     CheckForlocation();

    //   } else if (result.state === 'prompt') {
    //     console.log(result.state);


    //     // navigator.geolocation.getCurrentPosition(revealPosition, positionDenied, geoSettings);
    //   } else if (result.state === 'denied') {
    //     console.log(result.state);

    //   }
    //   result.onchange = function () {
    //     console.log(result.state);
    //   }
    // });

  }, [])

  const [isReady, isReadySet] = useState(false);
  const [isAdmin, isAdminSet] = useState(false);

  const CheckForlocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        // Axios.get(`https://eu1.locationiq.com/v1/reverse.php?key=cebb3500089973&lat=${latitude}&lon=${longitude}&format=json`)
        //   .then(res => {
        //     userLocationDataSet(res.data);
        //   })
        //   .catch(err => {
        //     console.log(err);
        //   })
      });
    } else {
      console.log("Not Available");
    }
  }



  const { isOpen: isOpenDrawer, onClose: onCloseDrawer, onOpen: onOpenDrawer } = useDisclosure();
  const { isOpen: isOpenLogin, onOpen: onOpenLogin, onClose: onCloseLogin } = useDisclosure();
  const { isOpen: isOpenSignUp, onOpen: onOpenSignUp, onClose: onCloseSignUp } = useDisclosure();

  const Alerting = (msg, severity) => {
    ShowAlertSet(true, msg, severity);
    setTimeout(() => {
      ShowAlertSet(false, '', '')
    }, 2000);
  }

  return (
    <div className="App">
      <Router>
        {isReady ? !isAdmin ?
          <>
            <Navbar onOpenDrawer={onOpenDrawer} onCloseDrawer={onCloseDrawer} onOpenLogin={onOpenLogin} />
            <MyDrawer isOpen={isOpenDrawer} onClose={onCloseDrawer} onOpenLogin={onOpenLogin} onCloseDrawer={onCloseDrawer} />

            <Switch>
              <Route exact path='/' render={() => <Home Alerting={Alerting} CheckForlocation={() => CheckForlocation()} />} />
              <Route path='/Cari-Kontrakan' render={(props) => <CariKontrakan {...props} />} />
              <Route path='/kontrakan/:id' render={(props) => <Kontrakan onOpenLogin={onOpenLogin} {...props} Alerting={Alerting} userData={userData} />} />
              <Route path='/Tentang' render={() => <Tentang />} />
              <Route path='/Disimpan' render={() => <Disimpan />} />
              <Route path='/Transaksi' render={() => <Transaksi Alerting={Alerting} />} />
              <Route path='/admin' render={() => <AdminAuth />} />
              {/* <Route path='/not-found'>
                <NotFound />
              </Route>
              <Redirect to='/not-found' /> */}
            </Switch>

            <LoginModal isOpenLogin={isOpenLogin} onCloseLogin={onCloseLogin} onOpenSignUp={onOpenSignUp} />
            <SignUpModal isOpenSignUp={isOpenSignUp} onCloseSignUp={onCloseSignUp} onOpenLogin={onOpenLogin} />

            <Footer />
            <MyAlert show={ShowAlert} />
          </>
          :
          <>
            <MyAlert show={ShowAlert} />
            <Admin />
          </>
          :
          <Flex width='100%' height='100vh' justifyContent='center' alignItems='center' >
            <Text fontFamily='muli' fontSize='2xl' fontWeight='bold'>Loading...</Text>
          </Flex>
        }
      </Router>
    </div>
  );
}

const storeToProps = state => {
  return {
    ShowAlert: state.ShowAlert,
    restApi: state.restApi,
    userData: state.userData
  }
}

const dispatchToStore = dispatch => {
  return {
    userLocationDataSet: (locationData) => dispatch({ type: 'userLocationDataSet', locationData }),
    ShowAlertSet: (show, msg, severity) => dispatch({ type: 'ShowAlertSet', show, msg, severity }),
    isAuthSet: (authVal) => dispatch({ type: 'isAuthSet', authVal }),
    userDataSet: (userData) => dispatch({ type: 'userDataSet', userData }),
  }
}
export default connect(storeToProps, dispatchToStore)(App);
