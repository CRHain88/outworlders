const navigation = (() => {
    let visible = false;

    const menu = document.querySelectorAll('.navigation__menu')[0];
    const menuToggle = document.querySelectorAll('.navigation__menu-toggle')[0];

    function toggleMenu() {
        visible = !visible;

        menu.setAttribute('aria-expanded', visible);
        menuToggle.setAttribute('aria-pressed', visible);
    }

    menuToggle.addEventListener('click', toggleMenu);
})();

export default navigation;
