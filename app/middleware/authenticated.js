import firebase from '~/plugins/firebaseConfig'
export default function ({ store, redirect, route }) {
  if (route.path !== '/user/sign-up' && route.path !== '/user/login') {
    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        console.log(user)
      } else {
        return redirect('/user/login')
      }
    })
  }
}