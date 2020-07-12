import firebase from '~/plugins/firebaseConfig'
export default function ({ store, redirect, route }) {
  if (route.path !== '/sign-up' && route.path !== '/login') {
    firebase.auth().onAuthStateChanged( user => {
      if (user) {
        console.log(user)
      } else {
        return redirect('/login')
      }
    })
  }
}