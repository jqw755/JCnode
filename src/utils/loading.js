/**
 * Created by luzd on 17/3/22.
 */
const loading = {
    show(){
        document.querySelector('.loadingAll').classList.remove('loading_active');
    },
    hide(){
        document.querySelector('.loadingAll').classList.add('loading_active');
    }
};
export {loading};
