import firebase from '../config/firebase';
import swal from 'sweetalert2';


const auth = firebase.auth();
const db = firebase.database();
const toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    customClass: 'swal-font'
});

function checkUser() {
    return new Promise((res, rej) => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                res(user);
            } else {
                toast({
                    type: 'warning',
                    title: 'Please login first'
                })
                rej('user not logged in');
            }
        });
    })
}

function checkProfile(user) {
    return new Promise((res, rej) => {

        db.ref(`Users/${user.uid}/Profile`).once('value')
            .then(snap => {
                if (snap.val() === null) {
                    res('profile not created');
                }
                else {
                    rej(snap.val());
                }
            })


    })
}

export { checkUser, checkProfile };