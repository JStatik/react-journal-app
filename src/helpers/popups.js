import Swal from 'sweetalert2';

const popUp = ( icon, iconColor, title, msg ) => {
    Swal.fire( { 
        confirmButtonColor: '#031441',
        hideClass: {
            popup: 'animate__animated animate__zoomOut'
        },
        icon: icon,
        iconColor: iconColor,
        showClass: {
            popup: 'animate__animated animate__zoomIn'
        },
        title: `<h6>${ title }</h6>`, 
        text: msg,
        width: '27rem'
    } );
};

export default popUp;
