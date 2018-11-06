import firebase from '../config/firebase';
import swal from 'sweetalert2';


const auth = firebase.auth();
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

export default checkUser;