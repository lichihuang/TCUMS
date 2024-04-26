import Swal from 'sweetalert2'

export default {
    typicalType(title, text, icon, showConfirmButton) {
        return Swal.fire({
            title,
            text,
            icon,
            showConfirmButton,
            confirmButtonText: `OK`,
            confirmButtonColor: '#224772',
            //timer: showConfirmButton === true ? '' : 1500
        })
    },
    twoLayerCheckType() {
        return Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#546f89',
            cancelButtonColor: '#224772',
            confirmButtonText: 'Yes, delete it!'
        })
    }
}