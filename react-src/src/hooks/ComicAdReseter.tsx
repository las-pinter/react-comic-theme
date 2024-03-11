declare global {
    interface Window {
        cad263: number;
        cad265: number;
    }
}

// The purpose of this hook is to reset the comic 
// ad vars once a new page is loaded.
const ResetComicAdVars = () => {
    window.cad263 = 0;
    window.cad265 = 0;
};

export default ResetComicAdVars;